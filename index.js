import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
import readline from "readline";
import fetch, { Headers } from "node-fetch";

// Polyfills necesarios para Node.js < 18
globalThis.fetch = fetch;
globalThis.Headers = Headers;

// Cargar API key desde .env
config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const messages = [];

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("🤖 Escribí tu mensaje para comenzar el chat con Gemini:");
userInterface.prompt();

userInterface.on("line", async (input) => {
  try {
    messages.push({ role: "user", content: input });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: input }] }],
    });

    const response = await result.response;
    const reply = response.text();

    console.log("🤖 Gemini:", reply);
    messages.push({ role: "model", content: reply });
  } catch (e) {
    console.error("❌ Error:", e);
  }

  userInterface.prompt();
});
