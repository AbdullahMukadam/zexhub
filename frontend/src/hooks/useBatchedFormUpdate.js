import { useRef, useCallback } from 'react';

/**
 * Batches multiple form field updates into a single state update
 * This prevents multiple re-renders when updating multiple fields at once
 * 
 * Usage:
 * const { batchUpdate, flushUpdates } = useBatchedFormUpdate(updateFormData);
 * 
 * // Queue updates
 * batchUpdate('name', 'John');
 * batchUpdate('email', 'john@example.com');
 * 
 * // All updates will be flushed automatically after the batch window
 * // Or manually flush: flushUpdates();
 */
export const useBatchedFormUpdate = (onUpdate, batchWindow = 50) => {
  const batchRef = useRef({});
  const timeoutRef = useRef(null);

  /**
   * Flush all pending updates
   */
  const flushUpdates = useCallback(() => {
    if (Object.keys(batchRef.current).length === 0) return;

    const updates = { ...batchRef.current };
    batchRef.current = {};
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    onUpdate(updates);
  }, [onUpdate]);

  /**
   * Add a field update to the batch
   */
  const batchUpdate = useCallback((fieldName, value) => {
    // Add to batch
    batchRef.current[fieldName] = value;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout to flush
    timeoutRef.current = setTimeout(flushUpdates, batchWindow);
  }, [batchWindow, flushUpdates]);

  /**
   * Update multiple fields at once
   */
  const batchUpdateMultiple = useCallback((updates) => {
    Object.assign(batchRef.current, updates);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(flushUpdates, batchWindow);
  }, [batchWindow, flushUpdates]);

  /**
   * Clear all pending updates without flushing
   */
  const clearBatch = useCallback(() => {
    batchRef.current = {};
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return {
    batchUpdate,
    batchUpdateMultiple,
    flushUpdates,
    clearBatch
  };
};

export default useBatchedFormUpdate;
