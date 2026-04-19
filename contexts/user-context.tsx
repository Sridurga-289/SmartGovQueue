"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type User = {
  id: string
  name: string
  email: string
  phone: string
  role: "citizen" | "admin"
}

export type Booking = {
  id: string
  userId: string
  service: string
  category: string
  date: string
  time: string
  location: string
  tokenNumber: string
  status: "scheduled" | "in-queue" | "completed" | "cancelled"
  queuePosition?: number
  createdAt: string
}

type UserContextType = {
  user: User | null
  bookings: Booking[]
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>
  logout: () => void
  addBooking: (booking: Omit<Booking, "id" | "userId" | "tokenNumber" | "createdAt">) => Booking
  updateBooking: (id: string, updates: Partial<Booking>) => void
  cancelBooking: (id: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const generateToken = () => {
  const prefix = "SG"
  const number = Math.floor(Math.random() * 9000) + 1000
  return `${prefix}${number}`
}

const generateId = () => Math.random().toString(36).substring(2, 15)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("smartgov-user")
    const storedBookings = localStorage.getItem("smartgov-bookings")
    
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings))
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      if (user) {
        localStorage.setItem("smartgov-user", JSON.stringify(user))
      } else {
        localStorage.removeItem("smartgov-user")
      }
    }
  }, [user, mounted])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("smartgov-bookings", JSON.stringify(bookings))
    }
  }, [bookings, mounted])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Demo users
    if (email === "admin@smartgov.in" && password === "admin123") {
      setUser({
        id: "admin-1",
        name: "Admin User",
        email: "admin@smartgov.in",
        phone: "+91 9876543210",
        role: "admin",
      })
      return true
    }
    
    if (email && password) {
      setUser({
        id: generateId(),
        name: email.split("@")[0],
        email,
        phone: "+91 9876543210",
        role: "citizen",
      })
      return true
    }
    
    return false
  }

  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    if (name && email && phone && password) {
      setUser({
        id: generateId(),
        name,
        email,
        phone,
        role: "citizen",
      })
      return true
    }
    
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const addBooking = (
    bookingData: Omit<Booking, "id" | "userId" | "tokenNumber" | "createdAt">
  ): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: generateId(),
      userId: user?.id || "guest",
      tokenNumber: generateToken(),
      createdAt: new Date().toISOString(),
      queuePosition: Math.floor(Math.random() * 10) + 1,
    }
    setBookings((prev) => [...prev, newBooking])
    return newBooking
  }

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === id ? { ...booking, ...updates } : booking))
    )
  }

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: "cancelled" } : booking
      )
    )
  }

  if (!mounted) {
    return null
  }

  return (
    <UserContext.Provider
      value={{
        user,
        bookings,
        setUser,
        login,
        register,
        logout,
        addBooking,
        updateBooking,
        cancelBooking,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
