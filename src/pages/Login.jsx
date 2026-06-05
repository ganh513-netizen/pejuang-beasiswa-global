import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Login() {
  const { login, register } = useApp()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ fullName: '', email: '', password: '', whatsapp: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function set(k, v) { setForm(p => ({ ...p, [k]: v })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 400))

    let res
    if (mode === 'login') {
      res = login(form.email.trim(), form.password)
    } else {
      if (!form.fullName.trim()) { setError('Nama lengkap wajib diisi.'); setLoading(false); return }
      res = register(form.fullName.trim(), form.email.trim(), form.password, form.whatsapp.trim())
    }

    if (!res.ok) setError(res.error)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#1A2F5E] flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8 text-center">
        <div className="w-20 h-20 bg-[#F4B942] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
          <span className="text-4xl">🎓</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">PejuangBeasiswa<br />Global</h1>
        <p className="text-slate-300 text-sm mt-2 max-w-xs">
          Platform mentoring eksklusif untuk pejuang beasiswa Indonesia — terhubung dengan mentor di UK.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-t-3xl px-6 pt-8 pb-10 shadow-xl">
        <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
          {['login','register'].map(m => (
            <button key={m} onClick={() => { setMode(m); setError('') }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                mode === m ? 'bg-white shadow text-[#1A2F5E]' : 'text-slate-400'}`}>
              {m === 'login' ? 'Masuk' : 'Daftar'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Lengkap</label>
              <input value={form.fullName} onChange={e => set('fullName', e.target.value)}
                placeholder="Nama kamu" required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1A2F5E] transition" />
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
              placeholder="email@kamu.com" required
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1A2F5E] transition" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
            <input type="password" value={form.password} onChange={e => set('password', e.target.value)}
              placeholder="••••••••" required minLength={6}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1A2F5E] transition" />
          </div>
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Nomor WhatsApp</label>
              <input value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1A2F5E] transition" />
            </div>
          )}

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-[#1A2F5E] text-white font-bold py-3.5 rounded-xl mt-2 disabled:opacity-60 transition">
            {loading ? 'Memproses...' : (mode === 'login' ? 'Masuk' : 'Buat Akun')}
          </button>
        </form>

        {/* Demo hint */}
        <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-3">
          <p className="text-xs text-amber-800 font-semibold mb-1">Akun Demo:</p>
          <p className="text-xs text-amber-700">📌 Free: <code>free@demo.com</code> / <code>demo123</code></p>
          <p className="text-xs text-amber-700">⭐ Premium: <code>premium@demo.com</code> / <code>demo123</code></p>
        </div>
      </div>
    </div>
  )
}
