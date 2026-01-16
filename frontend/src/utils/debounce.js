/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * 
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} - The debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Creates a debounced function with leading edge execution option
 * 
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @param {boolean} immediate - If true, trigger on leading edge instead of trailing
 * @returns {Function} - The debounced function
 */
export const debounceWithImmediate = (func, wait = 300, immediate = false) => {
  let timeout;
  
  return function executedFunction(...args) {
    const callNow = immediate && !timeout;
    
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
};

export default debounce;
