// backend/aiMatcher.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function suggestSuppliers(queryDetails) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  Based on this buyer query: ${JSON.stringify(queryDetails)},
  suggest 3 most relevant suppliers from the database (if available),
  and briefly explain why they match.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
