#!/usr/bin/env node

const readline = require('readline');

const REMOTE_MCP_URL = process.env.MCP_URL || process.argv[2] || 'https://person-app-gamma.vercel.app/api/mcp';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function makeRequest(data) {
  return new Promise((resolve, reject) => {
    const url = new URL(REMOTE_MCP_URL);
    const postData = JSON.stringify(data);

    const httpModule = url.protocol === 'https:' ? require('https') : require('http');
    const port = url.port ? Number(url.port) : (url.protocol === 'https:' ? 443 : 80);

    const options = {
      hostname: url.hostname,
      port,
      path: url.pathname + (url.search || ''),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = httpModule.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          resolve(JSON.parse(responseData));
        } catch (e) {
          reject(new Error(`Failed to parse response: ${e.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    req.write(postData);
    req.end();
  });
}

rl.on('line', async (line) => {
  try {
    const message = JSON.parse(line);
    const result = await makeRequest(message);
    console.log(JSON.stringify(result));
  } catch (error) {
    const errorResponse = {
      jsonrpc: '2.0',
      error: {
        code: -32603,
        message: error.message
      },
      id: null
    };
    console.error(JSON.stringify(errorResponse));
  }
});

if (!process.env.MCP_URL && !process.argv[2]) {
  console.error(`mcp-proxy: using default REMOTE_MCP_URL=${REMOTE_MCP_URL}`);
  console.error('Set MCP_URL env var or pass URL as first arg to point to your local Next.js API.');
}

process.on('SIGINT', () => {
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.error(JSON.stringify({
    jsonrpc: '2.0',
    error: {
      code: -32603,
      message: `Uncaught exception: ${error.message}`
    },
    id: null
  }));
  process.exit(1);
});