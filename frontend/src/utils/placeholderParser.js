/**
 * Placeholder parser for JSX and HTML templates
 * Handles {{placeholder}} syntax in both string literals and JSX
 */

/**
 * Replace placeholders in content with user data
 * @param {string} content - File content with placeholders
 * @param {Object} userData - User data to replace placeholders
 * @param {string} fileType - Type of file (jsx, js, html, css, etc.)
 * @returns {string} Content with placeholders replaced
 */
export const replacePlaceholders = (content, userData, fileType = 'html') => {
  if (!content || !userData) return content;

  let result = content;

  Object.entries(userData).forEach(([key, value]) => {
    // Create regex for {{key}} with optional whitespace
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    
    // Handle different data types
    let replacementValue;
    
    if (value === undefined || value === null) {
      // Handle undefined/null values
      if (fileType === 'jsx' || fileType === 'tsx' || fileType === 'js' || fileType === 'ts') {
        replacementValue = 'null';
      } else {
        replacementValue = '';
      }
    } else if (Array.isArray(value)) {
      // For JSX files, convert arrays to JSON string
      if (fileType === 'jsx' || fileType === 'tsx' || fileType === 'js' || fileType === 'ts') {
        // Properly stringify array - this will be valid JavaScript
        replacementValue = JSON.stringify(value);
      } else {
        // For HTML/CSS, join array items
        replacementValue = value.join(', ');
      }
    } else if (typeof value === 'object') {
      // For objects, stringify them
      replacementValue = JSON.stringify(value);
    } else {
      // For primitives, just convert to string
      replacementValue = String(value);
    }

    // Replace all occurrences
    result = result.replace(regex, replacementValue);
  });

  return result;
};

/**
 * Extract placeholders from content
 * @param {string} content - File content
 * @returns {Array<string>} Array of unique placeholder names
 */
export const extractPlaceholders = (content) => {
  if (!content) return [];

  const regex = /{{\\s*([a-zA-Z_][a-zA-Z0-9_]*)\\s*}}/g;
  const placeholders = new Set();
  let match;

  while ((match = regex.exec(content)) !== null) {
    placeholders.add(match[1]);
  }

  return Array.from(placeholders);
};

/**
 * Validate placeholder syntax in content
 * @param {string} content - File content
 * @returns {Object} Validation result with errors
 */
export const validatePlaceholders = (content) => {
  if (!content) return { valid: true, errors: [] };

  const errors = [];
  
  // Check for unmatched opening braces
  const openBraces = (content.match(/{{/g) || []).length;
  const closeBraces = (content.match(/}}/g) || []).length;
  
  if (openBraces !== closeBraces) {
    errors.push({
      type: 'unmatched_braces',
      message: `Unmatched placeholder braces: ${openBraces} opening, ${closeBraces} closing`
    });
  }

  // Check for invalid placeholder names
  const invalidPlaceholders = content.match(/{{\\s*[^a-zA-Z_][^}]*}}/g);
  if (invalidPlaceholders) {
    invalidPlaceholders.forEach(placeholder => {
      errors.push({
        type: 'invalid_name',
        message: `Invalid placeholder name: ${placeholder}`,
        placeholder
      });
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Replace placeholders in multiple files
 * @param {Array<Object>} files - Array of file objects with {path, content}
 * @param {Object} userData - User data for replacement
 * @returns {Array<Object>} Files with replaced content
 */
export const replacePlaceholdersInFiles = (files, userData) => {
  return files.map(file => {
    const fileExtension = file.path.split('.').pop();
    const processedContent = replacePlaceholders(file.content, userData, fileExtension);
    
    return {
      ...file,
      content: processedContent
    };
  });
};

/**
 * Get file type from filename
 * @param {string} filename - File name or path
 * @returns {string} File type
 */
export const getFileType = (filename) => {
  const extension = filename.split('.').pop().toLowerCase();
  return extension;
};

/**
 * Check if file should have placeholder replacement
 * @param {string} filename - File name or path
 * @returns {boolean} True if file should be processed
 */
export const shouldProcessFile = (filename) => {
  const processableExtensions = [
    'jsx', 'js', 'tsx', 'ts',
    'html', 'htm',
    'css', 'scss', 'sass',
    'json',
    'md', 'txt'
  ];
  
  const extension = getFileType(filename);
  return processableExtensions.includes(extension);
};

/**
 * Safe JSON parse for placeholder values
 * @param {string} value - String value to parse
 * @returns {any} Parsed value or original string
 */
export const safeJSONParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
