import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiUser } from 'react-icons/fi';
import { FaTwitter } from 'react-icons/fa';
import previewRegistry from './previews/registry';

const ShowcaseCard = ({ component }) => {
  const hasLivePreview = component.hasLivePreview === true;
  const hasCreator = component.creator !== null && component.creator !== undefined;
  
  // Get the Preview Component from registry
  const PreviewComponent = previewRegistry[component.id];

  return (
    <Link to={`/showcase/${component.id}`} className="block h-full">
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="group h-full flex flex-col bg-[#050505] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 hover:shadow-2xl hover:shadow-white/5 transition-all duration-300"
      >
        {/* Preview Area */}
        <div className="relative h-[240px] w-full flex items-center justify-center bg-[#0a0a0a] border-b border-white/5 overflow-hidden group-hover:bg-[#0f0f0f] transition-colors">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
            {hasLivePreview && PreviewComponent ? (
              <div className="scale-[0.6] origin-center pointer-events-none select-none">
                <PreviewComponent />
              </div>
            ) : (
              // Fallback for items without live preview (formerly videos/images)
              // We can show a placeholder or the image if it exists (but user said remove videos)
              // We'll prioritize the image if it's an image type, otherwise a generic placeholder
              component.media?.type === 'image' ? (
                <img 
                  src={component.media.url} 
                  alt={component.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              ) : (
                 <div className="flex flex-col items-center gap-3 text-util-gray/30 group-hover:text-util-gray/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest">View Component</span>
                 </div>
              )
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-display font-bold text-white group-hover:text-blue-400 transition-colors">
              {component.title}
            </h3>
          </div>
          
          <p className="text-sm text-util-gray/60 leading-relaxed mb-4 line-clamp-2">
            {component.description}
          </p>

          <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
            {hasCreator ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
                  {component.creator.name.charAt(0)}
                </div>
                <span className="text-xs text-util-gray/60">{component.creator.name}</span>
              </div>
            ) : (
              <span className="text-xs text-util-gray/60">Community</span>
            )}
            
            <div className="flex gap-2">
              {component.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-util-gray/40 border border-white/5">
                  #{tag}
                </span>
              ))}
              {component.tags.length > 2 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-util-gray/40 border border-white/5">
                  +{component.tags.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ShowcaseCard;