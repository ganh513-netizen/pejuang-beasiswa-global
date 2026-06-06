import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Logo from '../components/Logo'
import { Mail, Phone, LogOut, ExternalLink, Edit3, Check, X, User } from 'lucide-react'

const SUBSCRIPTION_PAYMENT_LINK = 'https://your-payment-link.com/subscribe'

export default function Profile() {
  const { currentUser, isPremium, logout, updateUser } = useApp()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ fullName: currentUser?.fullName, whatsapp: currentUser?.whatsapp })

  function saveEdit() { updateUser({ fullName: form.fullName, whatsapp: form.whatsapp }); setEditing(false) }
  function cancelEdit() { setForm({ fullName: currentUser?.fullName, whatsapp: currentUser?.whatsapp }); setEditing(false) }

  return (
    <div className="pb-28 min-h-screen fade-in"
      style={{ background: 'linear-gradient(160deg, #0A0F1E 0%, #0A1628 100%)' }}>

      {/* Header */}
      <div className="px-5 pt-12 pb-6">
        <Logo size="sm" />
        <h1 className="text-white font-bold text-2xl mt-5"
          style={{ fontFamily: 'Playfair Display, serif' }}>Profil Saya</h1>
      </div>

      {/* Ornament */}
      <div className="flex items-center px-5 mb-5">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.3), transparent)' }}/>
      </div>

      <div className="px-4 space-y-4">
        {/* Profile card */}
        <div className="rounded-3xl p-5"
          style={{
            background: 'linear-gradient(145deg, #0F1829, #111827)',
            border: '1px solid rgba(201,168,76,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}>
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
                boxShadow: '0 4px 16px rgba(201,168,76,0.3)',
              }}>
              <span className="text-[#0A1628] text-2xl font-bold"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                {currentUser?.fullName?.charAt(0)?.toUpperCase()}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              {editing ? (
                <input value={form.fullName} onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))}
                  className="w-full rounded-xl px-3 py-2 text-sm font-semibold text-white outline-none"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(201,168,76,0.3)' }} />
              ) : (
                <h2 className="font-bold text-white text-lg leading-tight"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  {currentUser?.fullName}
                </h2>
              )}
              <p className="text-slate-400 text-xs mt-0.5">{currentUser?.email}</p>
              <div className="mt-2">
                {isPremium ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}>
                    ✦ Active Subscriber
                  </span>
                ) : (
                  <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(100,116,139,0.1)', color: '#64748b', border: '1px solid rgba(100,116,139,0.2)' }}>
                    Free User
                  </span>
                )}
              </div>
            </div>

            {/* Edit button */}
            {!editing ? (
              <button onClick={() => setEditing(true)}
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Edit3 size={15} className="text-slate-400" />
              </button>
            ) : (
              <div className="flex gap-1.5">
                <button onClick={saveEdit}
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <Check size={15} style={{ color: '#10b981' }} />
                </button>
                <button onClick={cancelEdit}
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <X size={15} style={{ color: '#ef4444' }} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info rows */}
        <div className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(201,168,76,0.12)', background: 'linear-gradient(145deg, #0F1829, #111827)' }}>
          <InfoRow icon={<Mail size={15} style={{ color: '#C9A84C' }} />} label="Email" value={currentUser?.email} />
          <div className="h-px mx-4" style={{ background: 'rgba(201,168,76,0.08)' }}/>
          <InfoRow icon={<Phone size={15} style={{ color: '#C9A84C' }} />} label="WhatsApp"
            value={editing
              ? <input value={form.whatsapp} onChange={e => setForm(p => ({ ...p, whatsapp: e.target.value }))}
                  className="text-sm text-white outline-none rounded-lg px-2 py-1 w-full"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.2)' }} />
              : currentUser?.whatsapp || '-'
            }
          />
          <div className="h-px mx-4" style={{ background: 'rgba(201,168,76,0.08)' }}/>
          <InfoRow icon={<User size={15} style={{ color: '#C9A84C' }} />} label="Role" value={currentUser?.role} />
        </div>

        {/* Subscription */}
        <div className="rounded-2xl p-4"
          style={{ background: 'linear-gradient(145deg, #0F1829, #111827)', border: '1px solid rgba(201,168,76,0.15)' }}>
          <p className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'rgba(201,168,76,0.6)', letterSpacing: '0.12em' }}>Status Berlangganan</p>
          <div className="flex items-center justify-between mb-3">
            {isPremium ? (
              <span className="text-sm font-bold" style={{ color: '#C9A84C' }}>✦ Active Subscriber</span>
            ) : (
              <span className="text-sm text-slate-400">Free User</span>
            )}
            {isPremium && currentUser?.subscriptionExpiry && (
              <span className="text-xs text-slate-500">
                Aktif hingga {new Date(currentUser.subscriptionExpiry).toLocaleDateString('id-ID')}
              </span>
            )}
          </div>

          {!isPremium && (
            <a href={SUBSCRIPTION_PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full gold-btn text-[#0A1628] font-bold py-3.5 rounded-xl text-sm"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              <ExternalLink size={14} /> ✦ Upgrade ke Premium — IDR 20.000/bln
            </a>
          )}
          {isPremium && (
            <div className="py-2.5 rounded-xl text-center"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <span className="text-xs font-semibold" style={{ color: '#10b981' }}>
                ✅ Semua fitur premium aktif
              </span>
            </div>
          )}
        </div>

        {/* Logout */}
        <button onClick={logout}
          className="w-full flex items-center justify-center gap-2 font-semibold py-3.5 rounded-2xl text-sm transition-all"
          style={{
            background: 'rgba(239,68,68,0.06)',
            border: '1px solid rgba(239,68,68,0.15)',
            color: '#ef4444',
          }}>
          <LogOut size={15} /> Keluar dari Akun
        </button>

        <p className="text-center text-xs pb-2" style={{ color: 'rgba(201,168,76,0.3)' }}>
          ✦ PejuangBeasiswa Global v1.0
        </p>
      </div>
    </div>
  )
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      {icon}
      <span className="text-xs w-20 flex-shrink-0" style={{ color: '#64748b' }}>{label}</span>
      <span className="text-sm flex-1 text-white">{value}</span>
    </div>
  )
}
