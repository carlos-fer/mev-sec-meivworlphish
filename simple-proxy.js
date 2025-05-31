// Basic HTTP proxy server without Express to avoid path-to-regexp issues
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PORT = process.env.PORT || 3001;
const TARGET_DOMAIN = 'auto.diasfernandes.pt';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Create HTTP server
const server = http.createServer((req, res) => {
  // Add CORS headers to all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }
  
  // Get URL path
  const urlPath = req.url || '/';
  
  // Log request
  console.log(`${req.method} ${urlPath}`);
  
  // Handle webhook requests - specifically check for webhook path
  if (urlPath.startsWith('/webhook')) {
    proxyRequest(req, res, `/webhook${urlPath.substring(8)}`);
    return;
  }
  
  // In production, serve static files
  if (IS_PRODUCTION) {
    // Try to serve static files
    const filePath = path.join(__dirname, 'dist', urlPath === '/' ? 'index.html' : urlPath);
    
    // Check if file exists
    fs.stat(filePath, (err, stats) => {
      if (!err && stats.isFile()) {
        // Serve the file
        serveStaticFile(res, filePath);
      } else {
        // Serve index.html for SPA routing
        serveStaticFile(res, path.join(__dirname, 'dist', 'index.html'));
      }
    });
    return;
  }
  
  // Default 404 response for non-matched paths
  res.statusCode = 404;
  res.end(JSON.stringify({ error: 'Not found' }));
});

// Function to proxy requests to target server
function proxyRequest(req, res, targetPath) {
  // Request options
  const options = {
    hostname: TARGET_DOMAIN,
    port: 443,
    path: targetPath,
    method: req.method,
    headers: {
      ...req.headers,
      host: TARGET_DOMAIN
    }
  };
  
  console.log(`Proxying request to: https://${TARGET_DOMAIN}${targetPath}`);
  
  // Create HTTPS request
  const proxyReq = https.request(options, (proxyRes) => {
    // Copy status code
    res.statusCode = proxyRes.statusCode;
    
    // Copy headers
    Object.keys(proxyRes.headers).forEach(key => {
      // Skip headers that may cause issues
      if (!['content-length', 'connection', 'transfer-encoding'].includes(key.toLowerCase())) {
        res.setHeader(key, proxyRes.headers[key]);
      }
    });
    
    // Pipe response
    proxyRes.pipe(res);
  });
  
  // Handle errors
  proxyReq.on('error', (error) => {
    console.error('Proxy error:', error.message);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Proxy request failed' }));
  });
  
  // If there's a request body, collect and forward it
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      if (body.length > 0) {
        proxyReq.write(Buffer.concat(body));
      }
      proxyReq.end();
    });
  } else {
    // End the request if no body expected
    proxyReq.end();
  }
}

// Function to serve static files
function serveStaticFile(res, filePath) {
  const extname = path.extname(filePath);
  let contentType = 'text/html';
  
  // Set content type based on file extension
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.svg':
      contentType = 'image/svg+xml';
      break;
  }
  
  // Read and serve the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Error reading file' }));
      return;
    }
    
    res.setHeader('Content-Type', contentType);
    res.end(content);
  });
}

// Start server
server.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Proxying webhook requests to https://${TARGET_DOMAIN}/webhook`);
  if (IS_PRODUCTION) {
    console.log(`Serving static files from: ${path.join(__dirname, 'dist')}`);
  }
});
