import React, { useState } from 'react';
import { GeneratedFile } from '../types';
import CodeBlock from './CodeBlock';

interface FileExplorerProps {
  files: GeneratedFile[];
}

const FileIcon = ({ filename }: { filename: string }) => {
    if (filename.endsWith('.py')) return <span className="mr-2 text-blue-400">🐍</span>;
    if (filename.endsWith('.md')) return <span className="mr-2 text-gray-400">📄</span>;
    if (filename.endsWith('.sh')) return <span className="mr-2 text-green-400">💲</span>;
    if (filename.endsWith('.txt')) return <span className="mr-2 text-gray-400">📝</span>;
    return <span className="mr-2 text-yellow-400">📦</span>;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ files }) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  if (!files || files.length === 0) {
    return <p className="text-gray-500">No files were generated.</p>;
  }

  const selectedFile = files[selectedFileIndex];

  return (
    <div className="flex flex-col md:flex-row border border-gray-200 rounded-lg overflow-hidden min-h-[600px] bg-gray-800">
      {/* File List Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-900/50 border-r border-gray-700 p-2 md:p-4 overflow-y-auto">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Files</h4>
        <ul>
          {files.map((file, index) => (
            <li key={file.filename}>
              <button
                onClick={() => setSelectedFileIndex(index)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center transition-colors duration-150 ${
                  selectedFileIndex === index
                    ? 'bg-blue-600/30 text-blue-300 font-semibold'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <FileIcon filename={file.filename} />
                <span className="truncate">{file.filename}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Code Viewer */}
      <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
        {selectedFile && (
            <CodeBlock
                key={selectedFile.filename}
                title={selectedFile.filename}
                code={selectedFile.content}
                language={selectedFile.language}
            />
        )}
      </div>
    </div>
  );
};

export default FileExplorer;