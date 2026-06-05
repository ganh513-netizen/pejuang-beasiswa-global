import { useState } from 'react'
import { useApp } from '../context/AppContext'
import StatusBadge from '../components/StatusBadge'
import { User, Phone, Mail, LogOut, ExternalLink, Edit3, Check, X } from 'lucide-react'

const SUBSCRIPTION_PAYMENT_LINK = 'https://your-payment-link.com/subscribe'

export default function Profile() {
  const { currentUser, isPremium, logout, updateUser } = useApp()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ fullName: currentUser?.fullName, whatsapp: currentUser?.whatsapp })

  function saveEdit() {
    updateUser({ fullName: form.fullName, whatsapp: form.whatsapp })
    setEditing(false)
  }

  function cancelEdit() {
    setForm({ fullName: currentUser?.fullName, whatsapp: currentUser?.whatsapp })
    setEditing(false)
  }

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#1A2F5E] px-5 pt-12 pb-16">
        <h1 className="text-white font-bold text-xl">Profil Saya</h1>
      </div>

      {/* Avatar card */}
      <div className="px-4 -mt-10">
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#1A2F5E] rounded-2xl flex items-center justify-center shadow">
              <span className="text-white text-2xl font-bold">
                {currentUser?.fullName?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              {editing ? (
                <input value={form.fullName} onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))}
                  className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm w-full outline-none focus:border-[#1A2F5E] font-semibold text-[#1A2F5E]" />
              ) : (
                <h2 className="font-bold text-[#1A2F5E] text-base">{currentUser?.fullName}</h2>
              )}
              <p className="text-xs text-slate-400 mt-0.5">{currentUser?.email}</p>
              <div className="mt-2">
                <StatusBadge status={currentUser?.subscriptionStatus} />
              </div>
            </div>
            {!editing ? (
              <button onClick={() => setEditing(true)}
                className="p-2 rounded-xl bg-slate-100">
                <Edit3 size={16} className="text-slate-500" />
              </button>
            ) : (
              <div className="flex gap-1">
                <button onClick={saveEdit} className="p-2 rounded-xl bg-emerald-100">
                  <Check size={16} className="text-emerald-600" />
                </button>
                <button onClick={cancelEdit} className="p-2 rounded-xl bg-red-50">
                  <X size={16} className="text-red-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Info */}
        <div className="bg-white rounded-2xl shadow-sm divide-y divide-slate-100">
          <InfoRow icon={<Mail size={16} className="text-slate-400" />} label="Email" value={currentUser?.email} />
          <InfoRow
            icon={<Phone size={16} className="text-slate-400" />}
            label="WhatsApp"
            value={
              editing
                ? <input value={form.whatsapp} onChange={e => setForm(p => ({ ...p, whatsapp: e.target.value }))}
                    className="border border-slate-200 rounded-lg px-2 py-1 text-sm outline-none focus:border-[#1A2F5E] w-full" />
                : currentUser?.whatsapp || '-'
            }
          />
          <InfoRow icon={<User size={16} className="text-slate-400" />} label="Role" value={currentUser?.role} />
        </div>

        {/* Subscription info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-[#1A2F5E] text-sm mb-3">Status Berlangganan</h2>
          <div className="flex items-center justify-between mb-3">
            <StatusBadge status={currentUser?.subscriptionStatus} />
            {isPremium && currentUser?.subscriptionExpiry && (
              <span className="text-xs text-slate-400">
                Aktif hingga {new Date(currentUser.subscriptionExpiry).toLocaleDateString('id-ID', {
                  day:'numeric', month:'long', year:'numeric',
                })}
              </span>
            )}
          </div>
          {!isPremium && (
            <a href={SUBSCRIPTION_PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#F4B942] text-[#1A2F5E] font-bold py-3 rounded-xl text-sm">
              <ExternalLink size={14} /> Upgrade ke Premium — IDR 20.000/bln
            </a>
          )}
          {isPremium && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs text-emerald-700 text-center font-medium">
              ✅ Semua fitur premium aktif
            </div>
          )}
        </div>

        {/* Logout */}
        <button onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-white border border-red-100 text-red-500 font-semibold py-3.5 rounded-2xl shadow-sm text-sm">
          <LogOut size={16} /> Keluar
        </button>

        <p className="text-center text-xs text-slate-300 pb-2">PejuangBeasiswa Global v1.0</p>
      </div>
    </div>
  )
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      {icon}
      <span className="text-sm text-slate-500 w-20 flex-shrink-0">{label}</span>
      <span className="text-sm text-slate-700 font-medium flex-1">{value}</span>
    </div>
  )
}
