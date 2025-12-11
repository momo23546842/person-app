# Person MCP Proxy

Proxy for connecting Claude Desktop to the remote Person MCP server deployed on Vercel.

## What is this?

This proxy allows Claude Desktop to communicate with your Person MCP server running on Vercel. Claude Desktop only supports local MCP servers that use STDIO (standard input/output), but your server uses HTTP. This proxy bridges the gap by:

1. Receiving STDIO messages from Claude Desktop
2. Converting them to HTTP requests
3. Forwarding them to your Vercel server
4. Sending responses back to Claude Desktop

## Installation

You can install this proxy directly from GitHub using npx:

```bash
npx git+https://github.com/momo23546842/person-app.git#main:mcp-proxy
```

No separate installation is needed - npx will handle it automatically.

## Configuration for Claude Desktop

Add the following to your Claude Desktop configuration file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "person-app": {
      "command": "npx",
      "args": [
        "-y",
        "git+https://github.com/momo23546842/person-app.git#main:mcp-proxy"
      ]
    }
  }
}
```

## Usage

1. Add the configuration above to your Claude Desktop config file
2. Restart Claude Desktop
3. The person-app MCP server should now appear in your settings
4. You can now use Person CRUD operations through Claude Desktop

## Available Operations

Once connected, you can ask Claude to:
- Create a new person
- Read/list persons
- Update person information
- Delete a person

## Troubleshooting

### Server not appearing in Claude Desktop

1. Check that the config file is valid JSON
2. Make sure Claude Desktop is completely restarted
3. Check the Claude Desktop logs for errors

### Connection errors

1. Verify that https://person-app-gamma.vercel.app/api/mcp is accessible
2. Check your internet connection
3. Ensure the Vercel deployment is running

## Technical Details

- **Protocol**: JSON-RPC 2.0 over STDIO → HTTP
- **Remote Server**: https://person-app-gamma.vercel.app/api/mcp
- **Node.js Version**: Requires Node.js 14+

## License

MIT