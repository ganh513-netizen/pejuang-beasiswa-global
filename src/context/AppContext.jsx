import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

const STORAGE_KEY = 'pb_global_data'

function loadStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// Demo accounts pre-seeded
const SEED_USERS = [
  {
    id: 'USR-001',
    fullName: 'Demo Student (Free)',
    email: 'free@demo.com',
    password: 'demo123',
    whatsapp: '081234567890',
    role: 'Student',
    subscriptionStatus: 'Free User',
    subscriptionExpiry: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'USR-002',
    fullName: 'Demo Student (Premium)',
    email: 'premium@demo.com',
    password: 'demo123',
    whatsapp: '089876543210',
    role: 'Student',
    subscriptionStatus: 'Active Subscriber',
    subscriptionExpiry: '2026-07-05',
    createdAt: new Date().toISOString(),
  },
]

export function AppProvider({ children }) {
  const stored = loadStorage()

  const [users, setUsers] = useState(stored?.users ?? SEED_USERS)
  const [bookings, setBookings] = useState(stored?.bookings ?? [])
  const [currentUser, setCurrentUser] = useState(stored?.currentUserId
    ? (stored.users ?? SEED_USERS).find(u => u.id === stored.currentUserId) ?? null
    : null
  )

  useEffect(() => {
    saveStorage({ users, bookings, currentUserId: currentUser?.id ?? null })
  }, [users, bookings, currentUser])

  function login(email, password) {
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) return { ok: false, error: 'Email atau password salah.' }
    setCurrentUser(user)
    return { ok: true }
  }

  function register(fullName, email, password, whatsapp) {
    if (users.find(u => u.email === email)) {
      return { ok: false, error: 'Email sudah terdaftar.' }
    }
    const newUser = {
      id: 'USR-' + Date.now(),
      fullName,
      email,
      password,
      whatsapp,
      role: 'Student',
      subscriptionStatus: 'Free User',
      subscriptionExpiry: null,
      createdAt: new Date().toISOString(),
    }
    setUsers(prev => [...prev, newUser])
    setCurrentUser(newUser)
    return { ok: true }
  }

  function logout() {
    setCurrentUser(null)
  }

  function updateUser(updates) {
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, ...updates } : u))
    setCurrentUser(prev => ({ ...prev, ...updates }))
  }

  function createBooking(data) {
    const id = 'BKG-' + String(Date.now()).slice(-6)
    const booking = {
      id,
      studentId: currentUser.id,
      studentName: currentUser.fullName,
      whatsapp: data.whatsapp,
      mentorId: data.mentorId,
      mentorName: data.mentorName,
      sessionDateTime: data.sessionDateTime,
      durationHours: data.durationHours,
      estimatedCost: data.durationHours * 200000,
      goals: data.goals,
      paymentStatus: 'Pending',
      paymentReference: '',
      escrowReleased: false,
      createdAt: new Date().toISOString(),
    }
    setBookings(prev => [...prev, booking])
    return booking
  }

  function updateBookingPaymentRef(bookingId, ref) {
    setBookings(prev => prev.map(b =>
      b.id === bookingId ? { ...b, paymentReference: ref } : b
    ))
  }

  const myBookings = bookings.filter(b => b.studentId === currentUser?.id)
  const isPremium = currentUser?.subscriptionStatus === 'Active Subscriber'

  return (
    <AppContext.Provider value={{
      currentUser,
      isPremium,
      myBookings,
      login,
      register,
      logout,
      updateUser,
      createBooking,
      updateBookingPaymentRef,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
