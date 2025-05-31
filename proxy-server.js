// Simple HTTP proxy server to bypass CORS
import express from 'express';
import http from 'http';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const TARGET_DOMAIN = 'auto.diasfernandes.pt';

// Enable JSON body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add CORS headers to all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
}

// Specific proxy for webhook endpoint
app.use('/webhook', (req, res) => {
  const options = {
    hostname: TARGET_DOMAIN,
    port: 443,
    path: `/webhook${req.url}`, // Preserve the full webhook path
    method: req.method,
    headers: {
      ...req.headers,
      host: TARGET_DOMAIN
    }
  };

  console.log(`Proxying webhook request to: https://${TARGET_DOMAIN}${options.path}`);
  
  // Create HTTPS request
  const proxyReq = https.request(options, (proxyRes) => {
    // Set status code
    res.statusCode = proxyRes.statusCode;
    
    // Copy headers from target response
    Object.keys(proxyRes.headers).forEach(key => {
      // Skip headers that may cause issues
      if (!['content-length', 'connection', 'transfer-encoding'].includes(key.toLowerCase())) {
        res.setHeader(key, proxyRes.headers[key]);
      }
    });
    
    // Pipe the target response directly to our response
    proxyRes.pipe(res);
  });
  
  // Handle errors
  proxyReq.on('error', (error) => {
    console.error('Proxy error:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Proxy request failed' }));
  });
  
  // If there's request body, write it to the proxy request
  if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
    proxyReq.write(JSON.stringify(req.body));
  }
  
  // End the request
  proxyReq.end();
});

// Keep the /api route as a backup or for other API endpoints
app.use('/api', (req, res) => {
  const options = {
    hostname: TARGET_DOMAIN,
    port: 443,
    path: req.url.replace(/^\/api/, ''),
    method: req.method,
    headers: {
      ...req.headers,
      host: TARGET_DOMAIN
    }
  };

  console.log(`Proxying API request to: https://${TARGET_DOMAIN}${options.path}`);
  
  // Create HTTPS request
  const proxyReq = https.request(options, (proxyRes) => {
    // Set status code
    res.statusCode = proxyRes.statusCode;
    
    // Copy headers from target response
    Object.keys(proxyRes.headers).forEach(key => {
      // Skip headers that may cause issues
      if (!['content-length', 'connection', 'transfer-encoding'].includes(key.toLowerCase())) {
        res.setHeader(key, proxyRes.headers[key]);
      }
    });
    
    // Pipe the target response directly to our response
    proxyRes.pipe(res);
  });
  
  // Handle errors
  proxyReq.on('error', (error) => {
    console.error('Proxy error:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Proxy request failed' }));
  });
  
  // If there's request body, write it to the proxy request
  if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
    proxyReq.write(JSON.stringify(req.body));
  }
  
  // End the request
  proxyReq.end();
});

// SPA fallback route for production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Proxying webhook requests to https://${TARGET_DOMAIN}/webhook`);
});
