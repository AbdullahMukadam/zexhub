import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCode, FiFile } from 'react-icons/fi';
import { FaTwitter, FaJs, FaCss3Alt, FaReact } from 'react-icons/fa';
import { showcaseComponents } from '../data/showcase/components';
import previewRegistry from '../components/showcase/previews/registry';
import CodeBlock from '../components/showcase/CodeBlock';
import SEO from '../components/common/SEO';

// Helper to get icon for file type
const getFileIcon = (filename) => {
  if (filename.endsWith('.jsx') || filename.endsWith('.tsx')) return <FaReact className="text-blue-400" />;
  if (filename.endsWith('.js') || filename.endsWith('.ts')) return <FaJs className="text-yellow-400" />;
  if (filename.endsWith('.css') || filename.endsWith('.scss')) return <FaCss3Alt className="text-blue-500" />;
  return <FiFile className="text-gray-400" />;
};

const ShowcaseItemPage = () => {
  const { id } = useParams();
  const component = showcaseComponents.find(c => c.id === id);
  const [activeCodeTab, setActiveCodeTab] = useState('');

  // Set initial active tab
  useEffect(() => {
    if (component && component.code) {
      const keys = Object.keys(component.code);
      if (keys.length > 0) {
        setActiveCodeTab(keys[0]);
      }
    }
  }, [component]);

  if (!component) {
    return (
      <div className="min-h-screen bg-[#020202] text-white pt-32 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Component Not Found</h1>
        <Link to="/showcase" className="text-blue-500 hover:underline">Back to Showcase</Link>
      </div>
    );
  }

  const PreviewComponent = previewRegistry[component.id];
  const hasCode = component.code !== null && component.code !== undefined;
  const availableFiles = hasCode ? Object.keys(component.code) : [];

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-24 pb-12 font-sans">
      <SEO 
        title={`${component.title} - Showcase`}
        description={component.description}
      />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Back Button */}
        <Link 
          to="/showcase" 
          className="inline-flex items-center gap-2 text-util-gray/60 hover:text-white mb-8 transition-colors"
        >
          <FiArrowLeft /> Back to Showcase
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{component.title}</h1>
              <p className="text-xl text-util-gray/60 max-w-2xl leading-relaxed">{component.description}</p>
            </div>
            
            {component.creator && (
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{component.creator.name}</span>
                  <a 
                    href={`https://x.com/${component.creator.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-util-gray/60 hover:text-[#1DA1F2] transition-colors flex items-center gap-1"
                  >
                    <FaTwitter className="w-3 h-3" />
                    {component.creator.twitter}
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {component.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-sm text-util-gray/60">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Live Preview */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
               Preview
            </h2>
          </div>
          
          <div className="relative min-h-[400px] w-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
            
            <div className="relative z-10 w-full flex justify-center">
              {PreviewComponent ? (
                <PreviewComponent />
              ) : (
                <div className="text-center text-util-gray/40">
                  <p>Preview not available for this component.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Code Section */}
        {hasCode && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FiCode /> Source Code
              </h2>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#020202]">
              {/* File Tabs */}
              {availableFiles.length > 0 && (
                <div className="flex items-center bg-[#0a0a0a] border-b border-white/10 overflow-x-auto no-scrollbar">
                  {availableFiles.map(file => (
                    <button
                      key={file}
                      onClick={() => setActiveCodeTab(file)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-r border-white/5 transition-colors whitespace-nowrap ${
                        activeCodeTab === file 
                          ? 'bg-[#020202] text-white border-t-2 border-t-blue-500' 
                          : 'bg-[#0a0a0a] text-util-gray/50 hover:bg-[#111] hover:text-white border-t-2 border-t-transparent'
                      }`}
                    >
                      {getFileIcon(file)}
                      {file}
                    </button>
                  ))}
                </div>
              )}

              {/* Code Content */}
              <div className="relative">
                <CodeBlock 
                  code={component.code[activeCodeTab] || ''} 
                  language={activeCodeTab} 
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ShowcaseItemPage;