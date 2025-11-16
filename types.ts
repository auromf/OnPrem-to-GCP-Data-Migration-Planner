
export interface TechOption {
  id: string;
  name: string;
  type: 'source' | 'sink';
}

export enum PipelineType {
  BATCH = 'Batch',
  STREAMING = 'Streaming',
  BOTH = 'Batch and Streaming',
}

export interface ArchitectureComponent {
  id: string;
  name: string;
  type: string;
  description: string;
}

export interface ArchitectureConnection {
  from: string;
  to: string;
  label: string;
}

export interface GeneratedPlan {
  architecture: {
    description: string;
    components: ArchitectureComponent[];
    connections: ArchitectureConnection[];
  };
  gcpServices: {
    name: string;
    reason: string;
  }[];
  pythonCode: string;
  suggestions: {
    cost: string;
    timeline: string;
    improvements: string[];
    monitoring: string;
    dataQualityAndLineage: string;
  };
}

export type IconName = 
  | 'oracle' 
  | 'mssql' 
  | 'postgres' 
  | 'mysql' 
  | 'teradata' 
  | 'bigquery' 
  | 'gcs'
  | 'dataflow'
  | 'pubsub'
  | 'cloudsql'
  | 'cloudstorage'
  | 'composer'
  | 'logging'
  | 'monitoring'
  | 'datacatalog'
  | 'generic'
  | 'arrow';
