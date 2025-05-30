import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  Tabs,
  Tab,
  Paper,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PhishingIcon from '@mui/icons-material/Phishing';

/**
 * Security Demonstration Component
 * Shows how authentication vulnerabilities work and how to mitigate them
 */
function SecurityDemonstration() {
  const [activeTab, setActiveTab] = useState(0);
  const [showVulnerability, setShowVulnerability] = useState(false);
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [capturedData, setCapturedData] = useState({
    credentials: null,
    mfaToken: null,
    sessionToken: null
  });
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setShowVulnerability(false);
    setSimulationStarted(false);
    setCapturedData({
      credentials: null,
      mfaToken: null,
      sessionToken: null
    });
  };
  
  // Simulate credential theft
  const simulateCredentialTheft = () => {
    setSimulationStarted(true);
    
    // Simulate typing in credentials
    setTimeout(() => {
      setCapturedData({
        ...capturedData,
        credentials: {
          email: 'usuario@exemplo.com',
          password: '********',
          timestamp: new Date().toISOString()
        }
      });
      setShowVulnerability(true);
    }, 1500);
  };
  
  // Simulate MFA bypass
  const simulateMFABypass = () => {
    setSimulationStarted(true);
    
    // Simulate MFA code entry
    setTimeout(() => {
      setCapturedData({
        ...capturedData,
        mfaToken: {
          token: '123456',
          userId: 'usuario@exemplo.com',
          timestamp: new Date().toISOString()
        }
      });
      setShowVulnerability(true);
    }, 1500);
  };
  
  // Simulate session hijacking
  const simulateSessionHijacking = () => {
    setSimulationStarted(true);
    
    // Simulate session establishment
    setTimeout(() => {
      setCapturedData({
        ...capturedData,
        sessionToken: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          issuedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 3600000).toISOString()
        }
      });
      setShowVulnerability(true);
    }, 1500);
  };
  
  // Render credential theft demo
  const renderCredentialTheftDemo = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Demonstração de Intercepção de Credenciais
      </Typography>
      
      <Alert severity="warning" sx={{ mb: 3 }}>
        Esta demonstração simula como credenciais podem ser capturadas durante o processo de login.
      </Alert>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: '#f5f5f5' }}>
        <Typography variant="subtitle1" gutterBottom>
          Formulário de Login (Simulado)
        </Typography>
        
        <Box sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1, bgcolor: 'white' }}>
          <Typography>Email: {simulationStarted ? 'usuario@exemplo.com' : '_________'}</Typography>
          <Typography>Senha: {simulationStarted ? '********' : '_________'}</Typography>
        </Box>
        
        {!simulationStarted && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={simulateCredentialTheft}
          >
            Simular Login
          </Button>
        )}
        
        {simulationStarted && !showVulnerability && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 2 }}>Processando login...</Typography>
            <div className="loading-spinner"></div>
          </Box>
        )}
      </Paper>
      
      {showVulnerability && (
        <>
          <Box sx={{ mb: 3, p: 2, border: '1px solid #f44336', borderRadius: 1, bgcolor: '#ffebee' }}>
            <Typography variant="subtitle1" color="error" gutterBottom>
              <WarningIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Interceptação Maliciosa Detectada
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2 }}>
              Um código malicioso capturou as seguintes informações:
            </Typography>
            
            <Box sx={{ p: 2, bgcolor: '#000', color: '#0f0', fontFamily: 'monospace', borderRadius: 1, overflowX: 'auto' }}>
              <pre>{JSON.stringify(capturedData.credentials, null, 2)}</pre>
            </Box>
          </Box>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Código Vulnerável</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ p: 2, bgcolor: '#f5f5f5', fontFamily: 'monospace', borderRadius: 1, overflowX: 'auto' }}>
                <pre>{`// Código vulnerável que permite acesso direto a credenciais
document.querySelector('#loginForm').addEventListener('submit', (e) => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  
  // Armazenamento inseguro de credenciais
  localStorage.setItem('rememberedEmail', email);
  sessionStorage.setItem('authData', JSON.stringify({ email, password }));
});`}</pre>
              </Box>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Medidas de Mitigação</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <ListItemIcon><SecurityIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Implementar HTTPS com HSTS" 
                    secondary="Garante que todas as comunicações sejam encriptadas" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><SecurityIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Utilizar Content Security Policy (CSP)" 
                    secondary="Previne a execução de scripts maliciosos" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><SecurityIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Evitar armazenamento de credenciais no cliente" 
                    secondary="Nunca armazenar senhas em localStorage ou sessionStorage" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><SecurityIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Utilizar tokens de autenticação seguros" 
                    secondary="Implementar OAuth 2.0 e OpenID Connect adequadamente" 
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </Box>
  );
  
  // Render MFA bypass demo
  const renderMFABypassDemo = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Demonstração de Bypass de MFA
      </Typography>
      
      <Alert severity="warning" sx={{ mb: 3 }}>
        Esta demonstração simula como tokens MFA podem ser interceptados e utilizados em ataques.
      </Alert>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: '#f5f5f5' }}>
        <Typography variant="subtitle1" gutterBottom>
          Verificação MFA (Simulada)
        </Typography>
        
        <Box sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1, bgcolor: 'white' }}>
          <Typography>Código de verificação: {simulationStarted ? '123456' : '_ _ _ _ _ _'}</Typography>
        </Box>
        
        {!simulationStarted && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={simulateMFABypass}
          >
            Simular Verificação MFA
          </Button>
        )}
        
        {simulationStarted && !showVulnerability && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 2 }}>Verificando código...</Typography>
            <div className="loading-spinner"></div>
          </Box>
        )}
      </Paper>
      
      {showVulnerability && (
        <>
          <Box sx={{ mb: 3, p: 2, border: '1px solid #f44336', borderRadius: 1, bgcolor: '#ffebee' }}>
            <Typography variant="subtitle1" color="error" gutterBottom>
              <WarningIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Intercepção de Token MFA Detectada
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2 }}>
              Um código malicioso capturou o seguinte token MFA:
            </Typography>
            
            <Box sx={{ p: 2, bgcolor: '#000', color: '#0f0', fontFamily: 'monospace', borderRadius: 1, overflowX: 'auto' }}>
              <pre>{JSON.stringify(capturedData.mfaToken, null, 2)}</pre>
            </Box>
          </Box>
          
          <Typography variant="subtitle1" sx={{ mb: 2, mt: 3 }}>
            Ataque de Phishing em Tempo Real
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: '100%', bgcolor: '#fff8e1' }}>
                <Typography variant="subtitle2" gutterBottom>Utilizador</Typography>
                <Box component="ol" sx={{ pl: 2 }}>
                  <li>Acessa site de phishing que se parece com o legítimo</li>
                  <li>Insere credenciais de login</li>
                  <li>Recebe solicitação de código MFA</li>
                  <li>Insere código MFA no site malicioso</li>
                  <li>Recebe mensagem de erro ou redirecionamento</li>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: '100%', bgcolor: '#ffebee' }}>
                <Typography variant="subtitle2" color="error" gutterBottom>Atacante</Typography>
                <Box component="ol" sx={{ pl: 2 }}>
                  <li>Cria site que imita o legítimo</li>
                  <li>Captura credenciais inseridas</li>
                  <li>Utiliza credenciais no site legítimo, que solicita MFA</li>
                  <li>Recebe código MFA do utilizador e o utiliza imediatamente</li>
                  <li>Obtém acesso à conta antes do token expirar</li>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Código Vulnerável</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ p: 2, bgcolor: '#f5f5f5', fontFamily: 'monospace', borderRadius: 1, overflowX: 'auto' }}>
                <pre>{`// Código vulnerável que manipula tokens MFA em JavaScript do lado do cliente
function verifyMFA() {
  const mfaToken = document.querySelector('#mfaTokenInput').value;
  
  // Transmissão de token sem proteções adequadas
  fetch('/api/verify-mfa', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: mfaToken })
  });
}`}</pre>
              </Box>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Medidas de Mitigação</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <ListItemIcon><SecurityIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Implementar WebAuthn/FIDO2" 
                    secondary="Autenticação resistente a phishing usando chaves de segurança" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><SecurityIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Vincular verificação ao contexto" 
                    secondary="Verificar IP, dispositivo e outros fatores entre passos de autenticação" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><SecurityIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Implementar limitação de tentativas" 
                    secondary="Atrasos progressivos e bloqueio após múltiplas falhas" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><SecurityIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Educação de utilizadores" 
                    secondary="Treinamento para reconhecer tentativas de phishing" 
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </Box>
  );
  
  // Render session hijacking demo
  const renderSessionHijackingDemo = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Demonstração de Sequestro de Sessão
      </Typography>
      
      <Alert severity="warning" sx={{ mb: 3 }}>
        Esta demonstração simula como tokens de sessão podem ser comprometidos após autenticação.
      </Alert>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: '#f5f5f5' }}>
        <Typography variant="subtitle1" gutterBottom>
          Autenticação Completa (Simulada)
        </Typography>
        
        <Box sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1, bgcolor: 'white' }}>
          <Typography gutterBottom>Status: {simulationStarted ? 'Autenticado' : 'Não autenticado'}</Typography>
          {simulationStarted && (
            <Typography variant="caption" component="div" sx={{ wordBreak: 'break-all' }}>
              Token: {showVulnerability ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' : '[Armazenado Seguramente]'}
            </Typography>
          )}
        </Box>
        
        {!simulationStarted && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={simulateSessionHijacking}
          >
            Simular Autenticação Completa
          </Button>
        )}
        
        {simulationStarted && !showVulnerability && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 2 }}>Estabelecendo sessão...</Typography>
            <div className="loading-spinner"></div>
          </Box>
        )}
      </Paper>
      
      {showVulnerability && (
        <>
          <Box sx={{ mb: 3, p: 2, border: '1px solid #f44336', borderRadius: 1, bgcolor: '#ffebee' }}>
            <Typography variant="subtitle1" color="error" gutterBottom>
              <WarningIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Sequestro de Sessão Detectado
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2 }}>
              Um código malicioso capturou o seguinte token de sessão:
            </Typography>
            
            <Box sx={{ p: 2, bgcolor: '#000', color: '#0f0', fontFamily: 'monospace', borderRadius: 1, overflowX: 'auto' }}>
              <pre>{JSON.stringify(capturedData.sessionToken, null, 2)}</pre>
            </Box>
          </Box>
          
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            O que um atacante pode fazer com um token de sessão?
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Chip 
              icon={<LockOpenIcon />} 
              label="Acessar a conta sem credenciais" 
              color="error" 
              sx={{ m: 0.5 }} 
            />
            <Chip 
              icon={<LockOpenIcon />} 
              label="Realizar ações como o utilizador legítimo" 
              color="error" 
              sx={{ m: 0.5 }} 
            />
            <Chip 
              icon={<LockOpenIcon />} 
              label="Extrair dados sensíveis" 
              color="error" 
              sx={{ m: 0.5 }} 
            />
            <Chip 
              icon={<LockOpenIcon />} 
              label="Alterar configurações da conta" 
              color="error" 
              sx={{ m: 0.5 }} 
            />
          </Box>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Código Vulnerável</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ p: 2, bgcolor: '#f5f5f5', fontFamily: 'monospace', borderRadius: 1, overflowX: 'auto' }}>
                <pre>{`// Armazenamento inseguro de tokens de sessão
function storeAuthToken(token) {
  // Armazenamento vulnerável a ataques XSS
  localStorage.setItem('authToken', token);
  
  // Cookies sem as flags de segurança adequadas
  document.cookie = \`sessionId=\${token}; path=/;\`;
}`}</pre>
              </Box>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Medidas de Mitigação</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <ListItemIcon><SecurityIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Utilizar cookies com flags de segurança" 
                    secondary="HttpOnly, Secure, SameSite=Strict para cookies de sessão" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><SecurityIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Implementar rotação de tokens" 
                    secondary="Renovar tokens periodicamente e após eventos sensíveis" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><SecurityIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Vincular tokens ao contexto" 
                    secondary="Incluir fingerprint do dispositivo e validar em cada requisição" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><SecurityIcon color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Monitorizar atividade de sessão" 
                    secondary="Detectar e alertar sobre comportamentos anômalos" 
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </Box>
  );
  
  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Demonstração de Segurança
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
        Vulnerabilidades em Processos de Autenticação
      </Typography>
      
      <Alert severity="info" sx={{ mb: 4 }}>
        <AlertTitle>Apenas para fins educacionais</AlertTitle>
        Esta demonstração simula vulnerabilidades de segurança para fins educativos e de auditoria.
        Nunca implemente código semelhante em ambientes de produção.
      </Alert>
      
      <Paper sx={{ mb: 4 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<VpnKeyIcon />} label="Credenciais" />
          <Tab icon={<PhishingIcon />} label="Bypass MFA" />
          <Tab icon={<LockOpenIcon />} label="Sequestro de Sessão" />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && renderCredentialTheftDemo()}
          {activeTab === 1 && renderMFABypassDemo()}
          {activeTab === 2 && renderSessionHijackingDemo()}
        </Box>
      </Paper>
      
      <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 4 }}>
        Consulte a documentação completa em /src/security/documentation/ para mais informações
        sobre vulnerabilidades de autenticação e medidas de mitigação.
      </Typography>
    </Box>
  );
}

export default SecurityDemonstration;
