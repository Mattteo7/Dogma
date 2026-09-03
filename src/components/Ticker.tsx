type Props = {
  messages: string[]
  bars?: boolean
}

export default function Ticker({ messages, bars = true }: Props) {
  return (
    <div className="relative">
      {bars && <span className="absolute top-0 z-20 h-0.5 w-full bg-zinc-100" />}
      {bars && <span className="absolute bottom-0 z-20 h-0.5 w-full bg-zinc-100" />}
        <div className="overflow-hidden bg-zinc-950 py-2.5">
          <div className="ticker-track">
            {[...messages, ...messages].map((msg, i) => (
              <span key={i} className="ticker-item text-xs">
                {msg}
              </span>
            ))}
          </div>
        </div>
    </div>
  )
}