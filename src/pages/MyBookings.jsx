import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'
import { Calendar, ChevronDown, ChevronUp, Send } from 'lucide-react'

export default function MyBookings() {
  const { myBookings, updateBookingPaymentRef } = useApp()
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(null)
  const [refs, setRefs] = useState({})

  const sorted = [...myBookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      <div className="bg-[#1A2F5E] px-5 pt-12 pb-6">
        <h1 className="text-white font-bold text-xl">My Bookings 📅</h1>
        <p className="text-slate-300 text-sm mt-1">{sorted.length} sesi terdaftar</p>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {sorted.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-slate-500 text-sm mb-4">Belum ada booking sesi.</p>
            <button onClick={() => navigate('/mentors')}
              className="bg-[#1A2F5E] text-white text-sm font-bold px-6 py-3 rounded-xl">
              Temukan Mentor
            </button>
          </div>
        ) : sorted.map(b => (
          <div key={b.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div
              className="p-4 cursor-pointer"
              onClick={() => setExpanded(expanded === b.id ? null : b.id)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-400">{b.id}</span>
                    <StatusBadge status={b.paymentStatus} />
                  </div>
                  <p className="font-semibold text-[#1A2F5E] text-sm">{b.mentorName}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar size={12} className="text-slate-400" />
                    <p className="text-xs text-slate-400">
                      {new Date(b.sessionDateTime).toLocaleString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <p className="text-sm font-bold text-[#1A2F5E]">
                    IDR {b.estimatedCost.toLocaleString('id-ID')}
                  </p>
                  {expanded === b.id ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </div>
              </div>
            </div>

            {expanded === b.id && (
              <div className="border-t border-slate-100 px-4 pb-4 pt-3 bg-slate-50 space-y-3">
                <div className="space-y-1.5">
                  <DetailRow label="Durasi" value={`${b.durationHours} jam`} />
                  <DetailRow label="WhatsApp" value={b.whatsapp} />
                  {b.goals && <DetailRow label="Tujuan" value={b.goals} />}
                  <DetailRow label="Status Escrow" value={b.escrowReleased ? '✅ Dana Dicairkan' : '🔒 Dana Ditahan (Aman)'} />
                </div>

                {b.paymentStatus === 'Pending' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <p className="text-xs text-amber-800 font-semibold mb-2">
                      Sudah bayar? Masukkan referensi pembayaran:
                    </p>
                    <div className="flex gap-2">
                      <input
                        value={refs[b.id] ?? b.paymentReference}
                        onChange={e => setRefs(prev => ({ ...prev, [b.id]: e.target.value }))}
                        placeholder="No. referensi / kode transaksi"
                        className="flex-1 border border-amber-200 bg-white rounded-lg px-3 py-2 text-xs outline-none"
                      />
                      <button
                        onClick={() => {
                          if (refs[b.id]) {
                            updateBookingPaymentRef(b.id, refs[b.id])
                            setRefs(prev => ({ ...prev, [b.id]: '' }))
                          }
                        }}
                        className="bg-amber-500 text-white px-3 py-2 rounded-lg flex items-center gap-1"
                      >
                        <Send size={12} />
                        <span className="text-xs font-semibold">Kirim</span>
                      </button>
                    </div>
                  </div>
                )}

                {b.paymentStatus === 'Confirmed' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
                    ✅ Pembayaran dikonfirmasi. Siapkan dirimu untuk sesi bersama {b.mentorName}!
                  </div>
                )}

                {b.paymentStatus === 'Completed' && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-700">
                    🎉 Sesi selesai! Semoga bermanfaat untuk perjalanan beasiswamu.
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between items-start gap-3">
      <span className="text-xs text-slate-400 flex-shrink-0 w-24">{label}</span>
      <span className="text-xs text-slate-700 text-right">{value}</span>
    </div>
  )
}
