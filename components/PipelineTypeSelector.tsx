
import React from 'react';
import { PipelineType } from '../types';

interface PipelineTypeSelectorProps {
  selected: PipelineType;
  onSelect: (type: PipelineType) => void;
}

const PipelineTypeSelector: React.FC<PipelineTypeSelectorProps> = ({ selected, onSelect }) => {
  const types = Object.values(PipelineType);

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Pipeline Type</h3>
      <div className="flex flex-wrap gap-4">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`
              px-6 py-3 rounded-full font-semibold text-sm transition-colors duration-200
              ${selected === type
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PipelineTypeSelector;
