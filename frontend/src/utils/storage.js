// LocalStorage helpers for caching and persistence

export const storage = {
  // Save data to localStorage
  set: (key, value) => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  // Get data from localStorage
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  // Remove item from localStorage
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  // Clear all localStorage
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

// Cache template data with expiration
export const cacheTemplate = (templateId, data, expirationHours = 24) => {
  const cacheKey = `template_${templateId}`;
  const cacheData = {
    data,
    timestamp: Date.now(),
    expiration: expirationHours * 60 * 60 * 1000
  };
  storage.set(cacheKey, cacheData);
};

export const getCachedTemplate = (templateId) => {
  const cacheKey = `template_${templateId}`;
  const cached = storage.get(cacheKey);
  
  if (!cached) return null;
  
  const now = Date.now();
  const age = now - cached.timestamp;
  
  if (age > cached.expiration) {
    storage.remove(cacheKey);
    return null;
  }
  
  return cached.data;
};

// Save form draft
export const saveDraft = (templateId, formData) => {
  const draftKey = `draft_${templateId}`;
  const draftData = {
    formData,
    timestamp: Date.now()
  };
  storage.set(draftKey, draftData);
};

export const getDraft = (templateId) => {
  const draftKey = `draft_${templateId}`;
  const draft = storage.get(draftKey);
  return draft?.formData || null;
};

export const clearDraft = (templateId) => {
  const draftKey = `draft_${templateId}`;
  storage.remove(draftKey);
};
