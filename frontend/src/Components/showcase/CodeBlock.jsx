import { useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';

const CodeBlock = ({ code, language = 'jsx' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 p-2 bg-white/5 hover:bg-white/10 rounded-md transition-all opacity-0 group-hover:opacity-100"
        title="Copy code"
      >
        {copied ? (
          <FiCheck className="w-3.5 h-3.5 text-green-400" />
        ) : (
          <FiCopy className="w-3.5 h-3.5 text-util-gray" />
        )}
      </button>

      <pre className="bg-[#020202] p-6 overflow-x-auto text-xs font-mono leading-relaxed text-util-gray/80 scrollbar-hide">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
