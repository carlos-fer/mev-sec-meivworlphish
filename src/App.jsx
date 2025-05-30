import { useState } from 'react';
import './App.css';

function App() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    // Handle login logic here
    console.log('Login submitted');
  };

  return (
    <div className="login-page">
      <div className="login-bg"></div>
      <div className="login-container">
        <div className="login-card">
          <div className="logo-container">
            <img src="/assets/meivworld-logo.png" alt="MEIV WORLD APPLICATION SUITE" />
          </div>
          
          <div className="input-field animated-label-input">
            <input type="text" id="username" className="form-control" placeholder=" " required />
            <label htmlFor="username">Utilizador <span className="required-mark">*</span></label>
            <div className="input-underline"></div>
          </div>
          
          <div className="input-field animated-label-input">
            <input type="password" id="password" className="form-control" placeholder=" " required />
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
          
          <button type="button" className="google-btn">
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
  );
}

export default App;
