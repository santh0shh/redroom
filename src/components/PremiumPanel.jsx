const trialPerks = [
  { label: 'One stream only', active: true },
  { label: 'This session preview', active: true },
  { label: 'Basic live chat', active: true },
]

const memberPerks = [
  { label: 'All Red Room streams'},
  { label: 'Unlimited watch sessions'},
  { label: 'Member chat access'},
  { label: 'Part of the Red Room'},
]

export default function PremiumPanel() {

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-red-900/40 bg-gradient-to-b from-[#120202] to-[#0a0000]">
      <div className="border-b border-red-900/30 px-4 py-5">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-red-400">
            Note:
          </h2>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-red-300/60">
          This free trial lets you watch{' '}
          <span className="font-semibold text-red-200">one stream only</span>. You must 
          subscribe to watch all further streams, and
          become part of the Red Room.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-4 rounded-lg border border-red-800/30 bg-red-950/20 p-3">
          <p className="text-[10px] uppercase tracking-wider text-red-500/70">Current plan</p>
          <p className="mt-1 text-sm font-medium text-red-300">Free Trial</p>
        </div>

        {/* <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-red-500/60">
          Free trial
        </p>
        <ul className="mb-5 space-y-1.5">
          {trialPerks.map((perk) => (
            <li
              key={perk.label}
              className="flex items-center gap-2 rounded px-2 py-1 text-xs text-red-200/70"
            >
              <span className="text-red-500">◆</span>
              {perk.label}
            </li>
          ))}
        </ul> */}

        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-red-500/60">
          Subscribe to unlock
        </p>
        <ul className="space-y-1.5">
          {memberPerks.map((perk) => (
            <li
              key={perk.label}
              className="flex items-center gap-2 rounded px-2 py-1 text-xs text-red-200/70"
            >
              <span className="text-red-500">◆</span>
              {perk.label}
            </li>
          ))}
        </ul>

      </div>

      <div className="border-t border-red-900/30 p-4">
        <p className="mb-2.5 text-center text-[10px] leading-relaxed text-red-500/40">
          Trial ends soon — upgrade to continue
        </p>
        <button
          type="button"
          className="w-full rounded border border-[#d7071d]/60 bg-[#d7071d]/15 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#d7071d] transition hover:border-[#d7071d] hover:bg-[#d7071d]/25 cursor-pointer"
        >
          Get Paid Access
        </button>
      </div>
    </aside>
  )
}
