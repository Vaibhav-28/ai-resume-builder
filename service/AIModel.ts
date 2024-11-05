import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
const summarySchema = {
  description: "Object with keys as different experience levels",
  type: SchemaType.OBJECT,
  properties: {
    Fresher: {
      type: SchemaType.STRING,
      description: "Summary for the experience level as per job title",
      nullable: false,
    },
    "Mid Level": {
      type: SchemaType.STRING,
      description:
        "Summary for the mid_level experience level as per job title",
      nullable: false,
    },
    Experienced: {
      type: SchemaType.STRING,
      description:
        "Summary for the experienced experience level as per job title",
      nullable: false,
    },
  },
  required: ["Fresher", "Mid Level", "Experienced"],
};

const summaryModel = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: summarySchema,
  },
});

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const aiResult = async (prompt: string) =>
  await model.generateContent(prompt);

export const aiResultSummary = async (prompt: string) =>
  await summaryModel.generateContent(prompt);
