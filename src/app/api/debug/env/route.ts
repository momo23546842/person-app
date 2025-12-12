export async function GET() {
  const hasGroq = !!process.env.GROQ_API_KEY;
  const hasVercel = !!process.env.VERCEL_AI_KEY;
  return new Response(JSON.stringify({ hasGroq, hasVercel }), { headers: { 'Content-Type': 'application/json' } });
}
