import { useNavigate } from 'react-router-dom'
import { Lock, Star } from 'lucide-react'

export default function SubscriptionGate({ feature = 'fitur ini' }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mb-4">
        <Lock size={36} className="text-[#F4B942]" />
      </div>
      <h2 className="text-xl font-bold text-[#1A2F5E] mb-2">Fitur Premium</h2>
      <p className="text-slate-500 text-sm mb-6 leading-relaxed">
        Akses ke {feature} tersedia khusus untuk <strong>Active Subscriber</strong>.
        Upgrade sekarang hanya IDR 20.000/bulan.
      </p>
      <div className="bg-gradient-to-br from-[#1A2F5E] to-[#2d4a8a] rounded-2xl p-5 w-full max-w-xs text-left text-white mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Star size={18} className="text-[#F4B942]" fill="#F4B942" />
          <span className="font-semibold text-sm">Premium Membership</span>
        </div>
        <ul className="space-y-2 text-sm text-slate-200">
          <li>✓ UK Mentor Directory</li>
          <li>✓ Vault of Successful Essays</li>
          <li>✓ Monthly Live Webinars</li>
          <li>✓ Sesi 1-on-1 Booking</li>
        </ul>
        <p className="mt-3 text-[#F4B942] font-bold text-lg">IDR 20.000 <span className="text-sm font-normal text-slate-300">/bulan</span></p>
      </div>
      <button
        onClick={() => navigate('/profile')}
        className="w-full max-w-xs bg-[#F4B942] text-[#1A2F5E] font-bold py-3 rounded-xl"
      >
        Subscribe Sekarang
      </button>
    </div>
  )
}
