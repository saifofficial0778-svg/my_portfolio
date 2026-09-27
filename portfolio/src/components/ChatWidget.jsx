import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useDragControls, useReducedMotion } from 'framer-motion'
import { Bot, X, Send, Loader2, GripHorizontal } from 'lucide-react'
import { sendChatMessage } from '../lib/chatApi'

const GREETING = {
  role: 'assistant',
  content: "Hi! Ask me anything about Mohd Saif's projects, skills, or experience.",
}

const HINT_DISMISSED_KEY = 'chatWidgetHintDismissed'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const dragControls = useDragControls()

  const inputRef = useRef(null)
  const endRef = useRef(null)
  const constraintsRef = useRef(null)

  // Show the "Ask AI about me" hint once, a beat after the page loads,
  // unless the person has already dismissed it before (remembered per browser).
  useEffect(() => {
    const dismissed = localStorage.getItem(HINT_DISMISSED_KEY)
    if (dismissed) return
    const timer = setTimeout(() => setShowHint(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  const dismissHint = () => {
    setShowHint(false)
    localStorage.setItem(HINT_DISMISSED_KEY, 'true')
  }

  const openChat = () => {
    setIsOpen(true)
    dismissHint()
  }

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

    setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

    try {
      await sendChatMessage(text, (chunk) => {
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            role: 'assistant',
            content: updated[updated.length - 1].content + chunk,
          }
          return updated
        })
      })
    } catch (err) {
      const notConfigured = err.message === 'CHAT_API_NOT_CONFIGURED'
      setMessages((prev) => [
        ...prev.slice(0, -1),
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
      {/* Invisible full-viewport boundary so the panel can be dragged
          anywhere on screen but never off it. */}
      <div ref={constraintsRef} aria-hidden="true" className="fixed inset-0 z-40 pointer-events-none" />

      {/* Floating action button + "Ask AI about me" hint */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <AnimatePresence>
          {showHint && !isOpen && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex items-center gap-2 rounded-full border pl-4 pr-2 py-2 text-sm shadow-lg"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <button
                onClick={openChat}
                className="font-medium whitespace-nowrap"
                style={{ color: 'var(--color-ink)' }}
              >
                Ask AI about me
              </button>
              <button
                onClick={dismissHint}
                aria-label="Dismiss"
                className="flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-200"
                style={{ color: 'var(--color-ink-faint)' }}
              >
                <X size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => (isOpen ? setIsOpen(false) : openChat())}
          aria-label={isOpen ? 'Close AI chatbot' : 'Open AI chatbot — ask about me'}
          aria-expanded={isOpen}
          aria-controls="chat-panel"
          title="Ask AI about me"
          className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-glow transition-transform duration-200 hover:scale-105"
          style={{ background: 'linear-gradient(135deg, var(--color-violet), var(--color-cyan-soft))' }}
        >
          {isOpen ? <X size={22} /> : <Bot size={24} />}
        </button>
      </div>

      {/* Chat panel — draggable by its header */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-panel"
            role="dialog"
            aria-modal="false"
            aria-label="AI chatbot — ask about Mohd Saif"
            drag
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={0.05}
            dragConstraints={constraintsRef}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 flex h-[70vh] max-h-[560px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-2xl border shadow-2xl"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            {/* Header — drag handle */}
            <div
              className="flex items-center justify-between gap-3 border-b px-4 py-3.5"
              style={{ borderColor: 'var(--color-border-soft)' }}
            >
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="flex items-center gap-2.5 cursor-grab active:cursor-grabbing touch-none select-none"
                title="Drag to move"
              >
                <GripHorizontal size={14} style={{ color: 'var(--color-ink-faint)' }} />
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: 'linear-gradient(135deg, var(--color-violet), var(--color-cyan-soft))' }}
                >
                  <Bot size={16} className="text-white" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>
                    AI Assistant
                  </p>
                  <p className="text-xs text-muted">Ask about my work</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200"
                style={{ color: 'var(--color-ink-muted)' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => {
                const isLastEmptyAssistant =
                  m.role === 'assistant' && m.content === '' && i === messages.length - 1

                return (
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
                    {isLastEmptyAssistant ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={14} className="animate-spin" />
                        <span>Thinking…</span>
                      </span>
                    ) : (
                      m.content
                    )}
                  </div>
                )
              })}
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