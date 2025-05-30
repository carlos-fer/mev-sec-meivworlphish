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
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './GmailLogin.css';

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
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
    return (
    <div className="gmail-login-page">
      <button className="back-button" onClick={onBack}>
        <ArrowBackIcon fontSize="small" className="back-icon" />
        Voltar
      </button>
      
      <div className="gmail-login-wrapper">
        <div className="login-card-container">          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
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
            Inicie sessão
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontSize: '16px',
              fontWeight: 400,
              mb: 6,
              color: '#202124',
              textAlign: 'center',
              fontFamily: 'Google Sans,Roboto,Arial,sans-serif'
            }}
          >
            Continuar para o Gmail
          </Typography>
            <FormControl 
            fullWidth 
            variant="outlined" 
            sx={{ 
              mb: 2,
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
                color: '#5f6368',
                fontSize: '16px',
                fontFamily: 'Roboto, Arial, sans-serif',
                '&.Mui-focused': {
                  color: '#1a73e8',
                }
              }}
            >
              Email ou telemóvel
            </InputLabel>
            <OutlinedInput
              id="email-input"
              value={email}
              onChange={handleEmailChange}
              label="Email ou telemóvel"
              fullWidth
              autoFocus
              sx={{
                height: '56px',
                borderRadius: '4px',
                fontSize: '16px',
                color: '#202124',
                fontFamily: 'Roboto, Arial, sans-serif',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderWidth: '2px',
                  borderColor: '#1a73e8',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#dadce0',
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
          </FormControl>
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
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mt: 8
          }}>
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
            </Link>            <Button
              variant="contained"
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
              Seguinte
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
