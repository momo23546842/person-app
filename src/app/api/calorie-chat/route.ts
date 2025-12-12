// src/app/api/calorie-chat/route.ts
// USDA FoodData Central から食品の栄養情報を取得する
type UsdaFoodInfo = {
  description: string;
  calories: number | null;
  protein_g: number | null;
  fat_g: number | null;
  carbs_g: number | null;
};

async function fetchUsdaFoodInfo(
  query: string,
  apiKey: string,
): Promise<UsdaFoodInfo | null> {
  const url = new URL('https://api.nal.usda.gov/fdc/v1/foods/search');
  url.searchParams.set('query', query);
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('pageSize', '1'); // とりあえず一番上だけ

  const res = await fetch(url.toString());
  if (!res.ok) {
    console.error('USDA API error status:', res.status);
    return null;
  }

  const data = await res.json();

  if (!data.foods || data.foods.length === 0) {
    return null;
  }

  const food = data.foods[0];

  // nutrients は配列なので、エネルギー・たんぱく質・脂質・炭水化物を探す
  const nutrients: any[] = food.foodNutrients ?? [];

  const findNutrient = (name: string) => {
    const n = nutrients.find((n) =>
      String(n.nutrientName).toLowerCase().includes(name.toLowerCase()),
    );
    return n?.value ?? null;
  };

  return {
    description: food.description,
    calories: findNutrient('Energy'),
    protein_g: findNutrient('Protein'),
    fat_g: findNutrient('Total lipid'),
    carbs_g: findNutrient('Carbohydrate'),
  };
}

import { NextRequest } from 'next/server';
import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';

export const maxDuration = 30;

// 超シンプルな「ミニ食品成分表」
// 必要になったらここに食品を足していけます
const FOOD_DB: Record<
  string,
  {
    label: string;
    amount: string;
    calories: number;
    protein_g: number;
    fat_g: number;
    carbs_g: number;
    fiber_g?: number;
  }
> = {
  banana: {
    label: 'Banana',
    amount: '1 medium (118g)',
    calories: 105,
    protein_g: 1.3,
    fat_g: 0.3,
    carbs_g: 27,
    fiber_g: 3.1,
  },
  apple: {
    label: 'Apple',
    amount: '1 medium (182g)',
    calories: 95,
    protein_g: 0.5,
    fat_g: 0.3,
    carbs_g: 25,
    fiber_g: 4.4,
  },
  'chicken breast': {
    label: 'Chicken breast, skinless, cooked',
    amount: '100g',
    calories: 165,
    protein_g: 31,
    fat_g: 3.6,
    carbs_g: 0,
  },
  rice: {
    label: 'White rice, cooked',
    amount: '100g',
    calories: 130,
    protein_g: 2.4,
    fat_g: 0.2,
    carbs_g: 28,
  },
  broccoli: {
    label: 'Broccoli, raw',
    amount: '100g',
    calories: 34,
    protein_g: 2.8,
    fat_g: 0.4,
    carbs_g: 7,
    fiber_g: 2.6,
  },
  salmon: {
    label: 'Salmon, Atlantic, farmed, cooked',
    amount: '100g',
    calories: 206,
    protein_g: 22,
    fat_g: 12,
    carbs_g: 0,
  },
};

// ユーザーのメッセージの中から食品名を探して、説明テキストを作る
// ユーザーのメッセージの中から食品名を探し、
// まずローカルDB、それでだめならUSDAから取得してテキストを作る
async function buildFoodContextFromMessage(
  message: string,
  usdaApiKey: string | undefined,
): Promise<string | null> {
  const lower = message.toLowerCase();

  // 1. まずはローカルFOOD_DBから探す
  const matchedKey = Object.keys(FOOD_DB).find((key) => lower.includes(key));
  if (matchedKey) {
    const food = FOOD_DB[matchedKey];

    const lines = [
      `[LOCAL_DB] Food: ${food.label}`,
      `Typical amount: ${food.amount}`,
      `Calories: ${food.calories} kcal`,
      `Protein: ${food.protein_g} g`,
      `Fat: ${food.fat_g} g`,
      `Carbohydrates: ${food.carbs_g} g`,
    ];

    if (food.fiber_g != null) {
      lines.push(`Fiber: ${food.fiber_g} g`);
    }

    lines.push(
      '',
      'Use these values as the primary reference for nutrition when the user is asking about this food.',
    );

    return lines.join('\n');
  }

  // 2. ローカルに無ければ、USDA APIを使う（キーがある場合だけ）
  if (!usdaApiKey) {
    return null;
  }

  // ひとまずメッセージ全体をクエリとして投げる
  const usdaInfo = await fetchUsdaFoodInfo(message, usdaApiKey);
  if (!usdaInfo) return null;

  const lines = [
    `[USDA] Food: ${usdaInfo.description}`,
    `Source: USDA FoodData Central (approximate values, per 100g if not otherwise specified).`,
  ];

  if (usdaInfo.calories != null) {
    lines.push(`Calories: ${usdaInfo.calories} kcal`);
  }
  if (usdaInfo.protein_g != null) {
    lines.push(`Protein: ${usdaInfo.protein_g} g`);
  }
  if (usdaInfo.fat_g != null) {
    lines.push(`Fat: ${usdaInfo.fat_g} g`);
  }
  if (usdaInfo.carbs_g != null) {
    lines.push(`Carbohydrates: ${usdaInfo.carbs_g} g`);
  }

  lines.push(
    '',
    'Use these USDA-based values as the primary nutrition reference in your answer.',
  );

  return lines.join('\n');
}


export async function POST(req: NextRequest) {
  // Groq の API キーを環境変数から取得
  const apiKey = process.env.GROQ_API_KEY;

  console.log('[api/calorie-chat] Has GROQ_API_KEY:', !!apiKey);

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'Missing GROQ_API_KEY environment variable' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  // USDA の API キー（あれば使う）
  const usdaApiKey = process.env.USDA_API_KEY;
  console.log('[api/calorie-chat] Has USDA_API_KEY:', !!usdaApiKey);

  const groq = createGroq({ apiKey });

  const json = await req.json();
  const { messages } = json as {
    messages: { role: 'user' | 'assistant' | 'system'; content: string }[];
  };

  // 一番最後の user メッセージから食品名を探す
  const lastUserMessage = [...messages]
    .reverse()
    .find((m) => m.role === 'user');

  let foodContext: string | null = null;
  if (lastUserMessage && typeof lastUserMessage.content === 'string') {
    foodContext = await buildFoodContextFromMessage(
      lastUserMessage.content,
      usdaApiKey,
    );
  }

  // system プロンプトに「栄養士としてふるまうこと」と、
  // 見つかった場合は栄養データをくっつける
  const baseSystem =
    'You are a helpful Registered Dietitian assistant. ' +
    'Answer clearly and accurately. If specific nutrition data is provided, use it as the main reference.';

  const system = foodContext
    ? `${baseSystem}\n\nHere is nutrition data for the food the user is asking about:\n${foodContext}`
    : baseSystem;

  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),
    messages,
    system,
  });

  return result.toTextStreamResponse();
}

