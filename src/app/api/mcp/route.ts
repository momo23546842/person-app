// app/api/mcp/route.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";

// 1. サーバーの作成
const server = new McpServer({
  name: "PersonApp",
  version: "1.0.0",
});

// 2. ツールの定義（ここがAIへの「機能」の提供になります）

// 例: 挨拶をするだけのシンプルなツール
server.tool(
  "say_hello", // ツール名（AIが使う名前）
  { name: z.string() }, // 引数のルール（名前は文字列だよ、と教える）
  async ({ name }) => {
    // ここに実際の処理（DB保存など）を書きます
    return {
      content: [{ type: "text", text: `こんにちは、${name}さん！` }],
    };
  }
);

// 例: ユーザーを追加するツール（あなたのアプリ用）
// ※ Prismaなどを使っている場合はここで prisma.person.create 等を呼びます
server.tool(
  "add_person",
  { 
    name: z.string().describe("追加する人の名前"),
    age: z.number().describe("追加する人の年齢")
  },
  async ({ name, age }) => {
    // 【ここにDBへの保存処理を書く】
    // const newPerson = await prisma.person.create({ data: { name, age } });
    
    // AIへの返事
    return {
      content: [{ type: "text", text: `データベースに ${name} (${age}歳) を追加しました。` }],
    };
  }
);

// 3. Next.js用の通信処理（SSE）
// ※ ここは定型文に近いので、そのまま使ってください
let transport: SSEServerTransport | null = null;

export async function GET(req: Request) {
  if (!transport) {
    // Cast Next.js/Web Response to any to satisfy the ServerResponse parameter
    // The underlying transport expects a Node ServerResponse; in the App Router
    // we provide a Response-like object, so cast to any to bypass TS error.
    transport = new SSEServerTransport("/api/mcp", new Response() as unknown as any);
    await server.connect(transport);
  }
  
  // Next.jsのストリーム対応（SSEを開始）
  const stream = new ReadableStream({
    start(controller) {
      transport?.sessionId // セッション維持のための処理（簡易実装）
      // 実際にはライブラリ内部で処理されますが、
      // Next.js App RouterでSSEを返すための最小構成です
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}

export async function POST(req: Request) {
  if (!transport) {
    return new Response("No active connection", { status: 400 });
  }
  // Cast Next.js/Web Request to any to satisfy the expected Node IncomingMessage type
  await transport.handlePostMessage(req as unknown as any, new Response() as unknown as any);
  return new Response("OK");
}