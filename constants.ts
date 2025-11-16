
import { TechOption } from './types';

export const DATA_SOURCES: TechOption[] = [
  { id: 'oracle', name: 'Oracle', type: 'source' },
  { id: 'mssql', name: 'MS SQL Server', type: 'source' },
  { id: 'postgres', name: 'PostgreSQL', type: 'source' },
  { id: 'mysql', name: 'MySQL', type: 'source' },
  { id: 'teradata', name: 'Teradata', type: 'source' },
  { id: 'bigquery_source', name: 'BigQuery', type: 'source' },
];

export const DATA_SINKS: TechOption[] = [
  { id: 'bigquery', name: 'BigQuery', type: 'sink' },
  { id: 'gcs', name: 'Cloud Storage', type: 'sink' },
];

export const SERVICE_TO_ICON_MAP: { [key: string]: string } = {
  'oracle': 'oracle',
  'ms sql server': 'mssql',
  'postgresql': 'postgres',
  'mysql': 'mysql',
  'teradata': 'teradata',
  'bigquery': 'bigquery',
  'google cloud storage': 'gcs',
  'cloud storage': 'gcs',
  'dataflow': 'dataflow',
  'pub/sub': 'pubsub',
  'cloud sql': 'cloudsql',
  'composer': 'composer',
  'cloud logging': 'logging',
  'cloud monitoring': 'monitoring',
  'datacatalog': 'datacatalog',
};
