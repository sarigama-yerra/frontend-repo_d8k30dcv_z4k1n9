import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const messagesScript = [
  { role: 'user', text: 'Hi, can you help me book a consultation for next Tuesday afternoon?' },
  { role: 'agent', text: 'Absolutely! I can handle that. Do you prefer 2:00 PM or 3:30 PM?' },
  { role: 'user', text: '3:30 PM works.' },
  { role: 'agent', text: 'Great. Booking you for Tuesday at 3:30 PM. Would you like a calendar invite and SMS reminder?' },
  { role: 'user', text: 'Yes, both please.' },
  { role: 'agent', text: 'Done. Invite sent and SMS reminder set for 2 hours before. Anything else I can help with?' },
]

function useTypewriter(text, speed = 25, start = true) {
  const [output, setOutput] = useState('')
  const indexRef = useRef(0)

  useEffect(() => {
    if (!start) return
    setOutput('')
    indexRef.current = 0
    const id = setInterval(() => {
      setOutput((prev) => {
        const next = text.slice(0, indexRef.current + 1)
        indexRef.current += 1
        if (indexRef.current >= text.length) {
          clearInterval(id)
        }
        return next
      })
    }, speed)
    return () => clearInterval(id)
  }, [text, speed, start])

  return output
}

export default function ChatMock() {
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState(false)
  const containerRef = useRef(null)

  const isAgent = messagesScript[step]?.role === 'agent'
  const visibleMessages = useMemo(() => messagesScript.slice(0, step), [step])
  const currentText = messagesScript[step]?.text || ''
  const typed = useTypewriter(currentText, 18, typing)

  useEffect(() => {
    let timers = []
    const run = async () => {
      if (step >= messagesScript.length) return
      // Delay before message
      timers.push(setTimeout(() => {
        setTyping(true)
      }, isAgent ? 400 : 250))
      // Estimate typing duration
      const ms = Math.min(2200, Math.max(700, currentText.length * 35))
      timers.push(setTimeout(() => {
        setTyping(false)
        setStep((s) => s + 1)
      }, (isAgent ? 700 : 400) + ms))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [step])

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.scrollTop = containerRef.current.scrollHeight
  }, [step, typed])

  return (
    <div className="w-full max-w-md rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <div className="ml-auto text-xs text-white/60">AI Agent</div>
      </div>

      <div ref={containerRef} className="h-80 overflow-auto px-4 py-4 space-y-3">
        {visibleMessages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`max-w-[85%] ${m.role === 'agent' ? 'self-start' : 'self-end ml-auto'}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl text-sm shadow-lg ${
                m.role === 'agent'
                  ? 'bg-white/10 text-white border border-white/10'
                  : 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white'
              }`}
            >
              {m.text}
            </div>
          </motion.div>
        ))}

        {step < messagesScript.length && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[85%] ${isAgent ? 'self-start' : 'self-end ml-auto'}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl text-sm shadow-lg relative ${
                isAgent
                  ? 'bg-white/10 text-white border border-white/10'
                  : 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white'
              }`}
            >
              <span>{typed}</span>
              {typing && (
                <span className="inline-block w-1 h-4 align-[-2px] bg-white/80 ml-0.5 animate-caret" />
              )}
            </div>
          </motion.div>
        )}
      </div>

      <div className="px-4 py-3 border-t border-white/10 flex items-center gap-2">
        <input
          disabled
          placeholder="Type a message..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 outline-none"
        />
        <button className="px-3 py-2 text-sm rounded-lg bg-gradient-to-r from-fuchsia-500 to-blue-500 text-white font-medium shadow-[0_0_20px_0_rgba(99,102,241,0.35)] hover:shadow-[0_0_32px_0_rgba(99,102,241,0.55)] active:scale-95 transition-all">
          Deploy Now
        </button>
      </div>
    </div>
  )
}
