import { useState } from "react";
import './App.css';

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    const updatedChats = [...chats, userMessage];
    setChats(updatedChats);
    setMessage("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chats: updatedChats }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      const aiMessage = {
        role: "gemini",
        content: data.output, // <- lo que devuelve el backend
      };

      setChats((prevChats) => [...prevChats, aiMessage]);
    } catch (error) {
      console.error("Error al generar respuesta:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <main>
      <h1>Bienvenido a GeminiTalk</h1>

      <section>
        {chats.map((chat, index) => (
          <p key={index} className={chat.role === "user" ? "user_msg" : "bot_msg"}>
            <strong>{chat.role.toUpperCase()}:</strong> {chat.content}
          </p>
        ))}
      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Escribiendo..." : ""}</i>
        </p>
      </div>

      <form onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Escribí tu mensaje..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </main>
  );
}

export default App;

