import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { ESSAYS, SCHOLARSHIP_TYPES } from '../data/essays'
import { WEBINARS } from '../data/webinars'
import SubscriptionGate from '../components/SubscriptionGate'
import { Calendar, ExternalLink, Video, ChevronDown, ChevronUp, BookOpen } from 'lucide-react'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function Resources() {
  const { isPremium } = useApp()
  const [tab, setTab] = useState('essays')

  if (!isPremium) return <SubscriptionGate feature="Essay Vault & Webinars" />

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      <div className="bg-[#1A2F5E] px-5 pt-12 pb-5">
        <h1 className="text-white font-bold text-xl">Resources 📚</h1>
        <div className="flex gap-2 mt-4">
          {[['essays','📄 Essay Vault'],['webinars','🎥 Webinars']].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                tab === key ? 'bg-[#F4B942] text-[#1A2F5E]' : 'bg-white/10 text-slate-300'
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">
        {tab === 'essays' ? <EssayVault /> : <WebinarList />}
      </div>
    </div>
  )
}

function EssayVault() {
  const [filter, setFilter] = useState('')
  const [expanded, setExpanded] = useState(null)

  const filtered = ESSAYS.filter(e => !filter || e.scholarshipType === filter)

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setFilter('')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            !filter ? 'bg-[#1A2F5E] text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>
          Semua
        </button>
        {SCHOLARSHIP_TYPES.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filter === t ? 'bg-[#1A2F5E] text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>
            {t}
          </button>
        ))}
      </div>

      {filtered.map(essay => (
        <div key={essay.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 cursor-pointer" onClick={() => setExpanded(expanded === essay.id ? null : essay.id)}>
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0">
                <span className="inline-block bg-[#1A2F5E]/8 text-[#1A2F5E] text-xs px-2 py-0.5 rounded-full font-semibold mb-2 bg-slate-100">
                  {essay.scholarshipType}
                </span>
                <h3 className="font-semibold text-[#1A2F5E] text-sm leading-tight">{essay.title}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {essay.authorAlias} · {essay.universityAdmitted}
                </p>
              </div>
              {expanded === essay.id
                ? <ChevronUp size={16} className="text-slate-400 flex-shrink-0" />
                : <ChevronDown size={16} className="text-slate-400 flex-shrink-0" />}
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {essay.tags.map(t => (
                <span key={t} className="bg-slate-50 text-slate-400 text-xs px-2 py-0.5 rounded-full border border-slate-100">{t}</span>
              ))}
            </div>
          </div>

          {expanded === essay.id && (
            <div className="border-t border-slate-100 px-4 pb-4 pt-3">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={14} className="text-slate-400" />
                <span className="text-xs font-semibold text-slate-500">Isi Essay</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {essay.content}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function WebinarList() {
  const now = new Date()
  const upcoming = WEBINARS.filter(w => new Date(w.dateTime) > now)
  const past = WEBINARS.filter(w => new Date(w.dateTime) <= now || w.recordingLink)

  return (
    <div className="space-y-6">
      {upcoming.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-[#1A2F5E] mb-3">Mendatang</h2>
          <div className="space-y-3">
            {upcoming.map(w => <WebinarCard key={w.id} webinar={w} />)}
          </div>
        </div>
      )}
      {past.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-slate-400 mb-3">Sebelumnya</h2>
          <div className="space-y-3">
            {past.map(w => <WebinarCard key={w.id} webinar={w} />)}
          </div>
        </div>
      )}
    </div>
  )
}

function WebinarCard({ webinar }) {
  const [open, setOpen] = useState(false)
  const isPast = new Date(webinar.dateTime) <= new Date()

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isPast ? 'bg-slate-100' : 'bg-[#1A2F5E]/10'}`}>
            <Video size={18} className={isPast ? 'text-slate-400' : 'text-[#1A2F5E]'} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-[#1A2F5E] text-sm leading-tight">{webinar.title}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Calendar size={11} className="text-slate-400" />
              <p className="text-xs text-slate-400">{formatDate(webinar.dateTime)}</p>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{webinar.speaker}</p>
          </div>
          {open ? <ChevronUp size={16} className="text-slate-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-slate-400 flex-shrink-0" />}
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 px-4 pb-4 pt-3">
          <p className="text-sm text-slate-600 leading-relaxed mb-3">{webinar.description}</p>
          <div className="flex gap-2">
            {!isPast && (
              <a href={webinar.zoomLink} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#1A2F5E] text-white text-xs font-semibold py-2.5 rounded-xl">
                <ExternalLink size={13} /> Join Webinar
              </a>
            )}
            {webinar.recordingLink && (
              <a href={webinar.recordingLink} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-semibold py-2.5 rounded-xl">
                <Video size={13} /> Tonton Recording
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
