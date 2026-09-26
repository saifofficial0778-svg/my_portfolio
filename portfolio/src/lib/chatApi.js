/**
 * Chatbot backend client — wired to the hire_me_ai FastAPI backend.
 *
 * Set VITE_CHAT_API_URL in a .env file (copy .env.example) to point this
 * at your running backend, e.g. http://127.0.0.1:8000/chat
 *
 * Backend contract (from app/api/routes/chat.py + app/schemas/chat.py):
 *   POST {VITE_CHAT_API_URL}
 *   body:     { question: string }
 *   response: { answer: string }
 *
 * Note: the backend is stateless per request — it re-reads and re-parses
 * the resume PDF on every call and has no server-side memory of earlier
 * turns. The widget keeps the visible conversation in the UI, but only
 * the latest question is sent, matching what the backend actually accepts.
 */

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL

export async function sendChatMessage(question) {
  if (!CHAT_API_URL) {
    throw new Error('CHAT_API_NOT_CONFIGURED')
  }

  const response = await fetch(CHAT_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  })

  if (!response.ok) {
    throw new Error(`Chat request failed with status ${response.status}`)
  }

  const data = await response.json()

  if (typeof data.answer !== 'string') {
    throw new Error('Unexpected response shape from chat backend')
  }

  return data.answer
}
