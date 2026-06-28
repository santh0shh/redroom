import { useEffect, useRef } from 'react'
import { FAKE_PAYMENT_USERS, TIP_AMOUNTS } from '../constants/payments'

export const FAKE_USERS = [
  'void_walker', 'crimson_eye', 'anon_7734', 'night_owl', 'red_veil',
  'ghost_signal', 'cipher_x', 'dark_pulse', 'null_user', 'specter_09',
  'echo_room', 'shade_protocol', 'locked_in', 'watcher_42', 'deep_red',
  '0x_nemesis', 'rootshade', 'ciphercrow', 'ghostkernel', 'blackrelay',
  'nulloperator', 'deadswitch', 'voidmarket', 'specterroot', 'darkpacket',
  'redsector', 'silentexploit', 'phantomproxy', 'cryptshade', 'nightdaemon',
  'deepnode', 'echozero', 'shadowkernel', 'grimrelay', 'blackcipher',
  'dead_drop', 'tor_revenant', 'hidden_vendor', 'oblivion_net', 'maskedroot',
  'zero_dayz', 'raven_proxy', 'black_harbor', 'cipher_drift', 'darkmatter_x',
  'ghostledger', 'silentmarket', 'midnight_node', 'nullvector', 'deep_archive',
  'shadewalker', 'spectral_wire', 'crimsonnode', 'forgotten_root', 'darkcarrier',
  'ironphantom', 'veilrunner', 'ghostmerchant', 'shadowbroker', 'cryptnomad',
  'blackout404', 'zerotrace_x', 'echo_relic', 'nightrelay', 'voidcartel',
  'darkforge', 'phantomgrid', 'ciphervault', 'ghostroute', 'silentvoid',
  'blacksignal', 'nullshadow', 'cryptoracle', 'redcipher', 'deepwatch',
  'stormproxy', 'hiddenecho', 'voidkeeper', 'nightcrawler_x', 'grimvector',
  'echohunter', 'shadowcache', 'frostnode', 'darkrelic', 'spectralbyte',
  'ironcipher', 'blackphantom', 'veilcipher', 'obscure_root', 'deaddns',
  'ghostarchive', 'crypticvoid', 'ravenroot', 'shadowvendor'
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

const CHAT_COUNT = Math.max(FAKE_USERS.length, FAKE_MESSAGES.length)

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
      const text = FAKE_MESSAGES[i%FAKE_MESSAGES.length]
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
              text: `${amount}`,
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
