/**
 * Test Component: Verify "Processing_Input..." Fix
 * 
 * This component helps you manually test that the overlay appears/disappears correctly
 * 
 * Usage:
 * 1. Temporarily add this to your app (e.g., in editor page)
 * 2. Test the scenarios below
 * 3. Remove after verification
 */

import React, { useState } from 'react';
import { usePreviewUpdate } from '../hooks/usePreviewUpdate';

export function PreviewUpdateTest() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [updateLog, setUpdateLog] = useState([]);

  const { queueUpdate, hasPendingChanges, updateCount } = usePreviewUpdate({
    onUpdate: (data) => {
      setUpdateLog(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        action: 'UPDATE',
        data: JSON.stringify(data)
      }]);
    },
    delay: 800,
    strategy: 'debounced'
  });

  // Queue update when form data changes
  React.useEffect(() => {
    queueUpdate(formData);
  }, [formData, queueUpdate]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addLog = (action, details) => {
    setUpdateLog(prev => [...prev, {
      time: new Date().toLocaleTimeString(),
      action,
      data: details
    }]);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Preview Update System Test</h2>
        
        {/* Status Indicators */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className={`p-4 rounded ${hasPendingChanges ? 'bg-yellow-600' : 'bg-green-600'}`}>
            <div className="text-sm opacity-75">Has Pending Changes</div>
            <div className="text-2xl font-bold">{hasPendingChanges ? 'YES' : 'NO'}</div>
          </div>
          
          <div className="p-4 rounded bg-blue-600">
            <div className="text-sm opacity-75">Update Count</div>
            <div className="text-2xl font-bold">{updateCount}</div>
          </div>
          
          <div className="p-4 rounded bg-purple-600">
            <div className="text-sm opacity-75">Log Entries</div>
            <div className="text-2xl font-bold">{updateLog.length}</div>
          </div>
        </div>

        {/* Test Form */}
        <div className="bg-gray-800 p-4 rounded space-y-4">
          <h3 className="font-bold mb-2">Test Form</h3>
          
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded"
              placeholder="Type here..."
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded"
              placeholder="Type here..."
            />
          </div>
        </div>

        {/* Current Data */}
        <div className="bg-gray-800 p-4 rounded mt-4">
          <h3 className="font-bold mb-2">Current Form Data</h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>

      {/* Test Scenarios */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h3 className="font-bold text-blue-900 mb-4">Test Scenarios</h3>
        
        <div className="space-y-3 text-sm">
          <div className="bg-white p-3 rounded">
            <div className="font-bold text-blue-800">✓ Test 1: Type new value</div>
            <div className="text-gray-600">Type something in Name field</div>
            <div className="text-green-600 mt-1">
              Expected: "Has Pending Changes" = YES → wait 800ms → becomes NO
            </div>
          </div>
          
          <div className="bg-white p-3 rounded">
            <div className="font-bold text-blue-800">✓ Test 2: Type same value</div>
            <div className="text-gray-600">Clear Name field, type "test", delete it, type "test" again</div>
            <div className="text-green-600 mt-1">
              Expected: Second "test" should NOT increase update count
            </div>
          </div>
          
          <div className="bg-white p-3 rounded">
            <div className="font-bold text-blue-800">✓ Test 3: Rapid typing</div>
            <div className="text-gray-600">Type "Hello World" quickly</div>
            <div className="text-green-600 mt-1">
              Expected: "Has Pending Changes" = YES during typing → NO after 800ms of no typing
            </div>
          </div>
          
          <div className="bg-white p-3 rounded">
            <div className="font-bold text-blue-800">✓ Test 4: No change</div>
            <div className="text-gray-600">Type "A", wait for update, type "B", backspace, type "A"</div>
            <div className="text-green-600 mt-1">
              Expected: Final "A" should set "Has Pending Changes" to NO immediately (no update)
            </div>
          </div>
        </div>
      </div>

      {/* Update Log */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900">Update Log</h3>
          <button
            onClick={() => setUpdateLog([])}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
          >
            Clear Log
          </button>
        </div>
        
        <div className="space-y-2 max-h-96 overflow-auto">
          {updateLog.length === 0 ? (
            <div className="text-gray-400 text-center py-8">
              No updates yet. Start typing to see logs.
            </div>
          ) : (
            updateLog.map((entry, i) => (
              <div key={i} className="bg-gray-50 p-3 rounded text-sm font-mono">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-blue-600">{entry.action}</span>
                  <span className="text-gray-500 text-xs">{entry.time}</span>
                </div>
                <div className="text-gray-700 text-xs overflow-auto">
                  {entry.data}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Expected Results */}
      <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
        <h3 className="font-bold text-green-900 mb-3">✓ Expected Results (After Fix)</h3>
        
        <ul className="space-y-2 text-sm text-green-800">
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>"Has Pending Changes" should be NO when idle</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>"Has Pending Changes" should be YES only while typing (+ 800ms debounce)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Typing same value twice should skip second update</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Update count should only increase when data actually changes</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Overlay should disappear after update completes</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PreviewUpdateTest;
