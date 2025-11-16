
import React, { useState, useCallback } from 'react';
import { DATA_SOURCES, DATA_SINKS } from './constants';
import { PipelineType, type GeneratedPlan } from './types';
import { generateMigrationPlan } from './services/geminiService';

import Header from './components/Header';
import SelectorGrid from './components/SelectorGrid';
import SchemaInput from './components/SchemaInput';
import PipelineTypeSelector from './components/PipelineTypeSelector';
import GeneratedPlanDisplay from './components/GeneratedPlanDisplay';
import Loader from './components/Loader';

function App() {
  const [source, setSource] = useState<string | null>(null);
  const [sink, setSink] = useState<string | null>(null);
  const [sourceSchema, setSourceSchema] = useState('');
  const [destinationSchema, setDestinationSchema] = useState('');
  const [pipelineType, setPipelineType] = useState<PipelineType>(PipelineType.BATCH);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = useCallback(async () => {
    if (!source || !sink) {
      setError('Please select both a source and a sink.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedPlan(null);

    try {
      const sourceName = DATA_SOURCES.find(s => s.id === source)?.name;
      const sinkName = DATA_SINKS.find(s => s.id === sink)?.name;
      if (!sourceName || !sinkName) throw new Error("Invalid source or sink name");
      
      const plan = await generateMigrationPlan({
        source: sourceName,
        sink: sinkName,
        sourceSchema,
        destinationSchema,
        pipelineType,
      });
      setGeneratedPlan(plan);
    } catch (err) {
      console.error('Error generating plan:', err);
      setError('Failed to generate migration plan. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  }, [source, sink, sourceSchema, destinationSchema, pipelineType]);

  const canGenerate = source && sink;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <section id="selection" className="p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">1. Select Source & Sink</h2>
            <p className="text-gray-600 mb-8">Choose your on-premise data source and the target GCP service.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Source Database</h3>
                <SelectorGrid options={DATA_SOURCES} selected={source} onSelect={setSource} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-4">GCP Destination (Sink)</h3>
                <SelectorGrid options={DATA_SINKS} selected={sink} onSelect={setSink} />
              </div>
            </div>
          </section>

          <section id="details" className="p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">2. Provide Details</h2>
            <p className="text-gray-600 mb-8">Enter your data schemas and choose the pipeline type for a more accurate plan.</p>
            <div className="space-y-8">
                <PipelineTypeSelector selected={pipelineType} onSelect={setPipelineType} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <SchemaInput
                      label="Source Schema (Optional)"
                      placeholder="e.g., CREATE TABLE users (id INT, name VARCHAR(255), ...);"
                      value={sourceSchema}
                      onChange={setSourceSchema}
                    />
                    <SchemaInput
                      label="Destination Schema (Optional)"
                      placeholder="e.g., id:INTEGER, name:STRING, ..."
                      value={destinationSchema}
                      onChange={setDestinationSchema}
                    />
                </div>
            </div>
          </section>

          <div className="flex justify-center py-4">
            <button
              onClick={handleGeneratePlan}
              disabled={!canGenerate || isLoading}
              className="px-12 py-4 bg-blue-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              {isLoading ? 'Generating Plan...' : 'Generate Migration Plan'}
            </button>
          </div>
          
          {error && <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">{error}</div>}

          {isLoading && <Loader />}
          
          {generatedPlan && (
            <section id="plan" className="mt-12">
               <GeneratedPlanDisplay plan={generatedPlan} />
            </section>
          )}

        </div>
      </main>
    </div>
  );
}

export default App;
