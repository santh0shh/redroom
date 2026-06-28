import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PremiumPanel from '../components/PremiumPanel'
import StreamPlayer from '../components/StreamPlayer'
import ChatPanel from '../components/ChatPanel'
import { useFakeChat } from '../hooks/useFakeChat'
import { minutesAgo, secondsAgo } from '../utils/timeAgo'

function createInitialMessages() {
  return [
    {
      id: 'welcome',
      user: 'system',
      text: 'Welcome to the room.',
      isSystem: true,
    },
    {
      id: crypto.randomUUID(),
      user: 'null_byte',
      text: 'begin the violence',
      createdAt: minutesAgo(3),
    },
    {
      id: crypto.randomUUID(),
      user: 'echo_exploit',
      text: 'Hit him badly',
      createdAt: minutesAgo(2),
    },
    {
      id: crypto.randomUUID(),
      user: 'hex_override',
      text: 'Make more blood',
      createdAt: secondsAgo(30),
    },
  ]
}

function Main() {
  const [messages, setMessages] = useState(createInitialMessages)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/alert");
    }, 2*60*1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  useFakeChat(setMessages)

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-black">
      <header className="flex shrink-0 items-center justify-between border-b border-red-900/40 bg-[#0d0000] px-6 py-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-4xl font-semibold tracking-[5px] text-[#d7071d]">RED ROOM</h1>
          </div>
        </div>
        <button
          type="button"
          className="rounded border border-[#d7071d]/60 bg-[#d7071d]/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[#d7071d] transition hover:border-[#d7071d] hover:bg-[#d7071d]/20 cursor-pointer"
        >
          Join Room
        </button>
      </header>

      <div className="flex min-h-0 flex-1">
        {!isFullscreen && <PremiumPanel />}
        <StreamPlayer
          isFullscreen={isFullscreen}
          onFullscreenChange={setIsFullscreen}
          chatOverlay={
            isFullscreen ? (
              <ChatPanel overlay messages={messages} setMessages={setMessages} />
            ) : null
          }
        />
        {!isFullscreen && <ChatPanel messages={messages} setMessages={setMessages} />}
      </div>
    </div>
  )
}

export default Main
