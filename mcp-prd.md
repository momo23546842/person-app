# MCP Server (Person App) - Design & Test

This file documents the local MCP server implementation used to expose CRUD tools for the Person App.

Endpoint
- Local HTTP MCP endpoint: `http://localhost:3000/api/mcp`

Tools exposed
- `listPersons` — returns all persons with meals
- `getPerson` — returns a person by `id`
- `createPerson` — create a person with `name`, `email`, optional `age`, `bio`
- `updatePerson` — update person fields by `id`
- `deletePerson` — delete person by `id`

How it works
- The handler is implemented in `src/app/api/mcp/route.ts` using `createMcpHandler` from `mcp-handler`.
- Each tool calls the existing Prisma-powered logic in `src/lib/prisma.ts`.

Testing locally
1. Start the Next dev server:
```powershell
npm run dev
```
2. Verify HTTP route:
```bash
curl -i http://localhost:3000/api/mcp
```
3. Use the VS Code MCP extension (or other MCP client) and add the server entry in `.vscode/mcp.json`:
```json
{
  "servers": {
    "person-app-mcp": {
      "type": "http",
      "url": "http://localhost:3000/api/mcp"
    }
  }
}
```

4. From the MCP client, call `listPersons` or other tools using the tool names above.

Notes
- If you plan to expose this publicly, add authentication and rate limits.
- The handler currently disables Redis and runs statelessly via `basePath: '/api'`.
