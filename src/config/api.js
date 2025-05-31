// Environment configuration for API endpoints
const config = {
  development: {
    // In development, use the Node.js proxy server
    apiBaseUrl: 'http://localhost:3001',
    useProxy: true
  },
  production: {
    // In production, also use the Node.js proxy server
    apiBaseUrl: '', // This will be relative to wherever the app is hosted
    useProxy: true
  }
};

// Determine current environment
const env = import.meta.env.MODE || 'production';

// Export configuration for current environment
export const apiConfig = config[env] || config.production;

// Helper function to create API URLs
export const getApiUrl = (path) => {
  const baseUrl = apiConfig.apiBaseUrl;
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${baseUrl}/${cleanPath}`;
};

// Helper function specifically for webhook URLs
export const getWebhookUrl = (path) => {
  const baseUrl = apiConfig.apiBaseUrl;
  // Ensure the path starts with webhook/
  const webhookPath = path.startsWith('webhook/') ? path : `webhook/${path}`;
  return `${baseUrl}/${webhookPath}`;
};
