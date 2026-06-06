export default function Logo({ size = 'md', dark = false }) {
  const sizes = {
    sm: { wrap: 'w-8 h-8', text: 'text-xs', sub: 'text-[8px]' },
    md: { wrap: 'w-12 h-12', text: 'text-sm', sub: 'text-[9px]' },
    lg: { wrap: 'w-16 h-16', text: 'text-base', sub: 'text-[10px]' },
    xl: { wrap: 'w-20 h-20', text: 'text-lg', sub: 'text-xs' },
  }
  const s = sizes[size]

  return (
    <div className="flex items-center gap-3">
      {/* Emblem */}
      <div className={`${s.wrap} relative flex-shrink-0`}>
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer ring */}
          <circle cx="40" cy="40" r="38" stroke="url(#goldGrad)" strokeWidth="1.5" fill="none"/>
          {/* Inner ring */}
          <circle cx="40" cy="40" r="32" stroke="url(#goldGrad)" strokeWidth="0.75" fill="none" opacity="0.5"/>
          {/* Shield background */}
          <path d="M40 12 L58 20 L58 42 C58 54 40 68 40 68 C40 68 22 54 22 42 L22 20 Z"
            fill="url(#shieldGrad)" stroke="url(#goldGrad)" strokeWidth="1"/>
          {/* Graduation cap */}
          <path d="M40 28 L52 34 L40 40 L28 34 Z" fill="url(#goldGrad2)"/>
          <rect x="47" y="34" width="1.5" height="8" fill="url(#goldGrad2)" rx="0.75"/>
          <path d="M28 34 L28 42 C28 42 34 46 40 46 C46 46 52 42 52 42 L52 34"
            fill="none" stroke="url(#goldGrad2)" strokeWidth="1.2"/>
          {/* Bottom ornament */}
          <path d="M32 58 Q40 62 48 58" stroke="url(#goldGrad)" strokeWidth="1" fill="none"/>
          {/* Stars */}
          <circle cx="30" cy="24" r="1" fill="#C9A84C" opacity="0.6"/>
          <circle cx="50" cy="24" r="1" fill="#C9A84C" opacity="0.6"/>
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C9A84C"/>
              <stop offset="50%" stopColor="#F0D080"/>
              <stop offset="100%" stopColor="#C9A84C"/>
            </linearGradient>
            <linearGradient id="goldGrad2" x1="28" y1="28" x2="52" y2="46" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F0D080"/>
              <stop offset="100%" stopColor="#C9A84C"/>
            </linearGradient>
            <linearGradient id="shieldGrad" x1="22" y1="12" x2="58" y2="68" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1A2F5E" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#0A1628" stopOpacity="0.95"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Wordmark */}
      <div>
        <div className={`font-serif font-bold ${s.text} tracking-wide leading-tight ${dark ? 'text-[#0A1628]' : 'text-white'}`}>
          Pejuang<span className="gold-text">Beasiswa</span>
        </div>
        <div className={`${s.sub} tracking-[0.15em] uppercase ${dark ? 'text-slate-500' : 'text-slate-400'} font-light`}>
          Global Mentoring
        </div>
      </div>
    </div>
  )
}
