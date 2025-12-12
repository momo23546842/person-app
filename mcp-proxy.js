#!/usr/bin/env node

const https = require('https');
const http = require('http');

const REMOTE_URL = 'https://person-app-gamma.vercel.app/api/mcp';

// STDIO transport for MCP
process.stdin.setEncoding('utf8');
process.stdout.setEncoding('utf8');

let buffer = '';

process.stdin.on('data', (chunk) => {
  buffer += chunk;
  
  // Process complete JSON-RPC messages
  const lines = buffer.split('\n');
  buffer = lines.pop() || '';
  
  lines.forEach(line => {
    if (line.trim()) {
      forwardToRemote(line);
    }
  });
});

function forwardToRemote(message) {
  const url = new URL(REMOTE_URL);
  
  const options = {
    hostname: url.hostname,
    port: url.port || 443,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(message)
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      process.stdout.write(data + '\n');
    });
  });

  req.on('error', (error) => {
    console.error('Proxy error:', error);
  });

  req.write(message);
  req.end();
}

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});