import { useNavigate } from 'react-router-dom'
import StatusBadge from './StatusBadge'
import { MapPin, Clock } from 'lucide-react'

export default function MentorCard({ mentor }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/mentors/${mentor.id}`)}
      className="cursor-pointer active:scale-98 transition-all duration-200 rounded-2xl overflow-hidden fade-in"
      style={{
        background: 'linear-gradient(145deg, #0F1829 0%, #111827 100%)',
        border: '1px solid rgba(201,168,76,0.15)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* Top color band */}
      <div className="h-px w-full shimmer" />

      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="relative flex-shrink-0">
            <img src={mentor.picture} alt={mentor.fullName}
              className="w-14 h-14 rounded-xl object-cover"
              style={{ border: '2px solid rgba(201,168,76,0.3)' }} />
            {/* Availability dot */}
            <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2`}
              style={{
                borderColor: '#0F1829',
                background: mentor.availability === 'Available' ? '#10b981' :
                  mentor.availability === 'Fully Booked' ? '#ef4444' : '#64748b'
              }} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-white text-sm leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              {mentor.fullName}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={11} className="flex-shrink-0" style={{ color: '#C9A84C' }} />
              <p className="text-xs truncate" style={{ color: '#94a3b8' }}>{mentor.university}</p>
            </div>
            <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>{mentor.field}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-3 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)' }} />

        {/* Expertise tags */}
        <div className="flex flex-wrap gap-1.5">
          {mentor.expertise.slice(0, 2).map(e => (
            <span key={e} className="text-xs px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(201,168,76,0.08)',
                color: '#C9A84C',
                border: '1px solid rgba(201,168,76,0.2)',
              }}>
              {e}
            </span>
          ))}
          {mentor.expertise.length > 2 && (
            <span className="text-xs px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#64748b', border: '1px solid rgba(255,255,255,0.08)' }}>
              +{mentor.expertise.length - 2}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock size={11} style={{ color: '#C9A84C' }} />
            <span className="text-xs font-semibold" style={{ color: '#C9A84C' }}>
              IDR {mentor.ratePerHour.toLocaleString('id-ID')}/jam
            </span>
          </div>
          <span className="text-xs font-medium" style={{ color: '#64748b' }}>
            Lihat Profil →
          </span>
        </div>
      </div>
    </div>
  )
}
