import { useEffect, useRef } from 'react'
import { FAKE_PAYMENT_USERS, TIP_AMOUNTS } from '../constants/payments'

const FAKE_USERS = [
  'void_walker', 'crimson_eye', 'anon_7734', 'night_owl', 'red_veil',
  'ghost_signal', 'cipher_x', 'dark_pulse', 'null_user', 'specter_09',
  'echo_room', 'shade_protocol', 'locked_in', 'watcher_42', 'deep_red',
]

const FAKE_MESSAGES = [
  'anyone else seeing lag?',
  'how long has this been running',
  'signal quality is insane',
  'we need more blood',
  'staying until the end',
  'hit him hard',
  'this is the best room ever',
  'who else need more violence?',
  'i want to see more',
  'this room never disappoints',
  'make him suffer',
  'i cant hear screams',
  'red room never sleeps',
  'i love this room',
  'premium access was worth it',
]

const CHAT_COUNT = Math.min(FAKE_USERS.length, FAKE_MESSAGES.length)

export function useFakeChat(setMessages) {
  const chatIndex = useRef(0)
  const payUserIndex = useRef(0)
  const tipIndex = useRef(0)
  const msgId = useRef(0)
  const ticksSincePayment = useRef(0)

  useEffect(() => {
    let cancelled = false
    let timeoutId = null

    const nextId = (prefix) => {
      msgId.current += 1
      return `${prefix}-${msgId.current}`
    }

    const getNextChat = () => {
      const i = chatIndex.current
      const user = FAKE_USERS[i]
      const text = FAKE_MESSAGES[i]
      chatIndex.current = (i + 1) % CHAT_COUNT
      return { user, text }
    }

    const getNextPayment = () => {
      const user = FAKE_PAYMENT_USERS[payUserIndex.current % FAKE_PAYMENT_USERS.length]
      const amount = TIP_AMOUNTS[tipIndex.current % TIP_AMOUNTS.length]
      payUserIndex.current += 1
      tipIndex.current += 1
      return { user, amount }
    }

    const tick = () => {
      if (cancelled) return

      const delay = 2500 + Math.random() * 7000
      timeoutId = setTimeout(() => {
        if (cancelled) return

        ticksSincePayment.current += 1
        const canPay = ticksSincePayment.current >= 2
        const isPayment = canPay && Math.random() < 0.28

        if (isPayment) {
          ticksSincePayment.current = 0
          const { user, amount } = getNextPayment()
          setMessages((prev) => [
            ...prev,
            {
              id: nextId('pay'),
              user,
              text: `tipped $${amount}`,
              amount,
              isPayment: true,
              createdAt: Date.now(),
            },
          ])
        } else {
          const { user, text } = getNextChat()
          setMessages((prev) => [
            ...prev,
            {
              id: nextId('chat'),
              user,
              text,
              createdAt: Date.now(),
            },
          ])
        }

        tick()
      }, delay)
    }

    tick()

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [setMessages])
}
