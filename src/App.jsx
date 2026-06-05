import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import BottomNav from './components/BottomNav'
import Login from './pages/Login'
import Home from './pages/Home'
import Mentors from './pages/Mentors'
import MentorDetail from './pages/MentorDetail'
import BookSession from './pages/BookSession'
import MyBookings from './pages/MyBookings'
import Resources from './pages/Resources'
import Profile from './pages/Profile'

function AppShell() {
  const { currentUser } = useApp()

  if (!currentUser) {
    return (
      <div className="flex justify-center min-h-screen bg-slate-200">
        <div className="w-full max-w-[480px] min-h-screen bg-[#1A2F5E]">
          <Login />
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center min-h-screen bg-slate-200">
      <div className="w-full max-w-[480px] min-h-screen bg-slate-50 relative overflow-hidden">
        <div className="h-full overflow-y-auto" style={{ paddingBottom: '80px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/mentors/:id" element={<MentorDetail />} />
            <Route path="/book/:mentorId" element={<BookSession />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <AppShell />
      </HashRouter>
    </AppProvider>
  )
}
