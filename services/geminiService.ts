import { GoogleGenAI, Type } from "@google/genai";
import { Meal } from "../types";

// Mock response for fallback if no API key is present or if user is offline
const MOCK_ANALYSIS: Meal = {
  id: "mock-1",
  name: "Avocado Toast & Egg",
  type: "Breakfast",
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  calories: 540,
  image: "", // Will be filled with captured image
  macros: {
    carbs: 45,
    protein: 18,
    fat: 22
  }
};

export const analyzeFoodImage = async (base64Image: string): Promise<Meal> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("No API_KEY found. Returning mock analysis data.");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { ...MOCK_ANALYSIS, image: base64Image };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Convert base64 data URL to raw base64 string if needed
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: "image/jpeg"
            }
          },
          {
            text: "Analyze this food image. Identify the meal name, estimate calories, and estimate macros (protein, carbs, fat). Suggest a meal type (Breakfast, Lunch, Dinner, Snack)."
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            calories: { type: Type.INTEGER },
            type: { type: Type.STRING },
            macros: {
              type: Type.OBJECT,
              properties: {
                protein: { type: Type.INTEGER },
                carbs: { type: Type.INTEGER },
                fat: { type: Type.INTEGER }
              }
            }
          }
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    
    return {
      id: crypto.randomUUID(),
      name: result.name || "Unknown Meal",
      type: (result.type as any) || "Snack",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      calories: result.calories || 0,
      image: base64Image,
      macros: {
        protein: result.macros?.protein || 0,
        carbs: result.macros?.carbs || 0,
        fat: result.macros?.fat || 0
      }
    };

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return { ...MOCK_ANALYSIS, image: base64Image };
  }
};
