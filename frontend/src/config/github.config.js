

export const GITHUB_CONFIG = {
  tokenUrl: import.meta.env.VITE_BACKEND_GITHUB_URL,
  apiUrl: 'https://api.github.com'
};


export const APP_CONFIG = {
  appName: 'ZexHub',
  version: '2.0.0',
  maxTemplatesPerUser: 50,
  maxFileSize: 50 * 1024 * 1024, // 50MB
  supportedTemplateTypes: ['html']
};
