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
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom"
      style={{
        maxWidth: '480px', margin: '0 auto',
        background: 'linear-gradient(180deg, rgba(10,15,30,0.95) 0%, rgba(10,15,30,0.99) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(201,168,76,0.15)',
        boxShadow: '0 -8px 32px rgba(0,0,0,0.4)',
      }}>
      {/* Top gold line */}
      <div className="h-px w-full" style={{
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4) 30%, rgba(240,208,128,0.6) 50%, rgba(201,168,76,0.4) 70%, transparent)'
      }}/>
      <div className="flex">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className="flex-1"
          >
            {({ isActive }) => (
              <div className="flex flex-col items-center py-3 gap-1 relative">
                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #C9A84C, #F0D080)' }}/>
                )}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isActive ? 'scale-110' : ''
                }`}
                  style={isActive ? {
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.08))',
                    border: '1px solid rgba(201,168,76,0.25)',
                  } : {}}>
                  <Icon size={18} strokeWidth={isActive ? 2 : 1.5}
                    style={{ color: isActive ? '#C9A84C' : '#475569' }} />
                </div>
                <span className="text-[10px] font-medium tracking-wide transition-all"
                  style={{ color: isActive ? '#C9A84C' : '#475569' }}>
                  {label}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
