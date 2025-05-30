import { useState } from 'react';
import './App.css';
import GmailLogin from './components/GmailLogin';

function App() {
  const [showGmailLogin, setShowGmailLogin] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    // Show alert with email/username
    alert('Login attempted Username: ' + username);
    // Additional login logic can go here
    console.log('Login submitted');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  
  const toggleLoginMode = () => {
    setShowGmailLogin(!showGmailLogin);
  };

  return (
    <>
      {showGmailLogin ? (
        <GmailLogin onBack={toggleLoginMode} />
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
            <span className="google-text">Iniciar sessão como Carlos</span>
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
