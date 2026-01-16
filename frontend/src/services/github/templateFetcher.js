import githubAPI from './api';

export const parseRepoUrl = (repoUrl) => {
  // Parse GitHub URL to extract owner and repo name
  // Example: https://github.com/owner/repo -> ['owner', 'repo']
  const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) throw new Error('Invalid GitHub repository URL');
  return [match[1], match[2]];
};

export const fetchTemplateConfig = async (repoUrl, branch = 'main', folder = null) => {
  try {
    const [owner, repo] = parseRepoUrl(repoUrl);
    // Build the config path: if folder exists, use "folder/template.config.json", else "template.config.json"
    const configPath = folder ? `${folder}/template.config.json` : 'template.config.json';
    
    const configContent = await githubAPI.getFileContent(
      owner,
      repo,
      configPath,
      branch
    );
    return JSON.parse(configContent);
  } catch (error) {
    console.warn('Template config not found, using defaults:', error);
    // Return default config if template.config.json doesn't exist
    return {
      formConfig: {
        steps: [
          {
            id: 1,
            title: 'Basic Information',
            fields: [
              { name: 'name', label: 'Name', type: 'text', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true }
            ]
          }
        ]
      },
      dataMapping: {
        outputPath: 'data.json',
        format: 'json'
      }
    };
  }
};

export const fetchTemplateFiles = async (repoUrl, branch = 'main', folder = null) => {
  try {
    const [owner, repo] = parseRepoUrl(repoUrl);
    const tree = await githubAPI.getRepoTree(owner, repo, branch);
    
    // Filter files based on folder if provided
    let filteredFiles = tree.filter(item => {
      // If folder is specified, only include files within that folder
      if (folder && !item.path.startsWith(`${folder}/`)) {
        return false;
      }
      
      return item.type === 'blob' && 
             !item.path.startsWith('.git') &&
             !item.path.includes('node_modules') &&
             !item.path.includes('.next') &&
             !item.path.includes('dist') &&
             !item.path.includes('build');
    });

    return filteredFiles;
  } catch (error) {
    console.error('Error fetching template files:', error);
    throw error;
  }
};

export const fetchTemplateFileContent = async (repoUrl, filePath, branch = 'main') => {
  try {
    const [owner, repo] = parseRepoUrl(repoUrl);
    return await githubAPI.getFileContent(owner, repo, filePath, branch);
  } catch (error) {
    console.error('Error fetching file content:', error);
    throw error;
  }
};

export const fetchAllTemplateContent = async (repoUrl, branch = 'main', folder = null) => {
  try {
    const files = await fetchTemplateFiles(repoUrl, branch, folder);
    const [owner, repo] = parseRepoUrl(repoUrl);
    
    const fileContents = await Promise.all(
      files.map(async (file) => {
        try {
          const content = await githubAPI.getFileContent(owner, repo, file.path, branch);
          
          // If folder is specified, strip the folder prefix from the path for cleaner structure
          const displayPath = folder && file.path.startsWith(`${folder}/`) 
            ? file.path.substring(folder.length + 1) 
            : file.path;
          
          return {
            path: displayPath,
            originalPath: file.path, // Keep original path for reference
            content,
            size: file.size
          };
        } catch (error) {
          console.warn(`Could not fetch ${file.path}:`, error);
          return null;
        }
      })
    );

    return fileContents.filter(file => file !== null);
  } catch (error) {
    console.error('Error fetching all template content:', error);
    throw error;
  }
};
