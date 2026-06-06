import { useNavigate } from 'react-router-dom'

export default function SubscriptionGate({ feature = 'fitur ini' }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center fade-in"
      style={{ background: 'linear-gradient(160deg, #0A0F1E 0%, #0A1628 100%)' }}>

      {/* Lock emblem */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            boxShadow: '0 0 40px rgba(201,168,76,0.1)',
          }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="8" y="18" width="24" height="18" rx="4"
              fill="url(#lockGold)" stroke="rgba(201,168,76,0.5)" strokeWidth="1"/>
            <path d="M13 18V13a7 7 0 0114 0v5" stroke="url(#lockGold)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <circle cx="20" cy="27" r="2.5" fill="#0A1628"/>
            <defs>
              <linearGradient id="lockGold" x1="0" y1="0" x2="40" y2="40">
                <stop offset="0%" stopColor="#F0D080"/>
                <stop offset="100%" stopColor="#C9A84C"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        {/* Decorative ring */}
        <div className="absolute inset-0 rounded-full animate-ping opacity-10"
          style={{ border: '1px solid #C9A84C', animationDuration: '3s' }}/>
      </div>

      <h2 className="font-serif text-2xl font-bold text-white mb-2"
        style={{ fontFamily: 'Playfair Display, serif' }}>
        Fitur <span className="gold-text">Premium</span>
      </h2>
      <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-xs">
        Akses ke <strong className="text-slate-300">{feature}</strong> tersedia eksklusif untuk member Premium kami.
      </p>

      {/* Premium card */}
      <div className="w-full max-w-xs rounded-3xl p-5 mb-6"
        style={{
          background: 'linear-gradient(145deg, #0F1829, #111827)',
          border: '1px solid rgba(201,168,76,0.25)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <polygon points="8,0 10,5.5 16,5.5 11,9 13,15 8,11.5 3,15 5,9 0,5.5 6,5.5"
                fill="url(#starGold2)"/>
              <defs>
                <linearGradient id="starGold2" x1="0" y1="0" x2="16" y2="16">
                  <stop offset="0%" stopColor="#F0D080"/>
                  <stop offset="100%" stopColor="#C9A84C"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              Premium Membership
            </span>
          </div>
          <span className="text-xs font-bold px-2 py-1 rounded-full"
            style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}>
            EKSKLUSIF
          </span>
        </div>

        <ul className="space-y-2.5 mb-4">
          {[
            'UK Mentor Directory & Booking',
            'Vault of Successful Essays',
            'Monthly Live Webinars',
            '100% Escrow Safety Guarantee',
          ].map(item => (
            <li key={item} className="flex items-center gap-2.5">
              <span style={{ color: '#C9A84C' }}>✦</span>
              <span className="text-sm text-slate-300">{item}</span>
            </li>
          ))}
        </ul>

        <div className="h-px w-full mb-4"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }}/>

        <div className="text-center">
          <span className="gold-text font-serif text-2xl font-bold"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            IDR 20.000
          </span>
          <span className="text-slate-400 text-xs"> /bulan</span>
        </div>
      </div>

      <button onClick={() => navigate('/profile')}
        className="w-full max-w-xs gold-btn text-[#0A1628] font-bold py-4 rounded-2xl text-sm tracking-wide"
        style={{ fontFamily: 'Playfair Display, serif' }}>
        ✦ Upgrade ke Premium
      </button>
    </div>
  )
}
