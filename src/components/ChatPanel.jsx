import { useEffect, useRef, useState } from 'react'
import { TIP_AMOUNTS } from '../constants/payments'
import { formatTimeAgo, getNextTimeBoundary } from '../utils/timeAgo'
import brics from '../assets/brics.png'

function ChatMessage({ msg, now }) {
  if (msg.isSystem) {
    return (
      <p className="text-center text-[10px] italic text-red-600/50">{msg.text}</p>
    )
  }

  if (msg.isPayment) {
    return (
      <div className="border-l border-amber-700/40 pl-2">
        <span className="font-semibold text-amber-400/80">{msg.user}</span>
        <span className="ml-1.5 text-[10px] text-red-800/60">
          {formatTimeAgo(msg.createdAt, now)}
        </span>
        <div className='flex items-center'>
          <img className='h-[12px] w-[14px]' src={brics} alt="brics" />
          <p className="mt-0.5 text-amber-200/75">&nbsp; x{msg.text}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <span className={`font-semibold ${msg.isOwn ? 'text-red-500' : 'text-red-500/80'}`}>
        {msg.user}
      </span>
      <span className="ml-1.5 text-[10px] text-red-800/60">
        {formatTimeAgo(msg.createdAt, now)}
      </span>
      <p className="mt-0.5 text-red-200/70">{msg.text}</p>
    </>
  )
}

export default function ChatPanel({ overlay = false, messages, setMessages }) {
  const [input, setInput] = useState('')
  const [showPay, setShowPay] = useState(false)
  const [now, setNow] = useState(() => Date.now())
  const listRef = useRef(null)

  useEffect(() => {
    const boundaries = messages
      .filter((m) => m.createdAt && !m.isSystem)
      .map((m) => getNextTimeBoundary(m.createdAt, Date.now()))
      .filter(Boolean)
      .sort((a, b) => a - b)

    if (boundaries.length === 0) return undefined

    const delay = Math.max(0, boundaries[0] - Date.now())
    const timeout = setTimeout(() => setNow(Date.now()), delay)
    return () => clearTimeout(timeout)
  }, [messages, now])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    const fakeMessages = [
      { delay: 3000, user: 'hruday', text: 'Remove his nail' },
      { delay: 15000, user: 'mike', text: 'Nice content' },
      { delay: 60000, user: 'sarah', text: 'Jejus' },
    ]
  
    const timers = fakeMessages.map((msg) =>
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            user: msg.user,
            text: msg.text,
            createdAt: Date.now(),
          },
        ])
      }, msg.delay)
    )
  
    return () => timers.forEach(clearTimeout)
  }, [])

  const handleSend = (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        user: 'you',
        text: trimmed,
        createdAt: Date.now(),
        isOwn: true,
      },
    ])
    setInput('')
  }

  const handlePay = (amount) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        user: 'you',
        text: `${amount}`,
        amount,
        isPayment: true,
        isOwn: true,
        createdAt: Date.now(),
      },
    ])
    setShowPay(false)
  }

  const wrapperClass = overlay
    ? 'pointer-events-auto h-full absolute top-0 right-0 z-20 flex w-80 flex-col rounded-lg border border-red-900/30 bg-black/60 backdrop-blur-sm'
    : 'flex h-full w-72 shrink-0 flex-col border-l border-red-900/40 bg-gradient-to-b from-[#120202] to-[#0a0000]'

  const headerClass = overlay
    ? 'border-b border-red-900/20 px-3 py-2'
    : 'border-b border-red-900/30 px-4 py-4'

  return (
    <div className={wrapperClass} style={overlay ? { opacity: 0.6 } : undefined}>
      <div className={headerClass}>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-red-400">
          Live Chat
        </h2>
      </div>

      <div
        ref={listRef}
        className={`flex-1 space-y-2 overflow-y-auto px-3 ${overlay ? 'py-2' : 'py-3'}`}
      >
        {messages.map((msg) => (
          <div key={msg.id} className="text-xs leading-relaxed">
            <ChatMessage msg={msg} now={now} />
          </div>
        ))}
      </div>

      {showPay && (
        <div className={`border-t border-amber-900/30 bg-amber-950/20 ${overlay ? 'p-2' : 'p-3'}`}>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-amber-400">
            Send Tip
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {TIP_AMOUNTS.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handlePay(amount)}
                className="rounded border border-amber-600/40 bg-amber-950/40 py-1.5 text-xs font-bold text-amber-300 transition hover:border-amber-400 hover:bg-amber-900/40 hover:text-amber-200"
              >
                ${amount}
              </button>
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSend}
        className={`border-t border-red-900/30 ${overlay ? 'p-2' : 'p-3'}`}
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..."
            className="flex-1 rounded border border-red-900/40 bg-black/50 px-2.5 py-1.5 text-xs text-red-100 placeholder-red-800/50 outline-none focus:border-red-700/60"
          />
          <button
            type="button"
            onClick={() => setShowPay((v) => !v)}
            className={`shrink-0 rounded border px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition ${
              showPay
                ? 'border-amber-400 bg-amber-950/60 text-amber-300'
                : 'border-amber-700/50 bg-amber-950/30 text-amber-400 hover:border-amber-500 hover:text-amber-300'
            }`}
          >
            Pay
          </button>
          <button
            type="submit"
            className="shrink-0 rounded border border-red-800/50 bg-red-950/50 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-red-400 transition hover:border-red-600 hover:text-red-300"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
