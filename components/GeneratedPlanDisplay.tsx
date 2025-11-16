import React from 'react';
import { GeneratedPlan } from '../types';
import ArchitectureDiagram from './ArchitectureDiagram';
import SuggestionCard from './SuggestionCard';
import Icon from './Icon';
import FileExplorer from './FileExplorer';

interface GeneratedPlanDisplayProps {
  plan: GeneratedPlan;
}

const GeneratedPlanDisplay: React.FC<GeneratedPlanDisplayProps> = ({ plan }) => {
  return (
    <div className="space-y-12">
      <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Your Custom Migration Plan</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Powered by Gemini, here is a comprehensive plan tailored to your requirements.
          </p>
      </div>

      {/* Architecture Section */}
      <div className="p-8 bg-white rounded-2xl shadow-lg">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Proposed Architecture</h3>
        <p className="text-gray-600 mb-8">{plan.architecture.description}</p>
        <ArchitectureDiagram 
            components={plan.architecture.components} 
            connections={plan.architecture.connections} 
        />
      </div>

      {/* Suggestions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SuggestionCard title="Cost Considerations" content={plan.suggestions.cost} />
        <SuggestionCard title="Estimated Timeline" content={plan.suggestions.timeline} />
      </div>

      {/* GCP Services */}
      <div className="p-8 bg-white rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Recommended GCP Services</h3>
          <ul className="space-y-4">
              {plan.gcpServices.map((service, index) => (
              <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 mr-4 mt-1">
                      <Icon name={service.name.toLowerCase().replace(/ /g, '').replace('/', '') as any} />
                  </div>
                  <div>
                      <h4 className="font-semibold text-lg text-gray-800">{service.name}</h4>
                      <p className="text-gray-600">{service.reason}</p>
                  </div>
              </li>
              ))}
          </ul>
      </div>

      {/* Generated Project Files */}
       <div className="p-8 bg-white rounded-2xl shadow-lg">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">Generated Project Files</h3>
        <FileExplorer files={plan.generatedFiles} />
      </div>
      
      {/* Improvements and Best Practices */}
      <div className="p-8 bg-white rounded-2xl shadow-lg">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">Improvements & Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="font-semibold text-lg text-blue-700">Key Improvements</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {plan.suggestions.improvements.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-lg text-blue-700">Monitoring Strategy</h4>
            <p className="text-gray-600">{plan.suggestions.monitoring}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-lg text-blue-700">Data Quality & Lineage</h4>
            <p className="text-gray-600">{plan.suggestions.dataQualityAndLineage}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default GeneratedPlanDisplay;