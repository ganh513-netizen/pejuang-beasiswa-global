import { useNavigate } from 'react-router-dom'
import StatusBadge from './StatusBadge'
import { MapPin, Clock } from 'lucide-react'

export default function MentorCard({ mentor }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/mentors/${mentor.id}`)}
      className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 cursor-pointer active:scale-95 transition-transform"
    >
      <div className="flex items-start gap-3">
        <img
          src={mentor.picture}
          alt={mentor.fullName}
          className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-[#1A2F5E] text-sm leading-tight">{mentor.fullName}</h3>
            <StatusBadge status={mentor.availability} />
          </div>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={11} className="text-slate-400 flex-shrink-0" />
            <p className="text-xs text-slate-500 truncate">{mentor.university}</p>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{mentor.field}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {mentor.expertise.slice(0, 2).map(e => (
          <span key={e} className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">{e}</span>
        ))}
        {mentor.expertise.length > 2 && (
          <span className="bg-slate-100 text-slate-400 text-xs px-2 py-0.5 rounded-full">+{mentor.expertise.length - 2}</span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <Clock size={12} />
          <span>IDR {mentor.ratePerHour.toLocaleString('id-ID')}/jam</span>
        </div>
        <span className="text-[#1A2F5E] text-xs font-semibold">Lihat Profil →</span>
      </div>
    </div>
  )
}
