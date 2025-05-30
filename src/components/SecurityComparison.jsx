import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Chip,
  Alert,
  IconButton,
  Tooltip,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CodeIcon from '@mui/icons-material/Code';
import HttpsIcon from '@mui/icons-material/Https';
import HttpIcon from '@mui/icons-material/Http';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import './SecurityComparison.css';

/**
 * SecurityComparison Component
 * 
 * This component provides a visual side-by-side comparison of secure vs. insecure
 * authentication practices to educate users on security best practices.
 */
function SecurityComparison() {
  const [activeStep, setActiveStep] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', content: '' });
  const [expandedSection, setExpandedSection] = useState(null);

  // Define the steps for the security comparison stepper
  const steps = [
    'Credential Handling',
    'MFA Implementation',
    'Session Management',
    'Cookie Security'
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep < steps.length - 1 ? prevStep + 1 : prevStep);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep > 0 ? prevStep - 1 : prevStep);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const showCodeExample = (title, content) => {
    setDialogContent({ title, content });
    setOpenDialog(true);
  };

  // Render the content for each step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%', borderColor: '#ffcccc' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <WarningIcon color="error" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="error">Insecure Practice</Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    Handling credentials insecurely by transmitting or storing passwords in plain text,
                    exposing them to potential interception.
                  </Typography>
                  
                  <Box mb={2}>
                    <Chip 
                      icon={<ErrorIcon />} 
                      label="Plain text password transmission" 
                      color="error" 
                      variant="outlined" 
                      sx={{ mb: 1, mr: 1 }}
                    />
                    <Chip 
                      icon={<ErrorIcon />} 
                      label="Client-side credential storage" 
                      color="error" 
                      variant="outlined" 
                      sx={{ mb: 1, mr: 1 }}
                    />
                    <Chip 
                      icon={<ErrorIcon />} 
                      label="Unprotected API endpoints" 
                      color="error" 
                      variant="outlined" 
                      sx={{ mb: 1 }}
                    />
                  </Box>
                  
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      bgcolor: '#fff8f8', 
                      p: 2, 
                      border: '1px dashed #ffcccc',
                      position: 'relative'
                    }}
                  >
                    <Typography variant="subtitle2" color="error" gutterBottom>
                      Vulnerable Code:
                    </Typography>
                    <Box 
                      component="pre" 
                      sx={{ 
                        fontSize: '0.8rem', 
                        bgcolor: '#fff8f8', 
                        p: 1, 
                        overflowX: 'auto',
                        m: 0
                      }}
                    >
                      <code>{`// Insecure credential handling
const login = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // Plain text credentials in localStorage
  localStorage.setItem('userEmail', email);
  
  // Insecure API call with credentials in URL
  fetch(\`/api/login?email=\${email}&password=\${password}\`)
    .then(res => res.json())
    .then(data => console.log('Login successful'));
}`}</code>
                    </Box>
                    <IconButton 
                      size="small" 
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                      onClick={() => showCodeExample('Insecure Credential Handling', `// Insecure credential handling
const login = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // Plain text credentials in localStorage
  localStorage.setItem('userEmail', email);
  
  // Insecure API call with credentials in URL
  fetch(\`/api/login?email=\${email}&password=\${password}\`)
    .then(res => res.json())
    .then(data => console.log('Login successful'));

  // Insecure storage of password (NEVER DO THIS)
  sessionStorage.setItem('credentials', 
    JSON.stringify({ email, password }));
}`)}
                    >
                      <Tooltip title="View full code example">
                        <CodeIcon fontSize="small" />
                      </Tooltip>
                    </IconButton>
                  </Paper>
                  
                  <Box mt={2}>
                    <Typography variant="subtitle2" color="error" gutterBottom>
                      Security Risks:
                    </Typography>
                    <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                      <li>Credentials can be intercepted in transit</li>
                      <li>Browser storage exposes passwords to XSS attacks</li>
                      <li>Password appears in server logs and browser history</li>
                    </ul>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%', borderColor: '#ccffcc' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="success">Secure Practice</Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    Implementing secure credential handling with proper encryption,
                    transmission over HTTPS, and server-side password hashing.
                  </Typography>
                  
                  <Box mb={2}>
                    <Chip 
                      icon={<CheckCircleIcon />} 
                      label="HTTPS transmission only" 
                      color="success" 
                      variant="outlined" 
                      sx={{ mb: 1, mr: 1 }}
                    />
                    <Chip 
                      icon={<CheckCircleIcon />} 
                      label="No client-side password storage" 
                      color="success" 
                      variant="outlined" 
                      sx={{ mb: 1, mr: 1 }}
                    />
                    <Chip 
                      icon={<CheckCircleIcon />} 
                      label="POST requests with encrypted body" 
                      color="success" 
                      variant="outlined" 
                      sx={{ mb: 1 }}
                    />
                  </Box>
                  
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      bgcolor: '#f8fff8', 
                      p: 2, 
                      border: '1px dashed #ccffcc',
                      position: 'relative'
                    }}
                  >
                    <Typography variant="subtitle2" color="success" gutterBottom>
                      Secure Code:
                    </Typography>
                    <Box 
                      component="pre" 
                      sx={{ 
                        fontSize: '0.8rem', 
                        bgcolor: '#f8fff8', 
                        p: 1, 
                        overflowX: 'auto',
                        m: 0
                      }}
                    >
                      <code>{`// Secure credential handling
const login = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
    // Secure POST request with credentials in body
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    if (response.ok) {
      // Store only the session token, never the password
      const { token } = await response.json();
      // Process secure token
    }
  } catch (error) {
    // Handle errors securely
  }
}`}</code>
                    </Box>
                    <IconButton 
                      size="small" 
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                      onClick={() => showCodeExample('Secure Credential Handling', `// Secure credential handling
const login = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
    // Create a one-time challenge for this login attempt
    const { challenge } = await fetch('/api/auth/challenge').then(r => r.json());
    
    // Secure POST request with credentials in encrypted body
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': sessionStorage.getItem('csrfToken')
      },
      credentials: 'same-origin', // Include cookies
      body: JSON.stringify({ 
        email,
        password, // Will be hashed server-side
        challenge // Prevents replay attacks
      })
    });
    
    if (response.ok) {
      // Store only the session token, never the password
      const { token } = await response.json();
      
      // Process secure token (stored as HttpOnly cookie)
      window.location.href = '/dashboard';
    }
  } catch (error) {
    // Handle errors securely without leaking info
    console.error('Authentication failed');
  }
}`)}
                    >
                      <Tooltip title="View full code example">
                        <CodeIcon fontSize="small" />
                      </Tooltip>
                    </IconButton>
                  </Paper>
                  
                  <Box mt={2}>
                    <Typography variant="subtitle2" color="success" gutterBottom>
                      Security Benefits:
                    </Typography>
                    <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                      <li>Credentials protected during transmission</li>
                      <li>No client-side password storage eliminates XSS risks</li>
                      <li>Server-side hashing prevents password exposure</li>
                    </ul>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
      
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%', borderColor: '#ffcccc' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <WarningIcon color="error" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="error">Insecure MFA Implementation</Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    Vulnerable multi-factor authentication implementation that can be bypassed
                    or intercepted, negating the additional security layer.
                  </Typography>
                  
                  <Box mb={2}>
                    <Chip 
                      icon={<ErrorIcon />} 
                      label="Client-side MFA validation" 
                      color="error" 
                      variant="outlined" 
                      sx={{ mb: 1, mr: 1 }}
                    />
                    <Chip 
                      icon={<ErrorIcon />} 
                      label="No rate limiting on attempts" 
                      color="error" 
                      variant="outlined" 
                      sx={{ mb: 1, mr: 1 }}
                    />
                    <Chip 
                      icon={<ErrorIcon />} 
                      label="Long-lived MFA tokens" 
                      color="error" 
                      variant="outlined" 
                      sx={{ mb: 1 }}
                    />
                  </Box>
                  
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      bgcolor: '#fff8f8', 
                      p: 2, 
                      border: '1px dashed #ffcccc',
                      position: 'relative'
                    }}
                  >
                    <Typography variant="subtitle2" color="error" gutterBottom>
                      Vulnerable Code:
                    </Typography>
                    <Box 
                      component="pre" 
                      sx={{ 
                        fontSize: '0.8rem', 
                        bgcolor: '#fff8f8', 
                        p: 1, 
                        overflowX: 'auto',
                        m: 0
                      }}
                    >
                      <code>{`// Insecure MFA implementation
function verifyMFA() {
  const mfaToken = document.getElementById('mfaInput').value;
  const expectedToken = sessionStorage.getItem('currentMFAToken');
  
  // Client-side validation (INSECURE)
  if (mfaToken === expectedToken) {
    // Grant access on client side
    redirectToApp();
  } else {
    showError('Invalid token');
  }
}`}</code>
                    </Box>
                    <IconButton 
                      size="small" 
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                      onClick={() => showCodeExample('Insecure MFA Implementation', `// Insecure MFA implementation
function verifyMFA() {
  const mfaToken = document.getElementById('mfaInput').value;
  const expectedToken = sessionStorage.getItem('currentMFAToken');
  const userId = localStorage.getItem('userId');
  
  // CLIENT-SIDE VALIDATION (EXTREMELY INSECURE)
  if (mfaToken === expectedToken) {
    // Grant access directly from client side
    localStorage.setItem('isAuthenticated', 'true');
    redirectToApp();
  } else {
    showError('Invalid token');
  }
}

// Insecure MFA token generation
function generateMFAToken() {
  // Uses predictable math.random
  const token = Math.floor(100000 + Math.random() * 900000);
  
  // Stores the token in client-accessible storage
  sessionStorage.setItem('currentMFAToken', token.toString());
  
  // Sends via insecure channel
  sendTokenToUser(token);
  
  // No expiration mechanism
}`)}
                    >
                      <Tooltip title="View full code example">
                        <CodeIcon fontSize="small" />
                      </Tooltip>
                    </IconButton>
                  </Paper>
                  
                  <Box mt={2}>
                    <Typography variant="subtitle2" color="error" gutterBottom>
                      Security Risks:
                    </Typography>
                    <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                      <li>MFA validation can be bypassed by modifying client-side code</li>
                      <li>Tokens can be brute-forced without rate limiting</li>
                      <li>MFA provides false sense of security</li>
                    </ul>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%', borderColor: '#ccffcc' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="success">Secure MFA Implementation</Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    Robust MFA implementation using time-based one-time passwords (TOTP)
                    with proper server-side validation and security controls.
                  </Typography>
                  
                  <Box mb={2}>
                    <Chip 
                      icon={<CheckCircleIcon />} 
                      label="Server-side validation only" 
                      color="success" 
                      variant="outlined" 
                      sx={{ mb: 1, mr: 1 }}
                    />
                    <Chip 
                      icon={<CheckCircleIcon />} 
                      label="Time-based expiration (TOTP)" 
                      color="success" 
                      variant="outlined" 
                      sx={{ mb: 1, mr: 1 }}
                    />
                    <Chip 
                      icon={<CheckCircleIcon />} 
                      label="Rate limiting & brute force protection" 
                      color="success" 
                      variant="outlined" 
                      sx={{ mb: 1 }}
                    />
                  </Box>
                  
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      bgcolor: '#f8fff8', 
                      p: 2, 
                      border: '1px dashed #ccffcc',
                      position: 'relative'
                    }}
                  >
                    <Typography variant="subtitle2" color="success" gutterBottom>
                      Secure Code:
                    </Typography>
                    <Box 
                      component="pre" 
                      sx={{ 
                        fontSize: '0.8rem', 
                        bgcolor: '#f8fff8', 
                        p: 1, 
                        overflowX: 'auto',
                        m: 0
                      }}
                    >
                      <code>{`// Secure MFA implementation
async function verifyMFA() {
  const mfaToken = document.getElementById('mfaInput').value;
  const userId = sessionStorage.getItem('userId');
  
  try {
    // Server-side validation only
    const response = await fetch('/api/verify-mfa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, token: mfaToken })
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Process the secure session token from server
      processAuthToken(result.sessionToken);
    } else {
      handleError(result.error);
    }
  } catch (error) {
    // Handle errors securely
  }
}`}</code>
                    </Box>
                    <IconButton 
                      size="small" 
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                      onClick={() => showCodeExample('Secure MFA Implementation', `// Secure MFA implementation
async function verifyMFA() {
  const mfaToken = document.getElementById('mfaInput').value;
  const userId = sessionStorage.getItem('userId');
  const requestId = sessionStorage.getItem('mfaRequestId');
  
  try {
    // Server-side validation with CSRF protection
    const response = await fetch('/api/verify-mfa', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': sessionStorage.getItem('csrfToken')
      },
      credentials: 'same-origin',
      body: JSON.stringify({ 
        userId, 
        token: mfaToken,
        requestId // Prevents replay attacks
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Clear temporary MFA data
      sessionStorage.removeItem('mfaRequestId');
      
      // Process the secure session token from server
      // (typically set as HttpOnly cookie by the server)
      window.location.href = '/dashboard';
    } else {
      // Limited error information to prevent enumeration
      if (result.remainingAttempts) {
        showError(\`Invalid code. \${result.remainingAttempts} attempts remaining.\`);
      } else if (result.lockoutMinutes) {
        showError(\`Account temporarily locked. Try again in \${result.lockoutMinutes} minutes.\`);
      } else {
        showError('Verification failed');
      }
    }
  } catch (error) {
    showError('An error occurred during verification');
  }
}`)}
                    >
                      <Tooltip title="View full code example">
                        <CodeIcon fontSize="small" />
                      </Tooltip>
                    </IconButton>
                  </Paper>
                  
                  <Box mt={2}>
                    <Typography variant="subtitle2" color="success" gutterBottom>
                      Security Benefits:
                    </Typography>
                    <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                      <li>Server-side validation prevents client-side bypass</li>
                      <li>Time-based tokens expire quickly (typically 30 seconds)</li>
                      <li>Rate limiting prevents brute force attacks</li>
                      <li>TOTP standard ensures compatibility with authenticator apps</li>
                    </ul>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
        
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%', borderColor: '#ffcccc' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <WarningIcon color="error" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="error">Insecure Session Management</Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    Vulnerable session management with long-lived tokens and insecure storage
                    that allows session hijacking and unauthorized access.
                  </Typography>
                  
                  <Box mb={2}>
                    <Chip 
                      icon={<ErrorIcon />} 
                      label="localStorage token storage" 
                      color="error" 
                      variant="outlined" 
                      sx={{ mb: 1, mr: 1 }}
                    />
                    <Chip 
                      icon={<ErrorIcon />} 
                      label="No token expiration" 
                      color="error" 
                      variant="outlined" 
                      sx={{ mb: 1, mr: 1 }}
                    />
                    <Chip 
                      icon={<ErrorIcon />} 
                      label="Insecure transmission" 
                      color="error" 
                      variant="outlined" 
                      sx={{ mb: 1 }}
                    />
                  </Box>
                  
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      bgcolor: '#fff8f8', 
                      p: 2, 
                      border: '1px dashed #ffcccc',
                      position: 'relative'
                    }}
                  >
                    <Typography variant="subtitle2" color="error" gutterBottom>
                      Vulnerable Code:
                    </Typography>
                    <Box 
                      component="pre" 
                      sx={{ 
                        fontSize: '0.8rem', 
                        bgcolor: '#fff8f8', 
                        p: 1, 
                        overflowX: 'auto',
                        m: 0
                      }}
                    >
                      <code>{`// Insecure session management
function storeAuthToken(token) {
  // Store in localStorage (accessible to any JS)
  localStorage.setItem('authToken', token);
  
  // Set as a basic cookie
  document.cookie = "sessionId=" + token + ";path=/";
}

// Using the token
function makeAuthenticatedRequest(url, data) {
  const token = localStorage.getItem('authToken');
  
  // Send in URL query parameter (visible in logs)
  return fetch(\`\${url}?token=\${token}\`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}`}</code>
                    </Box>
                    <IconButton 
                      size="small" 
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                      onClick={() => showCodeExample('Insecure Session Management', `// Insecure session management
function storeAuthToken(token) {
  // Store in localStorage (accessible to any JS)
  localStorage.setItem('authToken', token);
  
  // Set as a basic cookie without security flags
  document.cookie = "sessionId=" + token + ";path=/";
}

// Using the token
function makeAuthenticatedRequest(url, data) {
  const token = localStorage.getItem('authToken');
  
  // Send in URL query parameter (visible in logs & bookmarks)
  return fetch(\`\${url}?token=\${token}\`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

// No token validation or expiration check
function checkIfLoggedIn() {
  return !!localStorage.getItem('authToken');
}

// No CSRF protection
function updateUserProfile(data) {
  const token = localStorage.getItem('authToken');
  
  return fetch('/api/profile/update', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + token },
    body: JSON.stringify(data)
  });
}`)}
                    >
                      <Tooltip title="View full code example">
                        <CodeIcon fontSize="small" />
                      </Tooltip>
                    </IconButton>
                  </Paper>
                  
                  <Box mt={2}>
                    <Typography variant="subtitle2" color="error" gutterBottom>
                      Security Risks:
                    </Typography>
                    <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                      <li>XSS attacks can steal tokens from localStorage</li>
                      <li>Long-lived tokens remain valid if stolen</li>
                      <li>Tokens in URLs appear in server logs and browser history</li>
                      <li>No protection against CSRF attacks</li>
                    </ul>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%', borderColor: '#ccffcc' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="success">Secure Session Management</Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    Robust session management using secure cookies, token rotation,
                    and proper expiration policies.
                  </Typography>
                  
                  <Box mb={2}>
                    <Chip 
                      icon={<CheckCircleIcon />} 
                      label="HttpOnly cookies" 
                      color="success" 
                      variant="outlined" 
                      sx={{ mb: 1, mr: 1 }}
                    />
                    <Chip 
                      icon={<CheckCircleIcon />} 
                      label="Short-lived tokens with refresh" 
                      color="success" 
                      variant="outlined" 
                      sx={{ mb: 1, mr: 1 }}
                    />
                    <Chip 
                      icon={<CheckCircleIcon />} 
                      label="CSRF protection" 
                      color="success" 
                      variant="outlined" 
                      sx={{ mb: 1 }}
                    />
                  </Box>
                  
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      bgcolor: '#f8fff8', 
                      p: 2, 
                      border: '1px dashed #ccffcc',
                      position: 'relative'
                    }}
                  >
                    <Typography variant="subtitle2" color="success" gutterBottom>
                      Secure Code:
                    </Typography>
                    <Box 
                      component="pre" 
                      sx={{ 
                        fontSize: '0.8rem', 
                        bgcolor: '#f8fff8', 
                        p: 1, 
                        overflowX: 'auto',
                        m: 0
                      }}
                    >
                      <code>{`// Secure session management
// Note: Cookies are set by the server with proper flags
// Front-end doesn't handle tokens directly

async function makeAuthenticatedRequest(url, data) {
  try {
    // Get CSRF token from meta tag
    const csrfToken = document.querySelector(
      'meta[name="csrf-token"]'
    ).getAttribute('content');
    
    // Send request with credentials (cookies)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      credentials: 'same-origin', // Send cookies
      body: JSON.stringify(data)
    });
    
    return response.json();
  } catch (error) {
    handleRequestError(error);
  }
}`}</code>
                    </Box>
                    <IconButton 
                      size="small" 
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                      onClick={() => showCodeExample('Secure Session Management', `// Secure session management
// Note: Cookies are set by the server with proper flags
// Front-end doesn't handle tokens directly

async function makeAuthenticatedRequest(url, data) {
  try {
    // Get CSRF token from meta tag
    const csrfToken = document.querySelector(
      'meta[name="csrf-token"]'
    ).getAttribute('content');
    
    // Send request with credentials (cookies)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      credentials: 'same-origin', // Send cookies
      body: JSON.stringify(data)
    });
    
    // Handle token expiration and refresh
    if (response.status === 401) {
      const refreshResult = await refreshSession();
      if (refreshResult.success) {
        // Retry the original request
        return makeAuthenticatedRequest(url, data);
      } else {
        // Session expired completely, redirect to login
        window.location.href = '/login?expired=true';
        return null;
      }
    }
    
    return response.json();
  } catch (error) {
    handleRequestError(error);
  }
}

// Check session status
async function checkSession() {
  try {
    const response = await fetch('/api/auth/session', {
      credentials: 'same-origin'
    });
    
    if (!response.ok) {
      // Redirect to login if session invalid
      window.location.href = '/login';
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Session check failed:', error);
    return false;
  }
}`)}
                    >
                      <Tooltip title="View full code example">
                        <CodeIcon fontSize="small" />
                      </Tooltip>
                    </IconButton>
                  </Paper>
                  
                  <Box mt={2}>
                    <Typography variant="subtitle2" color="success" gutterBottom>
                      Security Benefits:
                    </Typography>
                    <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                      <li>HttpOnly cookies prevent JavaScript access to tokens</li>
                      <li>Automatic token refresh provides security with convenience</li>
                      <li>CSRF tokens prevent cross-site request forgery attacks</li>
                      <li>Short-lived tokens minimize damage if compromised</li>
                    </ul>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
        
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%', borderColor: '#ffcccc' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <WarningIcon color="error" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="error">Insecure Cookie Configuration</Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    Vulnerable cookie configuration that exposes sensitive data and
                    allows cookie theft or manipulation.
                  </Typography>
                  
                  <Box mb={2}>
                    <Chip 
                      icon={<ErrorIcon />} 
                      label="Missing HttpOnly flag" 
                      color="error" 
                      variant="outlined" 
                      sx={{ mb: 1, mr: 1 }}
                    />
                    <Chip 
                      icon={<ErrorIcon />} 
                      label="Missing Secure flag" 
                      color="error" 
                      variant="outlined" 
                      sx={{ mb: 1, mr: 1 }}
                    />
                    <Chip 
                      icon={<ErrorIcon />} 
                      label="No SameSite protection" 
                      color="error" 
                      variant="outlined" 
                      sx={{ mb: 1 }}
                    />
                  </Box>
                  
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      bgcolor: '#fff8f8', 
                      p: 2, 
                      border: '1px dashed #ffcccc',
                      position: 'relative'
                    }}
                  >
                    <Typography variant="subtitle2" color="error" gutterBottom>
                      Vulnerable Cookies:
                    </Typography>
                    <Box 
                      component="pre" 
                      sx={{ 
                        fontSize: '0.8rem', 
                        bgcolor: '#fff8f8', 
                        p: 1, 
                        overflowX: 'auto',
                        m: 0
                      }}
                    >
                      <code>{`// Insecure cookie setting
function setAuthCookie(sessionId) {
  // Basic cookie with no security flags
  document.cookie = \`sessionId=\${sessionId};path=/\`;
}

// Reading cookies in JavaScript
function getSessionId() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'sessionId') {
      return value;
    }
  }
  return null;
}`}</code>
                    </Box>
                    <IconButton 
                      size="small" 
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                      onClick={() => showCodeExample('Insecure Cookie Configuration', `// Insecure cookie setting
function setAuthCookie(sessionId) {
  // Basic cookie with no security flags
  document.cookie = \`sessionId=\${sessionId};path=/\`;
}

// Reading cookies in JavaScript (possible due to missing HttpOnly)
function getSessionId() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'sessionId') {
      return value;
    }
  }
  return null;
}

// Cookie manipulation (possible due to missing protections)
function elevatePrivileges() {
  // This should never be possible
  document.cookie = "userRole=admin;path=/";
}

// Using cookies over HTTP and HTTPS (due to missing Secure flag)
fetch('http://example.com/api/user-data', {
  credentials: 'include' // Sends cookies with request
}).then(response => response.json())
  .then(data => console.log(data));`)}
                    >
                      <Tooltip title="View full code example">
                        <CodeIcon fontSize="small" />
                      </Tooltip>
                    </IconButton>
                  </Paper>
                  
                  <Box mt={2}>
                    <Typography variant="subtitle2" color="error" gutterBottom>
                      Security Risks:
                    </Typography>
                    <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                      <li>JavaScript can access cookie values (XSS vulnerability)</li>
                      <li>Cookies sent over insecure HTTP connections</li>
                      <li>Vulnerable to cross-site request forgery (CSRF)</li>
                      <li>Man-in-the-middle attacks can intercept cookies</li>
                    </ul>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%', borderColor: '#ccffcc' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="success">Secure Cookie Configuration</Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    Properly configured cookies with all security flags enabled to
                    prevent unauthorized access and theft.
                  </Typography>
                  
                  <Box mb={2}>
                    <Chip 
                      icon={<CheckCircleIcon />} 
                      label="HttpOnly flag enabled" 
                      color="success" 
                      variant="outlined" 
                      sx={{ mb: 1, mr: 1 }}
                    />
                    <Chip 
                      icon={<CheckCircleIcon />} 
                      label="Secure flag enabled" 
                      color="success" 
                      variant="outlined" 
                      sx={{ mb: 1, mr: 1 }}
                    />
                    <Chip 
                      icon={<CheckCircleIcon />} 
                      label="SameSite=Strict" 
                      color="success" 
                      variant="outlined" 
                      sx={{ mb: 1 }}
                    />
                  </Box>
                  
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      bgcolor: '#f8fff8', 
                      p: 2, 
                      border: '1px dashed #ccffcc',
                      position: 'relative'
                    }}
                  >
                    <Typography variant="subtitle2" color="success" gutterBottom>
                      Secure Cookies (Server-side):
                    </Typography>
                    <Box 
                      component="pre" 
                      sx={{ 
                        fontSize: '0.8rem', 
                        bgcolor: '#f8fff8', 
                        p: 1, 
                        overflowX: 'auto',
                        m: 0
                      }}
                    >
                      <code>{`// Server-side cookie setting (Node.js Express example)
app.post('/api/login', (req, res) => {
  // Authenticate user...
  
  // Generate secure session ID
  const sessionId = generateSecureRandomToken();
  
  // Set cookie with all security flags
  res.cookie('sessionId', sessionId, {
    httpOnly: true,    // Prevents JavaScript access
    secure: true,      // HTTPS only
    sameSite: 'strict',// Prevents CSRF
    path: '/',
    maxAge: 3600000    // 1 hour expiration
  });
  
  res.json({ success: true });
});`}</code>
                    </Box>
                    <IconButton 
                      size="small" 
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                      onClick={() => showCodeExample('Secure Cookie Configuration', `// Server-side cookie setting (Node.js Express example)
app.post('/api/login', (req, res) => {
  // Authenticate user...
  const { email, password } = req.body;
  
  try {
    // Verify credentials securely
    const user = await verifyUserCredentials(email, password);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }
    
    // Generate secure session ID
    const sessionId = generateSecureRandomToken();
    
    // Store session in database with expiration
    await saveSession({
      sessionId,
      userId: user.id,
      expiresAt: new Date(Date.now() + 3600000), // 1 hour
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip
    });
    
    // Set cookie with all security flags
    res.cookie('sessionId', sessionId, {
      httpOnly: true,    // Prevents JavaScript access
      secure: true,      // HTTPS only
      sameSite: 'strict',// Prevents CSRF
      path: '/',
      maxAge: 3600000    // 1 hour expiration
    });
    
    // Set a separate CSRF token cookie for API requests
    const csrfToken = generateSecureRandomToken();
    res.cookie('csrfToken', csrfToken, {
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 3600000
    });
    
    res.json({ success: true, csrfToken });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Authentication failed' 
    });
  }
});

// Client can't access HttpOnly cookies directly
// Must use credentials: 'include' in fetch requests
fetch('/api/user-profile', {
  credentials: 'include',
  headers: {
    'X-CSRF-Token': getCsrfTokenFromCookie()
  }
}).then(/* handle response */);`)}
                    >
                      <Tooltip title="View full code example">
                        <CodeIcon fontSize="small" />
                      </Tooltip>
                    </IconButton>
                  </Paper>
                  
                  <Box mt={2}>
                    <Typography variant="subtitle2" color="success" gutterBottom>
                      Security Benefits:
                    </Typography>
                    <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                      <li>HttpOnly prevents JavaScript access, mitigating XSS risks</li>
                      <li>Secure flag ensures cookies only sent over HTTPS</li>
                      <li>SameSite prevents CSRF attacks</li>
                      <li>Short expiration limits impact of stolen cookies</li>
                    </ul>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
        
      default:
        return null;
    }
  };

  return (
    <Box sx={{ py: 4, px: 2, maxWidth: 1200, mx: 'auto' }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 500, mb: 3 }}>
          <SecurityIcon sx={{ fontSize: 28, verticalAlign: 'middle', mr: 1.5 }} />
          Security Comparison: Vulnerable vs. Secure Practices
        </Typography>
        
        <Typography variant="body1" paragraph color="text.secondary">
          This interactive guide compares insecure authentication practices with their secure counterparts.
          Each example demonstrates how subtle implementation details can create significant security vulnerabilities
          and how to address them with modern security best practices.
        </Typography>
        
        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body2">
            <strong>Educational Purpose:</strong> These examples are designed to highlight common security vulnerabilities
            and demonstrate secure alternatives. The vulnerable code examples should never be used in production environments.
          </Typography>
        </Alert>
      </Paper>

      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box sx={{ mb: 4 }}>
          {getStepContent(activeStep)}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            Next
          </Button>
        </Box>
      </Box>
      
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {dialogContent.title}
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <Tooltip title="Copy code">
              <FileCopyIcon />
            </Tooltip>
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText component="div">
            <Box 
              component="pre" 
              sx={{ 
                fontSize: '0.9rem', 
                bgcolor: '#f5f5f5', 
                p: 2, 
                borderRadius: 1,
                overflowX: 'auto'
              }}
            >
              <code>{dialogContent.content}</code>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SecurityComparison;
