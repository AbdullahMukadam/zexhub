/**
 * Template utility functions for processing template configurations
 */

/**
 * Extracts default values from template configuration
 * Iterates through all form steps and fields to build an object of default values
 * 
 * @param {Object} templateConfig - The template configuration object
 * @returns {Object} Object containing field names as keys and default values
 */
export const extractDefaultValues = (templateConfig) => {
  if (!templateConfig || !templateConfig.formConfig || !templateConfig.formConfig.steps) {
    return {};
  }

  const defaults = {};

  // Iterate through all steps
  templateConfig.formConfig.steps.forEach(step => {
    if (!step.fields || !Array.isArray(step.fields)) {
      return;
    }

    // Iterate through all fields in the step
    step.fields.forEach(field => {
      // If field has a default value, add it to defaults object
      if (field.name && field.default !== undefined && field.default !== null) {
        defaults[field.name] = field.default;
      }
    });
  });

  return defaults;
};

/**
 * Merges user data with default values from template config
 * User data takes priority over defaults
 * 
 * @param {Object} userData - User's form data
 * @param {Object} templateConfig - The template configuration object
 * @returns {Object} Merged object with defaults + user data
 */
export const mergeWithDefaults = (userData = {}, templateConfig) => {
  const defaults = extractDefaultValues(templateConfig);
  
  // Merge: defaults first, then user data (user data overrides defaults)
  return {
    ...defaults,
    ...userData
  };
};

/**
 * Gets all field names from template configuration
 * Useful for validation and form processing
 * 
 * @param {Object} templateConfig - The template configuration object
 * @returns {Array} Array of field names
 */
export const getAllFieldNames = (templateConfig) => {
  if (!templateConfig || !templateConfig.formConfig || !templateConfig.formConfig.steps) {
    return [];
  }

  const fieldNames = [];

  templateConfig.formConfig.steps.forEach(step => {
    if (!step.fields || !Array.isArray(step.fields)) {
      return;
    }

    step.fields.forEach(field => {
      if (field.name) {
        fieldNames.push(field.name);
      }
    });
  });

  return fieldNames;
};

/**
 * Gets field configuration by field name
 * 
 * @param {Object} templateConfig - The template configuration object
 * @param {string} fieldName - Name of the field to find
 * @returns {Object|null} Field configuration or null if not found
 */
export const getFieldConfig = (templateConfig, fieldName) => {
  if (!templateConfig || !templateConfig.formConfig || !templateConfig.formConfig.steps) {
    return null;
  }

  for (const step of templateConfig.formConfig.steps) {
    if (!step.fields || !Array.isArray(step.fields)) {
      continue;
    }

    const field = step.fields.find(f => f.name === fieldName);
    if (field) {
      return field;
    }
  }

  return null;
};

/**
 * Checks if a field has been modified from its default value
 * 
 * @param {string} fieldName - Name of the field
 * @param {*} currentValue - Current value of the field
 * @param {Object} templateConfig - The template configuration object
 * @returns {boolean} True if value differs from default
 */
export const isFieldModified = (fieldName, currentValue, templateConfig) => {
  const defaults = extractDefaultValues(templateConfig);
  const defaultValue = defaults[fieldName];
  
  // If no default exists, any value is considered modified
  if (defaultValue === undefined) {
    return currentValue !== undefined && currentValue !== '';
  }
  
  return currentValue !== defaultValue;
};

export default {
  extractDefaultValues,
  mergeWithDefaults,
  getAllFieldNames,
  getFieldConfig,
  isFieldModified
};
