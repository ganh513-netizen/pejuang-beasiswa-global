import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { MENTORS, UNIVERSITIES, ALL_EXPERTISE } from '../data/mentors'
import MentorCard from '../components/MentorCard'
import SubscriptionGate from '../components/SubscriptionGate'
import Logo from '../components/Logo'
import { Search, SlidersHorizontal, X } from 'lucide-react'

export default function Mentors() {
  const { isPremium } = useApp()
  const [search, setSearch] = useState('')
  const [filterUni, setFilterUni] = useState('')
  const [filterExpertise, setFilterExpertise] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  if (!isPremium) return <SubscriptionGate feature="UK Mentor Directory" />

  const filtered = MENTORS.filter(m => {
    const q = search.toLowerCase()
    const matchSearch = !q || m.fullName.toLowerCase().includes(q) || m.university.toLowerCase().includes(q) || m.expertise.some(e => e.toLowerCase().includes(q))
    return matchSearch && (!filterUni || m.university === filterUni) && (!filterExpertise || m.expertise.includes(filterExpertise))
  })

  const hasFilters = filterUni || filterExpertise

  return (
    <div className="pb-28 min-h-screen fade-in"
      style={{ background: 'linear-gradient(160deg, #0A0F1E 0%, #0A1628 100%)' }}>

      {/* Header */}
      <div className="px-5 pt-12 pb-6">
        <Logo size="sm" />
        <h1 className="text-white font-bold text-2xl mt-5"
          style={{ fontFamily: 'Playfair Display, serif' }}>
          Mentor <span className="gold-text">Directory</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Mentor Indonesia terbaik di United Kingdom 🇬🇧</p>

        {/* Search bar */}
        <div className="flex gap-2 mt-4">
          <div className="flex-1 flex items-center gap-2 rounded-2xl px-4"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.15)' }}>
            <Search size={15} style={{ color: '#C9A84C', flexShrink: 0 }} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Cari nama, universitas, keahlian..."
              className="bg-transparent text-white placeholder:text-slate-500 text-sm py-3 outline-none flex-1 min-w-0" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all"
            style={hasFilters
              ? { background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', boxShadow: '0 4px 16px rgba(201,168,76,0.3)' }
              : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.15)' }}>
            <SlidersHorizontal size={17} style={{ color: hasFilters ? '#0A1628' : '#C9A84C' }} />
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mx-4 mb-4 rounded-2xl p-4 fade-in"
          style={{ background: 'linear-gradient(145deg, #0F1829, #111827)', border: '1px solid rgba(201,168,76,0.15)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">Filter</span>
            {hasFilters && (
              <button onClick={() => { setFilterUni(''); setFilterExpertise('') }}
                className="flex items-center gap-1 text-xs" style={{ color: '#ef4444' }}>
                <X size={11} /> Reset
              </button>
            )}
          </div>
          <div className="space-y-3">
            {[
              { label: 'Universitas', value: filterUni, onChange: setFilterUni, options: UNIVERSITIES },
              { label: 'Keahlian', value: filterExpertise, onChange: setFilterExpertise, options: ALL_EXPERTISE },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-xs mb-1" style={{ color: '#64748b' }}>{f.label}</label>
                <select value={f.value} onChange={e => f.onChange(e.target.value)}
                  className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.15)', color: '#e2e8f0' }}>
                  <option value="" style={{ background: '#0F1829' }}>Semua</option>
                  {f.options.map(o => <option key={o} value={o} style={{ background: '#0F1829' }}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-4">
        <p className="text-xs mb-4" style={{ color: 'rgba(201,168,76,0.5)' }}>
          {filtered.length} mentor ditemukan
        </p>
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-slate-400 text-sm">Tidak ada mentor yang cocok.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(m => <MentorCard key={m.id} mentor={m} />)}
          </div>
        )}
      </div>
    </div>
  )
}
