

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL

export async function sendChatMessage(question, onChunk) {
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

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    onChunk(decoder.decode(value, { stream: true }))
  }
}
