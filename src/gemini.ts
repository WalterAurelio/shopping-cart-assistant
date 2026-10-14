import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({});

/* console.log("Consultando a Gemini...");
console.time("Tiempo de respuesta");

const interaction = await ai.interactions.create({
  model: "gemini-3.5-flash-lite",
  input: "¿Quién es el presidente de Argentina?",
});
console.timeEnd("Tiempo de respuesta");
console.log(interaction.output_text); */
