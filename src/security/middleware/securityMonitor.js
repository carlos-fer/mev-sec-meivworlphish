/**
 * SECURITY MONITORING SERVICE
 * 
 * This service demonstrates how security monitoring can detect authentication attacks.
 * It's intended for educational purposes only.
 */

/**
 * Monitors authentication attempts for suspicious patterns
 */
export class SecurityMonitor {
  constructor() {
    this.authAttempts = new Map();
    this.suspiciousIPs = new Set();
    this.alertCallback = null;
  }

  /**
   * Register an authentication attempt
   * @param {string} userId - User identifier (email/username)
   * @param {string} clientIP - Client IP address
   * @param {string} userAgent - Browser user agent
   * @param {boolean} success - Whether authentication was successful
   */
  registerAuthAttempt(userId, clientIP, userAgent, success) {
    if (!this.authAttempts.has(userId)) {
      this.authAttempts.set(userId, []);
    }
    
    const attempts = this.authAttempts.get(userId);
    attempts.push({
      timestamp: Date.now(),
      clientIP,
      userAgent,
      success
    });
    
    // Check for brute force attacks
    this.detectBruteForce(userId);
    
    // Check for distributed attacks
    this.detectDistributedAttacks(userId);
    
    // Check for suspicious IPs
    this.checkSuspiciousIP(clientIP);
  }
  
  /**
   * Check for brute force attacks (multiple failed login attempts)
   * @param {string} userId - User identifier
   */
  detectBruteForce(userId) {
    const attempts = this.authAttempts.get(userId);
    const recentAttempts = attempts.filter(a => 
      Date.now() - a.timestamp < 15 * 60 * 1000 // Last 15 minutes
    );
    
    const failedAttempts = recentAttempts.filter(a => !a.success);
    
    if (failedAttempts.length >= 5) {
      this.triggerAlert({
        type: 'BRUTE_FORCE',
        userId,
        failedAttempts: failedAttempts.length,
        timeWindow: '15 minutes',
        severity: 'HIGH'
      });
    }
  }
  
  /**
   * Detect distributed attacks (same user, different IPs)
   * @param {string} userId - User identifier
   */
  detectDistributedAttacks(userId) {
    const attempts = this.authAttempts.get(userId);
    const recentAttempts = attempts.filter(a => 
      Date.now() - a.timestamp < 60 * 60 * 1000 // Last hour
    );
    
    const uniqueIPs = new Set(recentAttempts.map(a => a.clientIP));
    
    if (uniqueIPs.size > 3) {
      this.triggerAlert({
        type: 'DISTRIBUTED_ATTACK',
        userId,
        uniqueIPs: uniqueIPs.size,
        timeWindow: '1 hour',
        severity: 'HIGH'
      });
    }
  }
  
  /**
   * Check if IP is on suspicious list
   * @param {string} clientIP - Client IP address
   */
  checkSuspiciousIP(clientIP) {
    if (this.suspiciousIPs.has(clientIP)) {
      this.triggerAlert({
        type: 'SUSPICIOUS_IP',
        clientIP,
        severity: 'MEDIUM'
      });
    }
  }
  
  /**
   * Trigger security alert
   * @param {Object} alert - Alert details
   */
  triggerAlert(alert) {
    console.warn('SECURITY ALERT:', alert);
    
    if (this.alertCallback) {
      this.alertCallback(alert);
    }
  }
  
  /**
   * Set callback for security alerts
   * @param {Function} callback - Function to be called on alert
   */
  setAlertCallback(callback) {
    this.alertCallback = callback;
  }
  
  /**
   * Add IP to suspicious list
   * @param {string} ip - IP address
   */
  addSuspiciousIP(ip) {
    this.suspiciousIPs.add(ip);
  }
}

// Export singleton instance
export const securityMonitor = new SecurityMonitor();
