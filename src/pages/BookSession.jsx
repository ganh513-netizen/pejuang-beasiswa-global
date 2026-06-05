import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { MENTORS } from '../data/mentors'
import SubscriptionGate from '../components/SubscriptionGate'
import { ArrowLeft, ShieldCheck, CheckCircle } from 'lucide-react'

export default function BookSession() {
  const { mentorId } = useParams()
  const navigate = useNavigate()
  const { currentUser, isPremium, createBooking } = useApp()

  const mentor = MENTORS.find(m => m.id === mentorId) ?? MENTORS[0]

  const [form, setForm] = useState({
    whatsapp: currentUser?.whatsapp ?? '',
    mentorId: mentor?.id ?? '',
    sessionDateTime: '',
    durationHours: 1,
    goals: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(false)

  function set(k, v) { setForm(p => ({ ...p, [k]: v })) }

  const selectedMentor = MENTORS.find(m => m.id === form.mentorId) ?? mentor
  const estimatedCost = form.durationHours * 200000

  if (!isPremium) return <SubscriptionGate feature="fitur pemesanan sesi" />

  if (submitted && booking) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 text-center pb-24">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={40} className="text-emerald-500" />
        </div>
        <h2 className="text-xl font-bold text-[#1A2F5E] mb-2">Booking Berhasil!</h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-2">
          ID Booking: <strong className="text-[#1A2F5E]">{booking.id}</strong>
        </p>
        <div className="bg-white rounded-2xl p-4 w-full max-w-sm text-left shadow-sm border border-slate-100 mb-4 space-y-2">
          <Row label="Mentor" value={booking.mentorName} />
          <Row label="Tanggal & Waktu" value={new Date(booking.sessionDateTime).toLocaleString('id-ID')} />
          <Row label="Durasi" value={`${booking.durationHours} jam`} />
          <Row label="Estimasi Biaya" value={`IDR ${booking.estimatedCost.toLocaleString('id-ID')}`} />
          <Row label="Status" value="Pending Pembayaran" highlight />
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 w-full max-w-sm text-left mb-6">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={16} className="text-amber-600" />
            <span className="text-amber-800 font-semibold text-sm">100% Escrow Safety Guarantee</span>
          </div>
          <p className="text-amber-700 text-xs leading-relaxed">
            Tim kami akan mengirimkan link pembayaran aman via WhatsApp ke <strong>{booking.whatsapp}</strong> dalam 1×24 jam. Dana hanya dicairkan ke mentor setelah sesi selesai dan kamu konfirmasi.
          </p>
        </div>
        <div className="flex gap-3 w-full max-w-sm">
          <button onClick={() => navigate('/bookings')}
            className="flex-1 bg-[#1A2F5E] text-white font-bold py-3 rounded-xl text-sm">
            Lihat Booking Saya
          </button>
          <button onClick={() => navigate('/mentors')}
            className="flex-1 bg-white text-[#1A2F5E] font-bold py-3 rounded-xl text-sm border border-slate-200">
            Cari Mentor Lain
          </button>
        </div>
      </div>
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.sessionDateTime) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    const b = createBooking({ ...form, mentorName: selectedMentor.fullName })
    setBooking(b)
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="pb-28 bg-slate-50 min-h-screen">
      <div className="bg-[#1A2F5E] px-5 pt-12 pb-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-300 mb-4">
          <ArrowLeft size={18} /> Kembali
        </button>
        <h1 className="text-white font-bold text-xl">Book a Session</h1>
        <p className="text-slate-300 text-sm mt-1">Isi form berikut untuk memesan sesi 1-on-1</p>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Escrow notice */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck size={22} className="text-[#1A2F5E] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#1A2F5E] mb-1">100% Escrow Safety Guarantee</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Semua sesi 1-on-1 rata-rata <strong>IDR 200.000/jam</strong>. Setelah submit, kamu akan menerima link pembayaran aman via WhatsApp. Dana hanya dicairkan ke mentor setelah sesimu selesai — uangmu 100% aman.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Student info */}
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            <h2 className="font-semibold text-[#1A2F5E] text-sm">Informasi Peserta</h2>
            <div>
              <label className="block text-xs text-slate-500 mb-1 font-medium">Nama Lengkap</label>
              <input value={currentUser?.fullName} readOnly
                className="w-full border border-slate-100 bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1 font-medium">Nomor WhatsApp *</label>
              <input value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)}
                placeholder="08xxxxxxxxxx" required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1A2F5E]" />
            </div>
          </div>

          {/* Mentor */}
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            <h2 className="font-semibold text-[#1A2F5E] text-sm">Pilih Mentor</h2>
            <select value={form.mentorId} onChange={e => set('mentorId', e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1A2F5E] bg-white">
              {MENTORS.filter(m => m.availability === 'Available').map(m => (
                <option key={m.id} value={m.id}>{m.fullName} — {m.university}</option>
              ))}
            </select>
            {selectedMentor && (
              <p className="text-xs text-slate-400">
                Rate: IDR {selectedMentor.ratePerHour.toLocaleString('id-ID')}/jam
              </p>
            )}
          </div>

          {/* Session details */}
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            <h2 className="font-semibold text-[#1A2F5E] text-sm">Detail Sesi</h2>
            <div>
              <label className="block text-xs text-slate-500 mb-1 font-medium">Tanggal & Waktu *</label>
              <input type="datetime-local" value={form.sessionDateTime}
                onChange={e => set('sessionDateTime', e.target.value)}
                min={new Date().toISOString().slice(0,16)} required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1A2F5E]" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1 font-medium">Durasi (jam)</label>
              <select value={form.durationHours} onChange={e => set('durationHours', Number(e.target.value))}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none bg-white focus:border-[#1A2F5E]">
                {[1,1.5,2,2.5,3].map(h => (
                  <option key={h} value={h}>{h} jam — IDR {(h*200000).toLocaleString('id-ID')}</option>
                ))}
              </select>
            </div>
            <div className="bg-[#1A2F5E]/5 rounded-xl px-4 py-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Estimasi Total</span>
                <span className="font-bold text-[#1A2F5E]">IDR {estimatedCost.toLocaleString('id-ID')}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1 font-medium">Tujuan / Catatan Khusus</label>
              <textarea value={form.goals} onChange={e => set('goals', e.target.value)}
                rows={4} placeholder="Ceritakan apa yang ingin kamu capai dari sesi ini, e.g. review draft LPDP essay, simulasi wawancara Chevening, dll."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1A2F5E] resize-none" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-[#1A2F5E] text-white font-bold py-4 rounded-2xl text-sm disabled:opacity-60 shadow-lg">
            {loading ? 'Memproses...' : 'Konfirmasi Booking →'}
          </button>
        </form>
      </div>
    </div>
  )
}

function Row({ label, value, highlight }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs text-slate-400">{label}</span>
      <span className={`text-xs font-semibold ${highlight ? 'text-amber-600' : 'text-slate-700'}`}>{value}</span>
    </div>
  )
}
