import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css"; // crea o edita para estilos opcionales

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatModel, setChatModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chat = await model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Quiero que actúes como un asistente de IA." }],
          },
          {
            role: "model",
            parts: [{ text: "¡Hola! ¿En qué puedo ayudarte hoy?" }],
          },
        ],
      });
      setChatModel(chat);
    };
    loadModel();
  }, []);

  const chat = async (e, message) => {
    e.preventDefault();
    if (!message.trim() || !chatModel) return;

    setIsTyping(true);

    const updatedChats = [...chats, { role: "user", content: message }];
    setChats(updatedChats);
    setMessage("");

    try {
      const result = await chatModel.sendMessage(message);
      const reply = result.response.text();

      updatedChats.push({ role: "assistant", content: reply });
      setChats(updatedChats);
    } catch (err) {
      console.error("Error al generar respuesta:", err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <main className="chat-container">
      <h1>Chat AI con Gemini</h1>

      <div className="chat-box">
        {chats.map((msg, i) => (
          <p key={i} className={msg.role}>
            <strong>{msg.role === "user" ? "🧑" : "🤖"}:</strong> {msg.content}
          </p>
        ))}

        {isTyping && (
          <div className="typing">
            <i>Escribiendo...</i>
          </div>
        )}
      </div>

      <form onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          value={message}
          placeholder="Escribe un mensaje y presiona Enter..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </main>
  );
}

export default App;
