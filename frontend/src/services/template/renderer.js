// Apply user data to HTML template files
export const renderTemplate = (htmlContent, userData) => {
  let rendered = htmlContent;
  
  // Replace placeholders like {{name}}, {{email}}, etc.
  Object.keys(userData).forEach(key => {
    const value = userData[key] || '';
    
    // Handle array values (convert to comma-separated string or list)
    const displayValue = Array.isArray(value) ? value.join(', ') : value;
    
    // Replace {{key}} format
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    rendered = rendered.replace(regex, displayValue);
    
    // Also support {{user.key}} format
    const userRegex = new RegExp(`{{\\s*user\\.${key}\\s*}}`, 'g');
    rendered = rendered.replace(userRegex, displayValue);
  });
  
  return rendered;
};

// Process all template files with user data
export const processTemplateFiles = (files, userData) => {
  return files.map(file => {
    let content = file.content;
    
    // Check file extension
    const ext = file.path.split('.').pop().toLowerCase();
    const processableExtensions = ['html', 'htm', 'css', 'scss', 'js', 'jsx', 'ts', 'tsx', 'json', 'md'];
    
    // For supported files, replace placeholders
    if (processableExtensions.includes(ext)) {
      content = renderTemplate(content, userData);
    }
    
    return {
      ...file,
      content
    };
  });
};
