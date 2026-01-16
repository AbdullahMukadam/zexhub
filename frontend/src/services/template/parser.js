// Parse template config and validate structure
export const parseTemplateConfig = (config) => {
  // Validate required fields
  if (!config.formConfig || !config.formConfig.steps) {
    throw new Error('Invalid template config: missing formConfig.steps');
  }

  return {
    ...config,
    formConfig: {
      ...config.formConfig,
      steps: config.formConfig.steps.map((step, index) => ({
        id: step.id || index + 1,
        title: step.title || `Step ${index + 1}`,
        fields: step.fields || []
      }))
    }
  };
};

// Generate form validation schema from template config
export const generateValidationSchema = (formConfig) => {
  const schema = {};
  
  formConfig.steps.forEach(step => {
    step.fields.forEach(field => {
      schema[field.name] = {
        required: field.required || false,
        type: field.type || 'text',
        validation: field.validation || {}
      };
    });
  });
  
  return schema;
};

// Extract all field names from config
export const extractFieldNames = (formConfig) => {
  const fields = [];
  
  formConfig.steps.forEach(step => {
    step.fields.forEach(field => {
      fields.push(field.name);
    });
  });
  
  return fields;
};

// Validate form data against schema
export const validateFormData = (formData, schema) => {
  const errors = {};
  
  Object.keys(schema).forEach(fieldName => {
    const fieldSchema = schema[fieldName];
    const value = formData[fieldName];
    
    // Check required
    if (fieldSchema.required && (!value || value.trim() === '')) {
      errors[fieldName] = 'This field is required';
      return;
    }
    
    // Check type-specific validation
    if (value) {
      switch (fieldSchema.type) {
        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errors[fieldName] = 'Invalid email address';
          }
          break;
        case 'url':
          try {
            new URL(value);
          } catch {
            errors[fieldName] = 'Invalid URL';
          }
          break;
        case 'number':
          if (isNaN(value)) {
            errors[fieldName] = 'Must be a number';
          }
          break;
      }
      
      // Check custom validation
      if (fieldSchema.validation) {
        if (fieldSchema.validation.minLength && value.length < fieldSchema.validation.minLength) {
          errors[fieldName] = `Minimum ${fieldSchema.validation.minLength} characters required`;
        }
        if (fieldSchema.validation.maxLength && value.length > fieldSchema.validation.maxLength) {
          errors[fieldName] = `Maximum ${fieldSchema.validation.maxLength} characters allowed`;
        }
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
