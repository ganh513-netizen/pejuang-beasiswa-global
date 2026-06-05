import { useParams, useNavigate } from 'react-router-dom'
import { MENTORS } from '../data/mentors'
import { useApp } from '../context/AppContext'
import StatusBadge from '../components/StatusBadge'
import { ArrowLeft, MapPin, Linkedin, Clock, CalendarPlus } from 'lucide-react'

export default function MentorDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isPremium } = useApp()
  const mentor = MENTORS.find(m => m.id === id)

  if (!mentor) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-slate-400">Mentor tidak ditemukan.</p>
    </div>
  )

  return (
    <div className="pb-28 bg-slate-50 min-h-screen">
      {/* Top bar */}
      <div className="bg-[#1A2F5E] px-5 pt-12 pb-20">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-300 mb-4">
          <ArrowLeft size={18} /> Kembali
        </button>
      </div>

      {/* Profile card */}
      <div className="px-4 -mt-14">
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <div className="flex gap-4">
            <img src={mentor.picture} alt={mentor.fullName}
              className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow" />
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-[#1A2F5E] text-lg leading-tight">{mentor.fullName}</h1>
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={12} className="text-slate-400" />
                <p className="text-xs text-slate-500 truncate">{mentor.university}</p>
              </div>
              <p className="text-xs text-slate-400">{mentor.field}</p>
              <div className="mt-2">
                <StatusBadge status={mentor.availability} />
              </div>
            </div>
          </div>

          {mentor.linkedin && (
            <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 text-sm text-blue-600 font-medium">
              <Linkedin size={15} /> LinkedIn Profile
            </a>
          )}
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Bio */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-[#1A2F5E] text-sm mb-2">Tentang Mentor</h2>
          <p className="text-sm text-slate-600 leading-relaxed">{mentor.bio}</p>
        </div>

        {/* Expertise */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-[#1A2F5E] text-sm mb-3">Area Keahlian</h2>
          <div className="flex flex-wrap gap-2">
            {mentor.expertise.map(e => (
              <span key={e} className="bg-[#1A2F5E]/8 text-[#1A2F5E] text-xs px-3 py-1 rounded-full font-medium bg-slate-100">
                {e}
              </span>
            ))}
          </div>
        </div>

        {/* Rate */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F4B942]/15 rounded-xl flex items-center justify-center">
            <Clock size={18} className="text-[#F4B942]" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Rate per Jam</p>
            <p className="font-bold text-[#1A2F5E]">IDR {mentor.ratePerHour.toLocaleString('id-ID')}</p>
          </div>
        </div>

        {/* Book button */}
        {isPremium && mentor.availability === 'Available' ? (
          <button
            onClick={() => navigate(`/book/${mentor.id}`)}
            className="w-full bg-[#1A2F5E] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-lg"
          >
            <CalendarPlus size={18} />
            Book a 1-on-1 Session
          </button>
        ) : mentor.availability !== 'Available' ? (
          <div className="w-full bg-slate-100 text-slate-400 font-bold py-4 rounded-2xl text-center text-sm">
            Tidak tersedia saat ini
          </div>
        ) : null}
      </div>
    </div>
  )
}
