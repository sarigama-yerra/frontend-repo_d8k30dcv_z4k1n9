import React from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import ChatMock from './components/ChatMock'

function GlowButton({ children, variant = 'primary', onClick }) {
  const base = 'relative inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 active:scale-95'
  const primary = 'bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-500 text-white shadow-[0_0_40px_-10px_rgba(59,130,246,0.7)] hover:shadow-[0_0_60px_-8px_rgba(59,130,246,0.9)]'
  const secondary = 'bg-transparent text-white border border-white/30 hover:border-white/60 backdrop-blur-md'
  return (
    <button onClick={onClick} className={`${base} ${variant === 'primary' ? primary : secondary}`}>
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-[radial-gradient(1200px_800px_at_50%_-10%,rgba(99,102,241,0.25),transparent_60%),radial-gradient(900px_600px_at_90%_20%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(1000px_700px_at_10%_30%,rgba(147,51,234,0.18),transparent_55%),linear-gradient(180deg,#07091A,#0A0B1E_40%,#090814)]">
      <div className="absolute inset-0 pointer-events-none">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 pt-28 pb-24 md:pt-32 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-extrabold leading-tight mb-5 bg-gradient-to-r from-fuchsia-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% 200%', animation: 'gradientShift 8s ease infinite' }}
              >
                Automate Your Business with AI Agents
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-lg md:text-xl text-white/80 max-w-xl"
              >
                Deploy custom AI agents to handle customer service, lead generation, scheduling, invoicing, and more. No code required.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-8 flex flex-col sm:flex-row gap-4"
              >
                <GlowButton>Build Your First Agent</GlowButton>
                <GlowButton variant="secondary">Watch Demo</GlowButton>
              </motion.div>

              <div className="mt-8 text-white/80 max-w-lg">
                <p className="mb-3">Launch powerful automations in hours, not months.</p>
                <ul className="space-y-2">
                  {[
                    'Deploy in minutes',
                    'No coding skills needed',
                    'Save 20+ hours/week',
                  ].map((item, idx) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + idx * 0.15, duration: 0.5 }}
                      className="flex items-center gap-3"
                    >
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.7)]" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-fuchsia-500/10 via-indigo-500/10 to-sky-500/10 rounded-[28px] blur-xl pointer-events-none" />
              <ChatMock />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0" aria-hidden>
        <div className="absolute inset-0 opacity-40 animate-[bgPulse_10s_linear_infinite]" />
      </div>
    </div>
  )
}
