
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
                  <div className="animated-label-text">
                    <label htmlFor="Input_UsernameVal" className="mandatory OSFillParent">
                      <span className="text-neutral-0">Utilizador</span>
                    </label>
                  </div>
                  <div className="animated-label-input">
                    <span className="input-text">
                      <input className="form-control OSFillParent" required type="text" maxLength={250} id="Input_UsernameVal" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="margin-top-base">
                <div className="animated-label">
                  <div className="animated-label-text">
                    <label htmlFor="Input_PasswordVal" className="mandatory OSFillParent">
                      <span className="text-neutral-0">Palavra-chave</span>
                    </label>
                  </div>
                  <div className="animated-label-input">
                    <span className="input-password">
                      <input className="form-control login-password OSFillParent" required type="password" id="Input_PasswordVal" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="margin-top-l">
                <div className="columns columns2 gutter-base tablet-break-none phone-break-none">
                  <div className="columns-item">
                    <div className="vertical-align flex-direction-row">
                      <span>
                        <input className="checkbox" type="checkbox" id="Checkbox1" defaultChecked />
                      </span>
                      <label htmlFor="Checkbox1" className="font-size-s margin-left-s OSFillParent">
                        <span className="text-neutral-0">Recordar-me</span>
                      </label>
                    </div>
                  </div>
                  <div className="columns-item" style={{ textAlign: 'right' }}></div>
                </div>
              </div>
            </div>
            <div className="login-button margin-top-l">
              <button className="btn btn-primary btn-large background-mw-red OSFillParent" type="submit">
                Entrar
              </button>
            </div>
            <div className="margin-top-base" style={{ textAlign: 'center' }}>
              <span className="text-neutral-0">Ou</span>
            </div>
            <div className="margin-top-base" style={{ textAlign: 'center' }}>
              {/* Botão Google Sign-In (iframe não suportado nativamente em React, placeholder abaixo) */}
              <div style={{ display: 'inline-block', width: 360, height: 44, background: '#fff', border: '1px solid #dadce0', borderRadius: 4, lineHeight: '44px', textAlign: 'center', color: '#3c4043' }}>
                Iniciar sessão com o Google
              </div>
            </div>
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
