
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiGithub, FiArrowRight } from 'react-icons/fi';

const TemplateCard = ({ template, onSelect }) => {
  const navigate = useNavigate();

  const handleUseTemplate = () => {
    if (onSelect) {
      onSelect(template);
    }
    navigate(`/editor/${template.id}`);
  };

  return (
    <div className="group relative bg-[#0A0A0A] border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] bg-[#111] overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <img
          src={template.thumbnail}
          alt={template.name}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-50"></div>
        
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded text-[10px] uppercase font-mono text-util-gray tracking-wider">
            {template.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-util-accent transition-colors">
            {template.name}
          </h3>
          <p className="text-sm text-util-gray/60 leading-relaxed line-clamp-2">
            {template.description}
          </p>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
           {template.tags?.slice(0, 3).map((tag, i) => (
             <span key={i} className="text-[10px] text-util-gray/50 border border-white/5 bg-white/5 px-2 py-1 rounded uppercase font-mono">
               #{tag}
             </span>
           ))}
        </div>

        <div className="mt-auto flex items-center gap-3">
          <button
            onClick={handleUseTemplate}
            className="flex-1 bg-white text-black py-2.5 rounded text-xs font-bold uppercase tracking-wide hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            Construct <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
