import { NavLink } from 'react-router-dom'
import { Home, Users, CalendarCheck, BookOpen, User } from 'lucide-react'

const tabs = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/mentors', icon: Users, label: 'Mentor' },
  { to: '/bookings', icon: CalendarCheck, label: 'Booking' },
  { to: '/resources', icon: BookOpen, label: 'Resources' },
  { to: '/profile', icon: User, label: 'Profil' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 safe-bottom"
         style={{ maxWidth: '480px', margin: '0 auto' }}>
      <div className="flex">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-2 text-xs font-medium transition-colors ${
                isActive ? 'text-navy-900' : 'text-slate-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`p-1 rounded-lg mb-0.5 transition-colors ${isActive ? 'bg-navy-50' : ''}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8}
                    className={isActive ? 'text-[#1A2F5E]' : 'text-slate-400'} />
                </span>
                <span className={isActive ? 'text-[#1A2F5E]' : 'text-slate-400'}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
