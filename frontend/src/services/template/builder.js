// Build and prepare HTML template for deployment/download
export const buildTemplate = async (templateFiles, userData) => {
  // HTML templates are ready to use, just apply data
  // No build process needed for static HTML
  return templateFiles;
};

// Generate README for the template
export const generateReadme = (templateConfig, userData) => {
  const { name } = templateConfig;
  
  return `# ${userData.name || 'My Website'}

${userData.bio || 'Website built with ZexHub'}

Built with [ZexHub](https://github.com/AbdullahMuakdam/Portfolio-Website-Builder)

Template: ${name}

## Usage

Simply open \`index.html\` in your browser or deploy to any static hosting service.

## Deploy to Free Hosting

### Vercel
1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop this folder
3. Your site is live!

### GitHub Pages
1. Push to GitHub
2. Go to repository Settings > Pages
3. Select branch and folder
4. Your site is live at \`username.github.io/repo-name\`

## Customization

You can customize this template by editing the HTML, CSS, and JavaScript files directly.

## License

MIT
`;
};
