import { createMcpHandler } from '@vercel/mcp-adapter';
import { z } from 'zod';

// ここにツール（機能）を定義します
const handler = createMcpHandler((server) => {
  
  // 例: 挨拶ツール
  server.tool(
    "say_hello",
    "名前を受け取って挨拶をするツール",
    { name: z.string() },
    async ({ name }) => {
      return {
        content: [{ type: "text", text: `こんにちは、${name}さん！` }],
      };
    }
  );

  // あなたのアプリ用: 人を追加するツール
  server.tool(
    "add_person",
    "新しいユーザーをデータベースに追加する",
    { 
      name: z.string(),
      age: z.number() 
    },
    async ({ name, age }) => {
      // 本来はここでデータベース保存処理 (prismaなど)
      console.log(`追加: ${name}, ${age}`);
      
      return {
        content: [{ type: "text", text: `${name} (${age}歳) を登録しました` }],
      };
    }
  );
  
});

export const GET = handler;
export const POST = handler;