import { genAI } from "../lib/gemini";

export const analyzeMenu = async (base64Image: string) => {
  const prompt = `
    You are a food analysis AI. Analyze this restaurant menu image.
    Extract EVERY dish you can see and return a JSON array.
    For each dish provide:
    - name (string)
    - vegStatus: 'veg' | 'non_veg' | 'egg' | 'seafood' | 'unknown'
    - healthBadge: 'healthy' | 'moderate' | 'avoid'
    - healthScore: 0-100
    - description: one-line plain English
    - cookingStyle: e.g. 'fried', 'grilled', 'steamed'
    - healthReason: why this rating
    - bestFor: comma-separated (e.g. 'protein diet, muscle gain')
    - avoidIf: comma-separated (e.g. 'diabetes, weight loss')
    - ingredients: string array of estimated ingredients
    - isRecommended: boolean (true for top 5 healthiest)
    - recommendationReason: one-line reason if recommended
    Return ONLY valid JSON. No markdown. No explanation.
    `;

  const response = await genAI.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
      {
        text: prompt,
      },
    ],
  });

  const text = response.text;
  if(!text) {
    throw new Error("Empty response from Gemini");
  }

  const clean = text.replace(/```json|```/g, "").trim();

  const json = JSON.parse(clean);

  return json;
};
