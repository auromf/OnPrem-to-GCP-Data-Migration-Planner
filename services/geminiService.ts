import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedPlan, PipelineType } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface PlanRequest {
  source: string;
  sink: string;
  sourceSchema: string;
  destinationSchema: string;
  pipelineType: PipelineType;
}

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        architecture: {
            type: Type.OBJECT,
            properties: {
                description: { type: Type.STRING },
                components: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            name: { type: Type.STRING },
                            type: { type: Type.STRING },
                            description: { type: Type.STRING }
                        },
                        required: ["id", "name", "type", "description"]
                    }
                },
                connections: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            from: { type: Type.STRING },
                            to: { type: Type.STRING },
                            label: { type: Type.STRING }
                        },
                        required: ["from", "to", "label"]
                    }
                }
            },
            required: ["description", "components", "connections"]
        },
        gcpServices: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    reason: { type: Type.STRING }
                },
                required: ["name", "reason"]
            }
        },
        generatedFiles: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    filename: { type: Type.STRING },
                    language: { type: Type.STRING },
                    content: { type: Type.STRING }
                },
                required: ["filename", "language", "content"]
            }
        },
        suggestions: {
            type: Type.OBJECT,
            properties: {
                cost: { type: Type.STRING },
                timeline: { type: Type.STRING },
                improvements: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                },
                monitoring: { type: Type.STRING },
                dataQualityAndLineage: { type: Type.STRING },
            },
            required: ["cost", "timeline", "improvements", "monitoring", "dataQualityAndLineage"]
        }
    },
    required: ["architecture", "gcpServices", "generatedFiles", "suggestions"]
};

export async function generateMigrationPlan(request: PlanRequest): Promise<GeneratedPlan> {
  const { source, sink, sourceSchema, destinationSchema, pipelineType } = request;

  const prompt = `
    You are an expert GCP Enterprise Data Architect. Your task is to generate a comprehensive, production-ready data migration project structure.

    Migration Details:
    - Source System: ${source}
    - Destination GCP Service: ${sink}
    - Pipeline Type: ${pipelineType}
    - Source Schema: ${sourceSchema ? `\n\`\`\`sql\n${sourceSchema}\n\`\`\`` : 'Not provided.'}
    - Destination Schema: ${destinationSchema ? `\n\`\`\`\n${destinationSchema}\n\`\`\`` : 'Not provided.'}

    Based on these details, provide the following in a structured JSON format:

    1.  **Architecture**:
        *   \`description\`: A high-level overview of the proposed migration architecture.
        *   \`components\`: An array of key components in the architecture. Each component must have an 'id', 'name', 'type', and 'description'. Include source, sink, intermediary services (Dataflow, Pub/Sub, Composer), and components for logging, monitoring, data quality, and lineage (Cloud Logging, Datacatalog).
        *   \`connections\`: An array of connections between components.

    2.  **GCP Services**: A list of all recommended GCP services with a brief justification for each.

    3.  **Generated Files**: An array of file objects for a complete project. Each object must have 'filename', 'language', and 'content'. Create the following files:
        *   \`README.md\`: (language: markdown) Project overview, architecture summary, setup instructions (virtual env, pip install), and how to run the pipeline.
        *   \`requirements.txt\`: (language: text) List of necessary Python packages (e.g., apache-beam[gcp], sqlalchemy, google-cloud-secret-manager).
        *   \`run.sh\`: (language: shell) A simple bash script to set up a virtual environment, install dependencies, and execute the main pipeline script.
        *   \`src/config.py\`: (language: python) A configuration file. Include placeholders for GCP Project ID, source/sink connection details, and other parameters. Use a function to fetch secrets from Google Secret Manager. DO NOT hardcode credentials.
        *   \`src/main.py\`: (language: python) The main Apache Beam pipeline script. It should orchestrate the entire ETL process:
            - Import other modules.
            - Define pipeline options.
            - Read data from the source (use a custom PTransform).
            - Apply transformations and data quality checks from other modules.
            - Implement a basic CDC logic (e.g., using a watermark column from config).
            - Write valid data to the destination sink and errored records to a dead-letter queue in GCS.
        *   \`src/transformations.py\`: (language: python) A module containing data cleaning and business logic transformations as a Beam PTransform or DoFn.
        *   \`src/dq_checks.py\`: (language: python) A module for data quality checks. Implement it as a PTransform that outputs two PCollections: one for valid records and one for invalid records, including the reason for failure.
        *   \`src/cdc_logic.py\`: (language: python) A module that defines a PTransform for reading data incrementally from the source based on a timestamp or ID column (high-watermark CDC).

    4.  **Suggestions**:
        *   \`cost\`: High-level cost factors and optimization tips.
        *   \`timeline\`: A rough migration timeline.
        *   \`improvements\`: Key suggestions for the migration process.
        *   \`monitoring\`: Strategy for logging and monitoring.
        *   \`dataQualityAndLineage\`: Strategy for data quality and lineage.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text;
    const plan: GeneratedPlan = JSON.parse(jsonText);
    return plan;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate migration plan from Gemini API.");
  }
}