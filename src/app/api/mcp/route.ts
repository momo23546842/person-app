import { NextRequest, NextResponse } from "next/server";
import { handleMcpRequest } from "../../../../mcp/personServer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await handleMcpRequest(body);
  return NextResponse.json(result);
}
