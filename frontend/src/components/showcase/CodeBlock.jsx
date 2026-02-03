import { useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
// 1. Import the highlighter and a theme
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ code, language = 'jsx' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-md overflow-hidden">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 p-2 bg-white/5 hover:bg-white/10 rounded-md transition-all opacity-0 group-hover:opacity-100"
        title="Copy code"
      >
        {copied ? (
          <FiCheck className="w-3.5 h-3.5 text-green-400" />
        ) : (
          <FiCopy className="w-3.5 h-3.5 text-gray-400" />
        )}
      </button>

      {/* 2. Replace the <pre> tag with SyntaxHighlighter */}
      <SyntaxHighlighter
        language={language}
        style={dracula}
        customStyle={{
          background: '#020202',  // Your custom background
          padding: '24px',        // Equivalent to p-6
          margin: 0,              // Remove default margins
          fontSize: '0.75rem',    // Equivalent to text-xs
          lineHeight: '1.625',    // Equivalent to leading-relaxed
        }}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;