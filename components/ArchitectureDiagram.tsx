
import React from 'react';
import { ArchitectureComponent, ArchitectureConnection } from '../types';
import Icon from './Icon';
import { SERVICE_TO_ICON_MAP } from '../constants';

interface ArchitectureDiagramProps {
  components: ArchitectureComponent[];
  connections: ArchitectureConnection[];
}

const getIconName = (componentName: string) => {
    const lowerCaseName = componentName.toLowerCase();
    for (const key in SERVICE_TO_ICON_MAP) {
        if (lowerCaseName.includes(key)) {
            return SERVICE_TO_ICON_MAP[key] as any;
        }
    }
    return 'generic';
}

const ComponentNode: React.FC<{ component: ArchitectureComponent }> = ({ component }) => (
  <div className="flex flex-col items-center text-center w-28 md:w-36">
    <div className="w-16 h-16 md:w-20 md:h-20 p-3 bg-gray-100 rounded-full flex items-center justify-center shadow-sm">
      <Icon name={getIconName(component.name)} />
    </div>
    <p className="mt-2 font-semibold text-sm md:text-base text-gray-700">{component.name}</p>
    <p className="text-xs text-gray-500 hidden md:block">{component.description}</p>
  </div>
);

const Arrow: React.FC = () => (
    <div className="flex-1 flex items-center justify-center px-2">
        <div className="w-full h-px bg-gray-400 relative">
             <div className="absolute right-0 top-1/2 -mt-1.5 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-gray-400"></div>
        </div>
    </div>
);


const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ components, connections }) => {
  // A simple heuristic to lay out components. A real implementation might use a graph layout algorithm.
  // For this app, we assume a left-to-right flow: source -> process -> sink.
  const sortedComponents = [...components].sort((a, b) => {
    const order = ['source', 'transform', 'gcp_service', 'sink', 'monitoring'];
    return order.indexOf(a.type) - order.indexOf(b.type);
  });
  
  // This is a simplified renderer. It assumes a linear flow.
  // For complex graphs from Gemini, a more robust library like react-flow might be needed.
  // But for most migration paths, this linear display is effective and clean.

  return (
    <div className="w-full bg-white p-4 md:p-8 rounded-lg border border-gray-200 overflow-x-auto">
        <div className="flex items-start justify-center space-x-4 md:space-x-8 min-w-max">
            {sortedComponents.map((component, index) => (
                <React.Fragment key={component.id}>
                    <ComponentNode component={component} />
                    {index < sortedComponents.length - 1 && <Arrow />}
                </React.Fragment>
            ))}
        </div>
    </div>
  );
};

export default ArchitectureDiagram;
