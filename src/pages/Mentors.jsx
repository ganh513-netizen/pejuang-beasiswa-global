import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { MENTORS, UNIVERSITIES, ALL_EXPERTISE } from '../data/mentors'
import MentorCard from '../components/MentorCard'
import SubscriptionGate from '../components/SubscriptionGate'
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
    const matchSearch = !q ||
      m.fullName.toLowerCase().includes(q) ||
      m.university.toLowerCase().includes(q) ||
      m.field.toLowerCase().includes(q) ||
      m.expertise.some(e => e.toLowerCase().includes(q))
    const matchUni = !filterUni || m.university === filterUni
    const matchExp = !filterExpertise || m.expertise.includes(filterExpertise)
    return matchSearch && matchUni && matchExp
  })

  function clearFilters() {
    setFilterUni('')
    setFilterExpertise('')
    setSearch('')
  }

  const hasFilters = filterUni || filterExpertise

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#1A2F5E] px-5 pt-12 pb-5">
        <h1 className="text-white font-bold text-xl mb-4">Mentor Directory 🇬🇧</h1>
        <div className="flex gap-2">
          <div className="flex-1 bg-white/10 rounded-xl flex items-center gap-2 px-3">
            <Search size={16} className="text-slate-300 flex-shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari nama, universitas, keahlian..."
              className="bg-transparent text-white placeholder:text-slate-400 text-sm py-2.5 outline-none flex-1 min-w-0"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
              hasFilters ? 'bg-[#F4B942]' : 'bg-white/10'
            }`}
          >
            <SlidersHorizontal size={18} className={hasFilters ? 'text-[#1A2F5E]' : 'text-white'} />
          </button>
        </div>
      </div>

      {/* Filters dropdown */}
      {showFilters && (
        <div className="bg-white px-4 py-4 border-b border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-[#1A2F5E]">Filter</span>
            {hasFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-red-500">
                <X size={12} /> Reset
              </button>
            )}
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1 font-medium">Universitas / Perusahaan</label>
              <select value={filterUni} onChange={e => setFilterUni(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none bg-white">
                <option value="">Semua</option>
                {UNIVERSITIES.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1 font-medium">Area Keahlian</label>
              <select value={filterExpertise} onChange={e => setFilterExpertise(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none bg-white">
                <option value="">Semua</option>
                {ALL_EXPERTISE.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 pt-4">
        <p className="text-xs text-slate-400 mb-3">{filtered.length} mentor ditemukan</p>
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-slate-500 text-sm">Tidak ada mentor yang cocok.</p>
            <button onClick={clearFilters} className="mt-3 text-[#1A2F5E] text-sm font-semibold">Reset filter</button>
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
