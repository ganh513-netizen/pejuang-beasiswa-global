import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { WEBINARS } from '../data/webinars'
import StatusBadge from '../components/StatusBadge'
import { Star, Calendar, ExternalLink, ChevronRight } from 'lucide-react'

// ← Replace this with your real Midtrans/Xendit link
const SUBSCRIPTION_PAYMENT_LINK = 'https://your-payment-link.com/subscribe'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function Home() {
  const { currentUser, isPremium } = useApp()
  const navigate = useNavigate()
  const upcoming = WEBINARS.filter(w => !w.recordingLink && new Date(w.dateTime) > new Date())
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
    .slice(0, 2)

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#1A2F5E] px-5 pt-12 pb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-300 text-sm">Selamat datang 👋</p>
            <h1 className="text-white font-bold text-xl mt-0.5">{currentUser?.fullName}</h1>
          </div>
          <StatusBadge status={currentUser?.subscriptionStatus} />
        </div>

        {/* Subscription expiry */}
        {isPremium && currentUser?.subscriptionExpiry && (
          <p className="text-slate-400 text-xs mt-2">
            Aktif hingga {new Date(currentUser.subscriptionExpiry).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })}
          </p>
        )}
      </div>

      <div className="px-4 -mt-4 space-y-4">
        {/* Premium upsell card for free users */}
        {!isPremium && (
          <div className="bg-gradient-to-br from-[#1A2F5E] to-[#2d4a8a] rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Star size={18} className="text-[#F4B942]" fill="#F4B942" />
              <span className="text-white font-bold text-sm">Premium Membership</span>
              <span className="ml-auto bg-[#F4B942] text-[#1A2F5E] text-xs font-bold px-2 py-0.5 rounded-full">
                IDR 20.000/bln
              </span>
            </div>
            <ul className="space-y-1.5 text-sm text-slate-200 mb-4">
              <li>✓ UK Mentor Directory & 1-on-1 Booking</li>
              <li>✓ Vault of Successful Essays</li>
              <li>✓ Monthly Live Webinars Eksklusif</li>
            </ul>
            <a
              href={SUBSCRIPTION_PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#F4B942] text-[#1A2F5E] font-bold py-3 rounded-xl text-sm"
            >
              <ExternalLink size={15} />
              Subscribe Sekarang
            </a>
          </div>
        )}

        {/* Premium welcome banner */}
        {isPremium && (
          <div className="bg-gradient-to-br from-[#F4B942] to-[#e0a030] rounded-2xl p-5 shadow">
            <div className="flex items-center gap-2">
              <Star size={20} className="text-[#1A2F5E]" fill="#1A2F5E" />
              <span className="text-[#1A2F5E] font-bold">Active Subscriber</span>
            </div>
            <p className="text-[#1A2F5E] text-sm mt-1 opacity-80">
              Semua fitur premium aktif. Yuk mulai sesi bersama mentor pilihanmu!
            </p>
            <button
              onClick={() => navigate('/mentors')}
              className="mt-3 bg-[#1A2F5E] text-white text-sm font-bold px-4 py-2 rounded-lg"
            >
              Temukan Mentor →
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Cari Mentor', icon: '🧑‍🏫', path: '/mentors', premium: true },
            { label: 'Essay Vault', icon: '📄', path: '/resources', premium: true },
            { label: 'My Booking', icon: '📅', path: '/bookings', premium: false },
          ].map(item => (
            <button key={item.label}
              onClick={() => navigate(item.path)}
              className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm border border-slate-100 active:scale-95 transition-transform relative">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-semibold text-[#1A2F5E] text-center">{item.label}</span>
              {item.premium && !isPremium && (
                <span className="absolute top-1.5 right-1.5 text-xs">🔒</span>
              )}
            </button>
          ))}
        </div>

        {/* Upcoming Webinars */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-[#1A2F5E] text-base">Webinar Mendatang</h2>
            <button onClick={() => navigate('/resources')}
              className="text-xs text-slate-400 flex items-center gap-0.5">
              Semua <ChevronRight size={14} />
            </button>
          </div>
          {upcoming.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4">Tidak ada webinar mendatang.</p>
          ) : (
            <div className="space-y-3">
              {upcoming.map(w => (
                <div key={w.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#1A2F5E]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar size={18} className="text-[#1A2F5E]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[#1A2F5E] text-sm leading-tight">{w.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{formatDate(w.dateTime)}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{w.speaker}</p>
                    </div>
                  </div>
                  {isPremium && (
                    <a href={w.zoomLink} target="_blank" rel="noopener noreferrer"
                      className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#1A2F5E] bg-[#1A2F5E]/5 py-2 rounded-lg w-full">
                      <ExternalLink size={12} /> Daftar / Join
                    </a>
                  )}
                  {!isPremium && (
                    <div className="mt-3 bg-slate-50 py-2 rounded-lg text-center">
                      <span className="text-xs text-slate-400">🔒 Khusus Premium</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
