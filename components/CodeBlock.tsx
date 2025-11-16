import React, { useState } from 'react';

interface CodeBlockProps {
  title: string;
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ title, code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-500 rounded text-white transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="p-4 overflow-auto flex-1">
        <pre><code className={`text-sm text-gray-300 font-mono whitespace-pre-wrap language-${language}`}>{code}</code></pre>
      </div>
    </div>
  );
};

export default CodeBlock;