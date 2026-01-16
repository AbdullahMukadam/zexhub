
import React from 'react';

const FormField = ({ field, value, onChange, onBlur, error }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(field.name, newValue);
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur(field.name);
    }
  };

  const inputClasses = `w-full bg-[#050505] text-white px-3 py-2.5 border rounded-md transition-all text-sm font-sans ${
    error 
      ? 'border-red-500/50 focus:border-red-500' 
      : 'border-white/10 focus:border-white/30 hover:border-white/20'
  } outline-none placeholder-util-gray/30`;

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'url':
      case 'number':
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={field.placeholder || ''}
            required={field.required}
            className={inputClasses}
          />
        );

      case 'textarea':
        return (
          <textarea
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={field.placeholder || ''}
            required={field.required}
            rows={field.rows || 4}
            className={`${inputClasses} resize-y min-h-[100px]`}
          />
        );

      case 'select':
        return (
          <div className="relative">
            <select
              id={field.name}
              name={field.name}
              value={value || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              required={field.required}
              className={`${inputClasses} appearance-none pr-8`}
            >
              <option value="" className="bg-[#111] text-util-gray">Select an option...</option>
              {field.options?.map((option, index) => (
                <option key={index} value={option.value || option} className="bg-[#111] text-white">
                  {option.label || option}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-util-gray">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div className="flex items-center cursor-pointer group p-3 border border-white/5 rounded-md hover:bg-white/5 transition-colors" onClick={() => onChange(field.name, !value)}>
            <div className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${value ? 'bg-white border-white text-black' : 'border-white/20 bg-transparent group-hover:border-white/40'}`}>
              {value && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
            </div>
            <label className="ml-3 text-sm font-medium text-white cursor-pointer select-none">
              {field.checkboxLabel || field.label}
            </label>
          </div>
        );

      case 'array':
        return (
          <ArrayInput
            field={field}
            value={value || []}
            onChange={onChange}
            error={error}
          />
        );

      default:
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClasses}
          />
        );
    }
  };

  return (
    <div className="mb-5 last:mb-0">
      {field.type !== 'checkbox' && (
        <label htmlFor={field.name} className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-util-gray uppercase tracking-wider">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </span>
          {error && (
            <span className="text-[10px] text-red-500 font-medium">
              {error}
            </span>
          )}
        </label>
      )}
      
      {renderField()}
      
      {field.helpText && (
        <p className="mt-1.5 text-[11px] text-util-gray/50 font-sans">
          {field.helpText}
        </p>
      )}
    </div>
  );
};

// Array input component
const ArrayInput = ({ field, value, onChange, error }) => {
  const items = Array.isArray(value) ? value : [];
  const maxItems = field.maxItems || 10;

  const addItem = () => {
    if (items.length < maxItems) {
      onChange(field.name, [...items, '']);
    }
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(field.name, newItems);
  };

  const updateItem = (index, newValue) => {
    const newItems = [...items];
    newItems[index] = newValue;
    onChange(field.name, newItems);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 group">
          <input
            type={field.itemType || 'text'}
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            className="flex-1 bg-[#050505] text-white px-3 py-2 border border-white/10 rounded focus:border-white/30 outline-none font-sans text-sm placeholder-util-gray/30"
            placeholder={`Item ${index + 1}...`}
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="px-3 bg-white/5 border border-white/10 rounded text-util-gray hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition-colors"
            title="Remove Item"
          >
            ×
          </button>
        </div>
      ))}
      
      {items.length < maxItems && (
        <button
          type="button"
          onClick={addItem}
          className="w-full py-2 bg-white/5 border border-dashed border-white/10 rounded text-util-gray text-xs font-bold uppercase tracking-wide hover:bg-white/10 hover:border-white/20 transition-colors"
        >
          + Add Entry
        </button>
      )}
    </div>
  );
};

export default FormField;
