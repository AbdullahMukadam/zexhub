// Form validation utilities

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

export const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return !value || value.length <= maxLength;
};

export const validatePattern = (value, pattern) => {
  const regex = new RegExp(pattern);
  return regex.test(value);
};

export const validateNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

export const validateInteger = (value) => {
  return Number.isInteger(Number(value));
};

export const validateRange = (value, min, max) => {
  const num = Number(value);
  return num >= min && num <= max;
};

// Validate field based on configuration
export const validateField = (value, fieldConfig) => {
  const errors = [];
  
  // Required validation
  if (fieldConfig.required && !validateRequired(value)) {
    errors.push(`${fieldConfig.label} is required`);
    return errors;
  }
  
  // Skip other validations if empty and not required
  if (!value && !fieldConfig.required) {
    return errors;
  }
  
  // Type-specific validation
  switch (fieldConfig.type) {
    case 'email':
      if (!validateEmail(value)) {
        errors.push('Invalid email address');
      }
      break;
    case 'url':
      if (!validateUrl(value)) {
        errors.push('Invalid URL');
      }
      break;
    case 'number':
      if (!validateNumber(value)) {
        errors.push('Must be a valid number');
      }
      break;
  }
  
  // Custom validation rules
  if (fieldConfig.validation) {
    const { minLength, maxLength, pattern, min, max } = fieldConfig.validation;
    
    if (minLength && !validateMinLength(value, minLength)) {
      errors.push(`Minimum ${minLength} characters required`);
    }
    
    if (maxLength && !validateMaxLength(value, maxLength)) {
      errors.push(`Maximum ${maxLength} characters allowed`);
    }
    
    if (pattern && !validatePattern(value, pattern)) {
      errors.push(fieldConfig.validation.patternMessage || 'Invalid format');
    }
    
    if (fieldConfig.type === 'number') {
      if (min !== undefined && Number(value) < min) {
        errors.push(`Minimum value is ${min}`);
      }
      if (max !== undefined && Number(value) > max) {
        errors.push(`Maximum value is ${max}`);
      }
    }
  }
  
  return errors;
};

// Validate entire form
export const validateForm = (formData, formConfig) => {
  const errors = {};
  let isValid = true;
  
  formConfig.steps.forEach(step => {
    step.fields.forEach(field => {
      const fieldErrors = validateField(formData[field.name], field);
      if (fieldErrors.length > 0) {
        errors[field.name] = fieldErrors[0]; // Show first error
        isValid = false;
      }
    });
  });
  
  return { isValid, errors };
};
