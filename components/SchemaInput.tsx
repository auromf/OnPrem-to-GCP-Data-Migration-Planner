
import React from 'react';

interface SchemaInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const SchemaInput: React.FC<SchemaInputProps> = ({ label, placeholder, value, onChange }) => {
  return (
    <div>
      <label className="block text-xl font-semibold text-gray-800 mb-4">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={8}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 font-mono text-sm bg-gray-50"
      />
    </div>
  );
};

export default SchemaInput;
