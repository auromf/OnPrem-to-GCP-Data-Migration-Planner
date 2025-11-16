
import React from 'react';
import { TechOption } from '../types';
import Icon from './Icon';

interface SelectorGridProps {
  options: TechOption[];
  selected: string | null;
  onSelect: (id: string) => void;
}

const SelectorGrid: React.FC<SelectorGridProps> = ({ options, selected, onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={`
            p-4 border-2 rounded-lg flex flex-col items-center justify-center space-y-3 
            transition-all duration-200 ease-in-out transform hover:scale-105
            ${selected === option.id 
              ? 'bg-blue-50 border-blue-500 shadow-md' 
              : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-sm'
            }
          `}
        >
          <div className="h-12 w-12">
            <Icon name={option.id.replace('_source', '') as any} />
          </div>
          <span className={`text-center font-medium ${selected === option.id ? 'text-blue-700' : 'text-gray-700'}`}>
            {option.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SelectorGrid;
