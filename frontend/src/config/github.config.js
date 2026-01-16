

export const GITHUB_CONFIG = {
  clientId: import.meta.env.VITE_GITHUB_CLIENT_ID || '',
  redirectUri: import.meta.env.VITE_GITHUB_REDIRECT_URI || 'http://localhost:5173/auth/callback',
  scope: 'repo user',
  authUrl: 'https://github.com/login/oauth/authorize',
  tokenUrl: import.meta.env.VITE_BACKEND_GITHUB_URL,
  apiUrl: 'https://api.github.com'
};

export const APP_CONFIG = {
  appName: 'Zix',
  version: '2.0.0',
  maxTemplatesPerUser: 50,
  maxFileSize: 50 * 1024 * 1024, // 50MB
  supportedTemplateTypes: ['html']
};
