import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
import fetch, { Headers } from "node-fetch";

globalThis.fetch = fetch;
globalThis.Headers = Headers;

config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function main() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent("Explica cómo funciona la inteligencia artificial en pocas palabras");
    const response = await result.response;

    console.log("🤖 Gemini:", response.text());
  } catch (e) {
    console.error("❌ Error:", e);
  }
}

main();
