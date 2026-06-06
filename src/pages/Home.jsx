import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { WEBINARS } from '../data/webinars'
import Logo from '../components/Logo'
import { ExternalLink, ChevronRight, Calendar, Users, BookOpen, CalendarCheck } from 'lucide-react'

const SUBSCRIPTION_PAYMENT_LINK = 'https://your-payment-link.com/subscribe'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export default function Home() {
  const { currentUser, isPremium } = useApp()
  const navigate = useNavigate()
  const upcoming = WEBINARS.filter(w => !w.recordingLink && new Date(w.dateTime) > new Date())
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)).slice(0, 2)

  return (
    <div className="pb-28 min-h-screen fade-in" style={{ background: 'linear-gradient(160deg, #0A0F1E 0%, #0A1628 60%, #0F1E3A 100%)' }}>

      {/* Header */}
      <div className="relative px-5 pt-12 pb-8 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

        <Logo size="sm" />

        <div className="mt-6">
          <p className="text-slate-400 text-sm font-light">Selamat datang kembali,</p>
          <h1 className="text-white font-bold text-2xl mt-1 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            {currentUser?.fullName}
          </h1>

          {/* Status pill */}
          <div className="flex items-center gap-2 mt-3">
            {isPremium ? (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)' }}>
                <svg width="10" height="10" viewBox="0 0 16 16">
                  <polygon points="8,0 10,5.5 16,5.5 11,9 13,15 8,11.5 3,15 5,9 0,5.5 6,5.5" fill="#C9A84C"/>
                </svg>
                <span className="text-xs font-semibold" style={{ color: '#C9A84C' }}>Active Subscriber</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                style={{ background: 'rgba(100,116,139,0.1)', border: '1px solid rgba(100,116,139,0.2)' }}>
                <span className="text-xs text-slate-400">Free User</span>
              </div>
            )}
            {isPremium && currentUser?.subscriptionExpiry && (
              <span className="text-xs text-slate-500">
                Aktif hingga {new Date(currentUser.subscriptionExpiry).toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' })}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Divider ornament */}
      <div className="flex items-center px-5 mb-5">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.3), transparent)' }}/>
        <div className="mx-3">
          <svg width="8" height="8" viewBox="0 0 8 8"><polygon points="4,0 5,3 8,3 5.5,4.8 6.5,8 4,6 1.5,8 2.5,4.8 0,3 3,3" fill="#C9A84C" opacity="0.6"/></svg>
        </div>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3))' }}/>
      </div>

      <div className="px-4 space-y-5">
        {/* Premium upsell */}
        {!isPremium && (
          <div className="rounded-3xl p-5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0F1829 0%, #1A2F5E 100%)',
              border: '1px solid rgba(201,168,76,0.25)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}>
            {/* Background ornament */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-5">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <polygon points="40,0 50,27.5 80,27.5 57,45 65,72 40,55 15,72 23,45 0,27.5 30,27.5" fill="#C9A84C"/>
              </svg>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <svg width="14" height="14" viewBox="0 0 16 16" className="mt-0.5 flex-shrink-0">
                <polygon points="8,0 10,5.5 16,5.5 11,9 13,15 8,11.5 3,15 5,9 0,5.5 6,5.5" fill="#C9A84C"/>
              </svg>
              <h3 className="text-white font-bold text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
                Premium Membership
              </h3>
              <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}>
                IDR 20K/bln
              </span>
            </div>
            <ul className="space-y-1.5 mb-4">
              {['UK Mentor Directory & 1-on-1 Booking','Vault of Successful Essays','Monthly Live Webinars Eksklusif'].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <span style={{ color: '#C9A84C' }}>✦</span> {item}
                </li>
              ))}
            </ul>
            <a href={SUBSCRIPTION_PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full gold-btn text-[#0A1628] font-bold py-3 rounded-2xl text-sm"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              <ExternalLink size={14} /> Subscribe Sekarang
            </a>
          </div>
        )}

        {/* Premium welcome */}
        {isPremium && (
          <div className="rounded-3xl p-5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)',
              boxShadow: '0 8px 32px rgba(201,168,76,0.3)',
            }}>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <polygon points="40,0 50,27.5 80,27.5 57,45 65,72 40,55 15,72 23,45 0,27.5 30,27.5" fill="#0A1628"/>
              </svg>
            </div>
            <p className="text-[#0A1628] font-bold text-base mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              ✦ Selamat Datang, Member Premium!
            </p>
            <p className="text-[#0A1628]/70 text-sm mb-3">Semua fitur eksklusif aktif untukmu.</p>
            <button onClick={() => navigate('/mentors')}
              className="navy-btn text-white text-sm font-bold px-5 py-2.5 rounded-xl">
              Temukan Mentor Terbaik →
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'rgba(201,168,76,0.6)', letterSpacing: '0.12em' }}>Navigasi Cepat</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Mentor Directory', icon: Users, path: '/mentors', premium: true, desc: '6 mentor aktif' },
              { label: 'Essay Vault', icon: BookOpen, path: '/resources', premium: true, desc: '4 essay tersedia' },
              { label: 'My Bookings', icon: CalendarCheck, path: '/bookings', premium: false, desc: 'Sesi saya' },
              { label: 'Webinars', icon: Calendar, path: '/resources', premium: true, desc: 'Sesi live' },
            ].map(item => (
              <button key={item.label} onClick={() => navigate(item.path)}
                className="relative text-left p-4 rounded-2xl active:scale-95 transition-all duration-200"
                style={{
                  background: 'linear-gradient(145deg, #0F1829, #111827)',
                  border: '1px solid rgba(201,168,76,0.12)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                }}>
                {item.premium && !isPremium && (
                  <span className="absolute top-2 right-2 text-xs" style={{ color: 'rgba(201,168,76,0.5)' }}>🔒</span>
                )}
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
                  <item.icon size={16} style={{ color: '#C9A84C' }} />
                </div>
                <p className="text-white text-sm font-semibold leading-tight">{item.label}</p>
                <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Webinars */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: 'rgba(201,168,76,0.6)', letterSpacing: '0.12em' }}>Webinar Mendatang</p>
            <button onClick={() => navigate('/resources')}
              className="flex items-center gap-1 text-xs" style={{ color: '#64748b' }}>
              Semua <ChevronRight size={13} />
            </button>
          </div>
          <div className="space-y-3">
            {upcoming.map(w => (
              <div key={w.id} className="p-4 rounded-2xl"
                style={{
                  background: 'linear-gradient(145deg, #0F1829, #111827)',
                  border: '1px solid rgba(201,168,76,0.12)',
                }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
                    <Calendar size={16} style={{ color: '#C9A84C' }} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white text-sm font-semibold leading-snug"
                      style={{ fontFamily: 'Playfair Display, serif' }}>{w.title}</h3>
                    <p className="text-xs mt-1" style={{ color: '#64748b' }}>{formatDate(w.dateTime)}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#C9A84C', opacity: 0.7 }}>{w.speaker}</p>
                  </div>
                </div>
                {isPremium && (
                  <a href={w.zoomLink} target="_blank" rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl w-full"
                    style={{ background: 'rgba(201,168,76,0.08)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.2)' }}>
                    <ExternalLink size={11} /> Daftar / Join
                  </a>
                )}
                {!isPremium && (
                  <div className="mt-3 py-2 rounded-xl text-center"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-xs" style={{ color: '#475569' }}>🔒 Khusus Premium Member</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer quote */}
        <div className="text-center py-4">
          <p className="font-elegant italic text-slate-600 text-sm"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            "Your dream scholarship is one mentor away."
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-8 h-px" style={{ background: 'rgba(201,168,76,0.3)' }}/>
            <svg width="6" height="6" viewBox="0 0 8 8"><polygon points="4,0 5,3 8,3 5.5,4.8 6.5,8 4,6 1.5,8 2.5,4.8 0,3 3,3" fill="#C9A84C" opacity="0.4"/></svg>
            <div className="w-8 h-px" style={{ background: 'rgba(201,168,76,0.3)' }}/>
          </div>
        </div>
      </div>
    </div>
  )
}
