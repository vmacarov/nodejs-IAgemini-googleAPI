🧠 FullStack Chat con Gemini

Una aplicación de chat FullStack construida con React + Vite en el frontend y Express.js en el backend, utilizando la API de Gemini (Google Generative AI) para generar respuestas de inteligencia artificial.

🚀 Características

Interfaz moderna y responsiva
Conversación estilo "chat" entre usuario e IA
Backend seguro: la API key de Gemini no se expone al cliente
Historial de mensajes alternado tipo:

Usuario
IA
Usuario
IA

📦 Tecnologías

Frontend: React + Vite + CSS
Backend: Node.js + Express
IA: Gemini API (@google/generative-ai)

🛠️ Requisitos

Node.js >= 18
Una clave API de Gemini (desde Google AI Studio)

🔧 Instalación

1. Clonar el repositorio

git clone https://github.com/vmacarov/nodejs-IAgemini-googleAPI.git
cd fullstack-gemini-chat

2. Instalá dependencias del backend:

cd backend
npm install

3. Instalá dependencias del frontend:
cd frontend
npm install

🔐 Configuración del entorno

Volvé al directorio raíz y Creá un archivo .env en el directorio raíz del proyecto con el siguiente contenido:

GEMINI_API_KEY=tu_clave_de_api

▶️ Ejecución

sobre el directorio backend
Iniciar el backend (escucha en el puerto 8000) ejecutar:
node index.js
Aplicación disponible en: http://localhost:8000

En otra terminal, iniciar el frontend sobre el directorio frontend:
npm run dev
Aplicación disponible en: http://localhost:5173

🧑‍💻 Uso

1.Escribí un mensaje en el campo de entrada.
2.Presioná Enter o hacé clic en Enviar.
3.El mensaje se envía al servidor, que lo reenvía a la API de Gemini.
4.La respuesta de la IA aparece justo debajo de tu mensaje.

🛡 Seguridad

La API Key de Gemini no se expone al cliente.
Las solicitudes se hacen desde el servidor backend, que actúa como proxy seguro.