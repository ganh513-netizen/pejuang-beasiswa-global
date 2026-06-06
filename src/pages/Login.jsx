import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Logo from '../components/Logo'

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
    await new Promise(r => setTimeout(r, 500))
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
    <div className="min-h-screen flex flex-col" style={{
      background: 'linear-gradient(160deg, #0A0F1E 0%, #0A1628 40%, #0F1E3A 100%)'
    }}>
      {/* Decorative orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C9A84C, transparent)' }} />
        <div className="absolute bottom-[200px] left-[-60px] w-48 h-48 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #1A2F5E, transparent)' }} />
        {/* Decorative lines */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 400 800">
          <line x1="0" y1="200" x2="400" y2="200" stroke="#C9A84C" strokeWidth="0.5"/>
          <line x1="0" y1="600" x2="400" y2="600" stroke="#C9A84C" strokeWidth="0.5"/>
          <line x1="200" y1="0" x2="200" y2="800" stroke="#C9A84C" strokeWidth="0.5"/>
        </svg>
      </div>

      {/* Hero section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-6 relative z-10 fade-in">
        <div className="mb-6">
          <Logo size="xl" />
        </div>

        <div className="text-center mb-2">
          <p className="font-elegant italic text-slate-300 text-lg" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            "Where Ambition Meets Excellence"
          </p>
        </div>

        {/* Divider ornament */}
        <div className="flex items-center gap-3 my-4">
          <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C)' }}/>
          <svg width="12" height="12" viewBox="0 0 12 12">
            <polygon points="6,0 7.5,4.5 12,4.5 8.5,7 9.8,12 6,9 2.2,12 3.5,7 0,4.5 4.5,4.5" fill="#C9A84C"/>
          </svg>
          <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }}/>
        </div>

        <p className="text-slate-400 text-xs tracking-widest uppercase text-center">
          Platform Mentoring Eksklusif
        </p>
      </div>

      {/* Form card */}
      <div className="relative z-10 mx-3 mb-4 rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.97) 0%, rgba(248,244,238,0.98) 100%)',
          boxShadow: '0 -8px 40px rgba(201,168,76,0.15), 0 0 0 1px rgba(201,168,76,0.2)',
        }}>

        {/* Gold top border */}
        <div className="h-0.5 w-full" style={{
          background: 'linear-gradient(90deg, transparent, #C9A84C 30%, #F0D080 50%, #C9A84C 70%, transparent)'
        }}/>

        <div className="px-6 pt-6 pb-8">
          {/* Tab switcher */}
          <div className="flex rounded-2xl p-1 mb-6"
            style={{ background: 'rgba(10,22,40,0.06)' }}>
            {[['login','Masuk'],['register','Daftar']].map(([m, label]) => (
              <button key={m} onClick={() => { setMode(m); setError('') }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                style={mode === m ? {
                  background: 'linear-gradient(135deg, #0A1628, #1A2F5E)',
                  color: '#F0D080',
                  boxShadow: '0 4px 12px rgba(10,22,40,0.25)',
                } : { color: '#94a3b8' }}>
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <Field label="Nama Lengkap" value={form.fullName}
                onChange={e => set('fullName', e.target.value)}
                placeholder="Nama lengkap kamu" required />
            )}
            <Field label="Alamat Email" type="email" value={form.email}
              onChange={e => set('email', e.target.value)}
              placeholder="email@kamu.com" required />
            <Field label="Password" type="password" value={form.password}
              onChange={e => set('password', e.target.value)}
              placeholder="Minimal 6 karakter" required minLength={6} />
            {mode === 'register' && (
              <Field label="Nomor WhatsApp" value={form.whatsapp}
                onChange={e => set('whatsapp', e.target.value)}
                placeholder="08xxxxxxxxxx" />
            )}

            {error && (
              <p className="text-red-500 text-xs text-center bg-red-50 py-2 px-3 rounded-xl">{error}</p>
            )}

            <button type="submit" disabled={loading}
              className="w-full gold-btn text-[#0A1628] font-bold py-4 rounded-2xl text-sm tracking-wide mt-2 transition-all disabled:opacity-60"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#0A1628]/30 border-t-[#0A1628] rounded-full animate-spin"/>
                  Memproses...
                </span>
              ) : (
                mode === 'login' ? '✦ Masuk ke Platform' : '✦ Buat Akun'
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-5 rounded-2xl p-4"
            style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
            <p className="text-xs font-semibold mb-2" style={{ color: '#C9A84C' }}>✦ Akun Demo</p>
            <p className="text-xs text-slate-500">🆓 Free: <code className="font-mono">free@demo.com</code> / <code>demo123</code></p>
            <p className="text-xs text-slate-500 mt-1">⭐ Premium: <code className="font-mono">premium@demo.com</code> / <code>demo123</code></p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5 tracking-wide uppercase"
        style={{ fontSize: '10px', letterSpacing: '0.08em' }}>{label}</label>
      <input
        {...props}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
        style={{
          background: 'rgba(10,22,40,0.04)',
          border: '1px solid rgba(10,22,40,0.1)',
          color: '#0A1628',
        }}
        onFocus={e => e.target.style.borderColor = '#C9A84C'}
        onBlur={e => e.target.style.borderColor = 'rgba(10,22,40,0.1)'}
      />
    </div>
  )
}
