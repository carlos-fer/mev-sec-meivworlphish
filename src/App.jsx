
import './App.css';

function App() {
  return (
    <div className="login-page">
      <div className="login-bg"></div>
      <div className="main-content">
        <div className="login-screen">
          <div id="Spacer"></div>
          <form className="login-form" id="LoginForm" autoComplete="off">
            <div className="login-logo" style={{ textAlign: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <img src="https://dev.meivcore.com/Meivworld/img/Meivworld.LogoMeivworld.png" alt="Logo Meivworld" style={{ height: '100px' }} />
              </div>
            </div>
            <div className="login-inputs margin-top-m">
              <div>
                <div className="animated-label">
                  <div className="animated-label-input">
                    <input className="form-input" required type="text" maxLength={250} id="Input_UsernameVal" placeholder=" " />
                    <span className="animated-label-text mandatory">Utilizador</span>
                  </div>
                </div>
              </div>
              <div className="margin-top-base">
                <div className="animated-label">
                  <div className="animated-label-input">
                    <input className="form-input login-password" required type="password" id="Input_PasswordVal" placeholder=" " />
                    <span className="animated-label-text mandatory">Palavra-chave</span>
                  </div>
                </div>
              </div>
              <div className="margin-top-l">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input className="checkbox" type="checkbox" id="Checkbox1" defaultChecked />
                  <label htmlFor="Checkbox1" className="checkbox-label">Recordar-me</label>
                </div>
              </div>
            </div>
            <div className="login-button margin-top-l">
              <button className="btn btn-primary btn-large background-mw-red OSFillParent" type="submit">
                Entrar
              </button>
            </div>
            <div className="separator">
              <span>Ou</span>
            </div>
            <button className="google-btn" type="button">
              <img className="google-icon" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google icon" />
              Iniciar sessão com o Google
            </button>
          </form>
          <div className="mw-footer" style={{ marginTop: 32, textAlign: 'center' }}>
            <span className="text-neutral-7">© 2025 Meivworld Application Suite</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
