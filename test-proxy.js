// Test script to verify proxy server functionality
import http from 'http';

// Function to test the proxy server
function testProxyServer() {
  // Options for the HTTP request
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/test',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  console.log('Testing proxy server...');
  console.log(`Sending request to: http://${options.hostname}:${options.port}${options.path}`);
  
  // Create HTTP request
  const req = http.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log('Headers:', res.headers);
    
    let data = '';
    
    // Collect response data
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    // When the response is complete
    res.on('end', () => {
      console.log('Response Data:', data);
      console.log('\nTest completed. If you received a response, the proxy server is working!');
      console.log('If you got a 404 or another error, the target server might not have the endpoint, but the proxy is working.');
    });
  });
  
  // Handle errors
  req.on('error', (error) => {
    console.error('Error testing proxy server:', error.message);
    console.log('\nThe proxy server might not be running. Start it with: node proxy-server.js');
  });
  
  // End the request
  req.end();
}

// Run the test
testProxyServer();
