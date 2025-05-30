# Boas Práticas de Segurança para Autenticação

Este documento apresenta boas práticas de segurança para implementação de sistemas de autenticação seguros, com foco especial na proteção contra as vulnerabilidades demonstradas neste projeto.

## Sumário

1. [Proteção de Credenciais](#1-proteção-de-credenciais)
2. [Implementação Segura de MFA](#2-implementação-segura-de-mfa)
3. [Gestão Segura de Sessões](#3-gestão-segura-de-sessões)
4. [Segurança de Cookies](#4-segurança-de-cookies)
5. [Proteção Contra Ataques Comuns](#5-proteção-contra-ataques-comuns)
6. [Monitorização e Detecção](#6-monitorização-e-detecção)
7. [Referências e Recursos](#7-referências-e-recursos)

## 1. Proteção de Credenciais

### Transmissão Segura

- **Utilize HTTPS em todo o site**
  - Implemente HTTPS em todo o site, não apenas nas páginas de login
  - Configure HSTS (HTTP Strict Transport Security) para prevenir ataques de downgrade
  - Garanta que todos os recursos (imagens, scripts, etc.) são carregados via HTTPS

- **Evite transmitir credenciais em URLs**
  - Nunca inclua senhas ou tokens em URLs (aparecem em logs, histórico, referrers)
  - Utilize sempre métodos POST para transmissão de credenciais
  - Não armazene credenciais em query parameters

### Armazenamento Seguro

- **Nunca armazene senhas em texto claro**
  - Utilize algoritmos de hash fortes como Argon2, bcrypt ou PBKDF2
  - Adicione um salt único para cada utilizador para prevenir ataques de tabela arco-íris
  - Configure os parâmetros de custo dos algoritmos para o máximo que seja prático

- **Evite o armazenamento no lado do cliente**
  - Nunca armazene senhas em localStorage, sessionStorage ou cookies
  - Evite a funcionalidade "Lembrar-me" que armazena credenciais
  - Se necessário armazenar estado de autenticação, utilize tokens de sessão de curta duração

### Política de Senhas

- **Implemente requisitos de senha fortes**
  - Exija senhas com pelo menos 12 caracteres
  - Incentive o uso de frases-chave em vez de senhas complexas
  - Verifique senhas contra listas de senhas comprometidas

- **Gestão de Reset de Senha**
  - Utilize tokens de reset de senha de uso único e com expiração curta
  - Envie links de reset para endereços de email verificados
  - Notifique utilizadores quando ocorrer uma mudança de senha

## 2. Implementação Segura de MFA

### Tipos de MFA

- **Autenticadores baseados em TOTP**
  - Implemente de acordo com RFC 6238 (TOTP)
  - Utilize bibliotecas maduras e testadas (não implemente seu próprio algoritmo)
  - Forneça códigos de backup para recuperação de conta

- **Autenticação baseada em WebAuthn/FIDO2**
  - Implemente suporte para chaves de segurança físicas quando possível
  - Suporte biometria integrada para maior conveniência do utilizador
  - Armazene apenas chaves públicas no servidor

- **Verificação por SMS**
  - Considere SMS apenas como última opção (vulnerável a SIM swapping)
  - Não utilize SMS para contas de alto valor ou risco
  - Implementar detecção de SIM swapping quando possível

### Validação Segura

- **Validação apenas no servidor**
  - Nunca realize validação de tokens MFA no lado do cliente
  - Implemente verificações de tempo para tokens TOTP
  - Armazene seguramente os segredos TOTP no servidor

- **Proteção contra Bruteforce**
  - Implemente limitação de tentativas (rate limiting)
  - Adicione atrasos crescentes após tentativas falhadas
  - Bloqueie temporariamente a conta após múltiplas falhas

## 3. Gestão Segura de Sessões

### Tokens de Sessão

- **Geração segura de tokens**
  - Utilize geradores de números aleatórios criptograficamente seguros
  - Garanta alta entropia (pelo menos 128 bits)
  - Evite tokens previsíveis ou sequenciais

- **Ciclo de vida do token**
  - Implemente expiração de curta duração (15-60 minutos)
  - Utilize tokens de refresh para melhorar a experiência do utilizador
  - Revogue tokens ativamente em logout

- **Invalidação de Sessão**
  - Permita que utilizadores visualizem e terminem sessões ativas
  - Implemente logout em todos os dispositivos
  - Force reautenticação para ações sensíveis

### Monitorização

- **Registo de atividades**
  - Registe logins, alteração de dados e outras atividades sensíveis
  - Armazene metadados como IP, user-agent, timestamp
  - Alerte sobre comportamentos anómalos (login de localização incomum)

- **Verificação de integridade**
  - Valide a autenticidade dos tokens em cada requisição
  - Implemente verificação de fingerprint do dispositivo
  - Monitorize tentativas de reuso de tokens revogados

## 4. Segurança de Cookies

### Flags de Segurança

- **HttpOnly**
  - Impede acesso ao cookie via JavaScript
  - Protege contra roubo de cookies em ataques XSS
  - Aplique a todos os cookies de autenticação e sessão

- **Secure**
  - Garante que cookies são enviados apenas em conexões HTTPS
  - Previne interceptação de cookies em redes não seguras
  - Deve ser sempre usado em conjunto com HTTPS

- **SameSite**
  - Configure como "Strict" para cookies de autenticação
  - Use "Lax" apenas quando necessário para funcionalidade
  - Protege contra ataques CSRF

### Outras Boas Práticas

- **Atributo Path**
  - Restrinja o escopo dos cookies apenas às rotas necessárias
  - Evite cookies acessíveis em todo o domínio (path=/)
  - Separe cookies por áreas funcionais da aplicação

- **Tempo de Expiração**
  - Configure tempos de expiração curtos para cookies de sessão
  - Implemente renovação automática para utilizadores ativos
  - Force reautenticação após longos períodos de inatividade

## 5. Proteção Contra Ataques Comuns

### Cross-Site Scripting (XSS)

- **Sanitização de Input**
  - Sanitize todos os inputs do utilizador antes de renderizar
  - Utilize escape adequado de acordo com o contexto (HTML, JS, CSS)
  - Prefira bibliotecas e frameworks que oferecem proteção XSS por padrão

- **Content Security Policy (CSP)**
  - Implemente uma política CSP restritiva
  - Desative 'unsafe-inline' e 'unsafe-eval' quando possível
  - Limite origens para scripts, imagens e outros recursos

### Cross-Site Request Forgery (CSRF)

- **Tokens CSRF**
  - Implemente tokens CSRF para todas as operações de mudança de estado
  - Renove tokens periodicamente
  - Valide token e origem da requisição

- **Verificação de Origem**
  - Verifique os cabeçalhos Origin e Referer
  - Rejeite requisições de origens não autorizadas
  - Implemente uma lista de permissões de domínios confiáveis

### Man-in-the-Middle (MITM)

- **Certificate Pinning**
  - Considere certificate pinning para APIs críticas
  - Implemente HPKP (HTTP Public Key Pinning) com cuidado
  - Verifique integridade de certificados em comunicações sensíveis

- **Transparência de Certificados**
  - Monitore Certificate Transparency logs
  - Detecte emissões não autorizadas de certificados
  - Implemente Expected-CT header

## 6. Monitorização e Detecção

### Eventos de Segurança

- **Alertas em tempo real**
  - Configure alertas para comportamentos suspeitos
  - Monitore padrões anómalos (múltiplos logins falhos, acesso de novas localizações)
  - Notifique utilizadores sobre atividades sensíveis

- **Logs de Segurança**
  - Mantenha logs detalhados de todas as atividades de autenticação
  - Armazene logs de forma segura e imutável
  - Implemente retenção adequada para análise forense

### Resposta a Incidentes

- **Plano de Resposta**
  - Desenvolva um plano de resposta a incidentes de segurança
  - Defina procedimentos para compromisso de credenciais
  - Pratique regularmente cenários de resposta

- **Recuperação de Conta**
  - Implemente métodos seguros para recuperação de conta
  - Forneça suporte para utilizadores afetados
  - Documente todas as ações tomadas durante incidentes

## 7. Referências e Recursos

### Normas e Boas Práticas

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [NIST Digital Identity Guidelines (SP 800-63B)](https://pages.nist.gov/800-63-3/sp800-63b.html)
- [CWE-287: Improper Authentication](https://cwe.mitre.org/data/definitions/287.html)

### Ferramentas

- [OWASP ZAP (Zed Attack Proxy)](https://www.zaproxy.org/)
- [Burp Suite](https://portswigger.net/burp)
- [OWASP Dependency Check](https://owasp.org/www-project-dependency-check/)

### Formação e Aprendizagem

- [OWASP WebGoat](https://owasp.org/www-project-webgoat/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [SANS SEC642: Advanced Web App Penetration Testing](https://www.sans.org/cyber-security-courses/advanced-web-app-penetration-testing-ethical-hacking/)

---

Este documento deve ser revisado e atualizado regularmente para incorporar novas ameaças e melhores práticas de segurança. A segurança é um processo contínuo, não um estado final.
