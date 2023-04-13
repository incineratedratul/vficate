const http = require('http');
const fetch = require('node-fetch');

const server = http.createServer(async (req, res) => {
  const ipfsUrl = `http://localhost:5001${req.url}`;
  const ipfsResponse = await fetch(ipfsUrl, {
    method: req.method,
    headers: {
      ...req.headers,
      'Origin': 'http://127.0.0.1:5500', // Replace with your domain
    },
    body: req.method !== 'GET' ? req : undefined,
  });
  const ipfsResponseHeaders = {
    'Access-Control-Allow-Origin': 'http://127.0.0.1:5500', // Replace with your domain
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  Object.entries(ipfsResponseHeaders).forEach(([name, value]) => {
    res.setHeader(name, value);
  });
  res.writeHead(ipfsResponse.status, ipfsResponse.statusText);
  ipfsResponse.body.pipe(res);
});

server.listen(8080, () => {
  console.log('Proxy server listening on http://localhost:8080');
});
