
import React from 'react';

interface SuggestionCardProps {
  title: string;
  content: string;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ title, content }) => {
  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg">
      <h3 className="text-3xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 whitespace-pre-line">{content}</p>
    </div>
  );
};

export default SuggestionCard;
