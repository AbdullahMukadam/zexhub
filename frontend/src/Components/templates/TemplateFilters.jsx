
import React from 'react';

const TemplateFilters = ({ filter, onFilterChange, templates }) => {
  const categories = ['all', 'portfolio', 'landing', 'card'];
  const types = ['all', 'html'];

  const getCategoryCount = (category) => {
    if (category === 'all') return templates.length;
    return templates.filter(t => t.category === category).length;
  };

  const getTypeCount = (type) => {
    if (type === 'all') return templates.length;
    return templates.filter(t => t.type === type).length;
  };

  const getCategoryLabel = (category) => {
    const labels = {
      all: 'All Templates',
      portfolio: 'Portfolios',
      landing: 'Landing Pages',
      card: 'Assets'
    };
    return labels[category] || category;
  };

  const getTypeLabel = (type) => {
    const labels = {
      all: 'All Frameworks',
      html: 'HTML'
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div>
        <h3 className="text-xs font-bold text-util-gray/50 uppercase tracking-widest mb-6 px-3">
          Filter By Category
        </h3>

        <div className="space-y-1">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onFilterChange({ category })}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between group transition-all duration-200 ${
                filter.category === category
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-util-gray hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-sm">{getCategoryLabel(category)}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                filter.category === category
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-util-gray group-hover:bg-white/10'
              }`}>
                {getCategoryCount(category)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Framework Type Filter */}
      <div>
        <h3 className="text-xs font-bold text-util-gray/50 uppercase tracking-widest mb-6 px-3">
          Filter By Framework
        </h3>

        <div className="space-y-1">
          {types.map(type => (
            <button
              key={type}
              onClick={() => onFilterChange({ type })}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between group transition-all duration-200 ${
                filter.type === type
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-util-gray hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-sm">{getTypeLabel(type)}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                filter.type === type
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-util-gray group-hover:bg-white/10'
              }`}>
                {getTypeCount(type)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateFilters;
