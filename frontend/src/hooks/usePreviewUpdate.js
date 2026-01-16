import { useRef, useCallback, useEffect, useState } from 'react';

/**
 * Smart preview update hook with batching and change detection
 * Prevents unnecessary iframe re-renders by:
 * 1. Batching multiple rapid changes
 * 2. Deep equality checking to detect real changes
 * 3. Configurable update strategies (immediate, debounced, manual)
 */
export const usePreviewUpdate = ({ 
  onUpdate, 
  delay = 1000,
  strategy = 'debounced' // 'immediate', 'debounced', 'manual'
}) => {
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const pendingDataRef = useRef(null);
  const lastRenderedDataRef = useRef(null);
  const timeoutRef = useRef(null);
  const updateCountRef = useRef(0);
  const onUpdateRef = useRef(onUpdate);
  const strategyRef = useRef(strategy);
  const delayRef = useRef(delay);

  // Keep refs up to date
  useEffect(() => {
    onUpdateRef.current = onUpdate;
    strategyRef.current = strategy;
    delayRef.current = delay;
  }, [onUpdate, strategy, delay]);

  /**
   * Deep equality check for objects
   */
  const isEqual = useCallback((obj1, obj2) => {
    if (obj1 === obj2) return true;
    if (!obj1 || !obj2) return false;
    
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    if (keys1.length !== keys2.length) return false;
    
    for (let key of keys1) {
      const val1 = obj1[key];
      const val2 = obj2[key];
      
      // Handle arrays
      if (Array.isArray(val1) && Array.isArray(val2)) {
        if (val1.length !== val2.length) return false;
        if (!val1.every((item, index) => item === val2[index])) return false;
        continue;
      }
      
      // Handle objects
      if (typeof val1 === 'object' && typeof val2 === 'object') {
        if (!isEqual(val1, val2)) return false;
        continue;
      }
      
      // Handle primitives
      if (val1 !== val2) return false;
    }
    
    return true;
  }, []);

  /**
   * Execute the actual update
   */
  const executeUpdate = useCallback(() => {
    if (!pendingDataRef.current) {
      setHasPendingChanges(false);
      return;
    }

    // Execute update using the ref to avoid stale closure
    onUpdateRef.current(pendingDataRef.current);
    lastRenderedDataRef.current = { ...pendingDataRef.current };
    pendingDataRef.current = null;
    setHasPendingChanges(false);
    updateCountRef.current += 1;
  }, []); // No dependencies - uses refs

  /**
   * Queue an update with the new data
   */
  const queueUpdate = useCallback((data) => {
    // Check if data actually changed from last rendered version
    if (isEqual(data, lastRenderedDataRef.current)) {
      // No change detected, skip update
      setHasPendingChanges(false);
      return;
    }

    // Store the pending data
    pendingDataRef.current = data;
    setHasPendingChanges(true);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Handle different strategies using refs
    if (strategyRef.current === 'immediate') {
      executeUpdate();
    } else if (strategyRef.current === 'debounced') {
      timeoutRef.current = setTimeout(executeUpdate, delayRef.current);
    }
    // For 'manual' strategy, don't auto-execute
  }, [executeUpdate, isEqual]); // Only depends on executeUpdate and isEqual

  /**
   * Force update immediately (useful for manual strategy or explicit updates)
   */
  const forceUpdate = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    executeUpdate();
  }, [executeUpdate]);

  /**
   * Cancel pending updates
   */
  const cancelUpdate = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    pendingDataRef.current = null;
    setHasPendingChanges(false);
  }, []);

  /**
   * Reset the hook state
   */
  const reset = useCallback(() => {
    cancelUpdate();
    lastRenderedDataRef.current = null;
    updateCountRef.current = 0;
  }, [cancelUpdate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    queueUpdate,
    forceUpdate,
    cancelUpdate,
    reset,
    hasPendingChanges,
    updateCount: updateCountRef.current
  };
};

export default usePreviewUpdate;
