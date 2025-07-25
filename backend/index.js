// index.js en backend/

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express, { request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Servidor backend escuchando en puerto ${port}`);
  });

// Estas líneas permiten calcular el path absoluto al directorio raíz
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");

// Cargar el archivo .env desde el directorio raíz
dotenv.config({ path: envPath });

// Inicializar el cliente de Gemini con tu API KEY
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
//const genAI = new GoogleGenerativeAI(import.meta.env.GOOGLE_API_KEY);

//console.log("API KEY:", process.env.GOOGLE_API_KEY);
//console.log("API KEY:", import.meta.env.GOOGLE_API_KEY);

app.post("/", async (request, response) => {
    try {
      const { chats } = request.body;
  
      //const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
      /*const chat = model.startChat({
        history: chats,
        generationConfig: {
          maxOutputTokens: 100,
        },*/
        const chat = model.startChat({
            history: chats.map(c => ({
              role: c.role,
              parts: [{ text: c.content }]
            })),
            generationConfig: {
              maxOutputTokens: 100,
            },
      });

      const result = await chat.sendMessage(chats[chats.length - 1].content);
      const reply = await result.response.text();

      response.json({ 
        output: reply 
    });
      /*res.json({
        output: responseText,
      });*/

    } catch (error) {
        console.error("Error al generar respuesta:", error);
        response.status(500).json({ error: "Ocurrió un error generando respuesta" });
    }
});
