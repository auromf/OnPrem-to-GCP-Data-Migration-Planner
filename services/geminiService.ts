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
        pythonCode: { type: Type.STRING },
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
    required: ["architecture", "gcpServices", "pythonCode", "suggestions"]
};

export async function generateMigrationPlan(request: PlanRequest): Promise<GeneratedPlan> {
  const { source, sink, sourceSchema, destinationSchema, pipelineType } = request;

  // FIX: Escaped backticks within the template literal to prevent parsing errors. Unescaped backticks were causing the TS parser to treat parts of the string as code.
  const prompt = `
    You are an expert GCP Data Migration Architect. Your task is to generate a comprehensive data migration plan.
    
    Migration Details:
    - Source System: ${source}
    - Destination GCP Service: ${sink}
    - Pipeline Type: ${pipelineType}
    - Source Schema: ${sourceSchema ? `\n\`\`\`sql\n${sourceSchema}\n\`\`\`` : 'Not provided.'}
    - Destination Schema: ${destinationSchema ? `\n\`\`\`\n${destinationSchema}\n\`\`\`` : 'Not provided.'}
    
    Based on these details, provide the following in a structured JSON format:
    
    1.  **Architecture**:
        *   \`description\`: A high-level overview of the proposed migration architecture.
        *   \`components\`: An array of key components in the architecture. Each component must have an 'id' (a unique lowercase-hyphenated string), 'name' (e.g., 'Oracle DB'), 'type' (e.g., 'source', 'gcp_service', 'transform'), and 'description'. Include the source, sink, and all intermediary GCP services (like Dataflow, Pub/Sub, Composer). Also include components for logging, monitoring, data quality, and lineage (e.g., Cloud Logging, Datacatalog).
        *   \`connections\`: An array of connections between components, using the 'id' fields. Each connection needs 'from', 'to', and a 'label' describing the data flow (e.g., 'JDBC Connection', 'Batch Load').

    2.  **GCP Services**: A list of all recommended GCP services with a brief justification for each.

    3.  **Python Code**: A Python code snippet for the core data pipeline logic. If it's a batch pipeline, use Apache Beam with the Dataflow runner. If streaming, show a basic streaming pipeline structure.

    4.  **Suggestions**:
        *   \`cost\`: A high-level summary of potential cost factors and optimization tips.
        *   \`timeline\`: A rough estimate of the migration timeline, broken down into phases.
        *   \`improvements\`: A list of 3-5 key suggestions for improving the migration process (e.g., performance tuning, security best practices).
        *   \`monitoring\`: A strategy for logging and monitoring the pipeline using GCP services.
        *   \`dataQualityAndLineage\`: A strategy for ensuring data quality and tracking data lineage.
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
