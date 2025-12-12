import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.resolve(process.cwd(), '.env.local');
    const txt = await fs.readFile(filePath, 'utf8');
    const match = txt.match(/VERCEL_AI_KEY\s*=\s*"?([^"]+)"?/);
    const raw = match ? match[1] : null;
    const masked = raw ? (raw.length > 6 ? `***${raw.slice(-6)}` : '***') : null;
    return new Response(JSON.stringify({ exists: true, keyPreview: masked }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ exists: false }), { headers: { 'Content-Type': 'application/json' } });
  }
}
