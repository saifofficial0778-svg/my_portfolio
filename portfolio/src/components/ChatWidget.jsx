import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react'
import { sendChatMessage } from '../lib/chatApi'

const GREETING = {
  role: 'assistant',
  content: "Hi! Ask me anything about Mohd Saif's projects, skills, or experience.",
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const inputRef = useRef(null)
  const endRef = useRef(null)

  // Scroll to the latest message whenever the list changes.
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' })
  }, [messages, isLoading, shouldReduceMotion])

  // Focus the input when the panel opens; close on Escape.
  useEffect(() => {
    if (!isOpen) return
    inputRef.current?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || isLoading) return

    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setInput('')
    setIsLoading(true)

    try {
      // The backend only accepts the current question (see chatApi.js) —
      // it has no server-side memory of earlier turns.
      const answer = await sendChatMessage(text)
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }])
    } catch (err) {
      const notConfigured = err.message === 'CHAT_API_NOT_CONFIGURED'
      setMessages((prev) => [
        ...prev,
        {
          role: 'error',
          content: notConfigured
            ? "This chatbot isn't connected to a backend yet — set VITE_CHAT_API_URL in .env."
            : "Something went wrong reaching the chatbot. Make sure the backend is running and reachable.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating action button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
        aria-controls="chat-panel"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-glow transition-transform duration-200 hover:scale-105"
        style={{ background: 'linear-gradient(135deg, var(--color-violet), var(--color-cyan-soft))' }}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-panel"
            role="dialog"
            aria-modal="false"
            aria-label="Chat with Mohd Saif's portfolio assistant"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 flex h-[70vh] max-h-[560px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-2xl border shadow-2xl"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between gap-3 border-b px-4 py-3.5"
              style={{ borderColor: 'var(--color-border-soft)' }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: 'linear-gradient(135deg, var(--color-violet), var(--color-cyan-soft))' }}
                >
                  <Bot size={16} className="text-white" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>
                    Portfolio Assistant
                  </p>
                  <p className="text-xs text-muted">Ask about my work</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200"
                style={{ color: 'var(--color-ink-muted)' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === 'user'
                      ? 'chat-bubble-user'
                      : m.role === 'error'
                        ? 'chat-bubble-error'
                        : 'chat-bubble-bot'
                  }
                >
                  {m.content}
                </div>
              ))}
              {isLoading && (
                <div className="chat-bubble-bot flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  <span>Thinking…</span>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t p-3" style={{ borderColor: 'var(--color-border-soft)' }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
                placeholder="Type a message…"
                rows={1}
                className="chat-input"
                aria-label="Message"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white transition-opacity duration-200 disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, var(--color-violet), var(--color-cyan-soft))' }}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
