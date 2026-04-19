"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "en" | "hi"

type Translations = {
  [key: string]: {
    en: string
    hi: string
  }
}

export const translations: Translations = {
  // Navigation
  home: { en: "Home", hi: "होम" },
  bookAppointment: { en: "Book Appointment", hi: "अपॉइंटमेंट बुक करें" },
  trackQueue: { en: "Track Queue", hi: "कतार ट्रैक करें" },
  documents: { en: "Documents", hi: "दस्तावेज़" },
  admin: { en: "Admin", hi: "एडमिन" },
  login: { en: "Login", hi: "लॉगिन" },
  register: { en: "Register", hi: "रजिस्टर" },
  logout: { en: "Logout", hi: "लॉगआउट" },

  // Landing page
  heroTitle: { en: "Smart Queue Management", hi: "स्मार्ट कतार प्रबंधन" },
  heroSubtitle: {
    en: "Skip the wait. Book appointments, track your position, and get SMS reminders.",
    hi: "प्रतीक्षा से बचें। अपॉइंटमेंट बुक करें, अपनी स्थिति ट्रैक करें, और SMS रिमाइंडर प्राप्त करें।",
  },
  getStarted: { en: "Get Started", hi: "शुरू करें" },
  learnMore: { en: "Learn More", hi: "और जानें" },
  features: { en: "Features", hi: "विशेषताएं" },
  easyBooking: { en: "Easy Booking", hi: "आसान बुकिंग" },
  easyBookingDesc: {
    en: "Book appointments online in minutes",
    hi: "मिनटों में ऑनलाइन अपॉइंटमेंट बुक करें",
  },
  realTimeTracking: { en: "Real-Time Tracking", hi: "रीयल-टाइम ट्रैकिंग" },
  realTimeTrackingDesc: {
    en: "Know your exact position in queue",
    hi: "कतार में अपनी सटीक स्थिति जानें",
  },
  smsReminders: { en: "SMS Reminders", hi: "SMS रिमाइंडर" },
  smsRemindersDesc: {
    en: "Get notified when your turn is near",
    hi: "जब आपकी बारी आने वाली हो तो सूचना प्राप्त करें",
  },
  qrTokens: { en: "QR Tokens", hi: "QR टोकन" },
  qrTokensDesc: {
    en: "Digital tokens with QR codes for easy verification",
    hi: "आसान सत्यापन के लिए QR कोड के साथ डिजिटल टोकन",
  },

  // Services
  services: { en: "Services", hi: "सेवाएं" },
  government: { en: "Government", hi: "सरकारी" },
  governmentDesc: { en: "Passport, Aadhaar, Driving License", hi: "पासपोर्ट, आधार, ड्राइविंग लाइसेंस" },
  banking: { en: "Banking", hi: "बैंकिंग" },
  bankingDesc: { en: "Account opening, Loans, Services", hi: "खाता खोलना, ऋण, सेवाएं" },
  healthcare: { en: "Healthcare", hi: "स्वास्थ्य सेवा" },
  healthcareDesc: { en: "Hospital appointments, Lab tests", hi: "अस्पताल अपॉइंटमेंट, लैब टेस्ट" },
  telecom: { en: "Telecom", hi: "दूरसंचार" },
  telecomDesc: { en: "SIM activation, Bill payments", hi: "सिम एक्टिवेशन, बिल भुगतान" },

  // Booking
  selectService: { en: "Select Service", hi: "सेवा चुनें" },
  selectDate: { en: "Select Date", hi: "तारीख चुनें" },
  selectTime: { en: "Select Time", hi: "समय चुनें" },
  selectLocation: { en: "Select Location", hi: "स्थान चुनें" },
  phoneNumber: { en: "Phone Number", hi: "फोन नंबर" },
  confirmBooking: { en: "Confirm Booking", hi: "बुकिंग की पुष्टि करें" },
  bookingConfirmed: { en: "Booking Confirmed!", hi: "बुकिंग की पुष्टि हो गई!" },
  tokenNumber: { en: "Token Number", hi: "टोकन नंबर" },
  appointmentDetails: { en: "Appointment Details", hi: "अपॉइंटमेंट विवरण" },

  // Queue tracking
  yourPosition: { en: "Your Position", hi: "आपकी स्थिति" },
  estimatedWait: { en: "Estimated Wait", hi: "अनुमानित प्रतीक्षा" },
  minutes: { en: "minutes", hi: "मिनट" },
  currentlyServing: { en: "Currently Serving", hi: "वर्तमान में सेवारत" },
  queueStatus: { en: "Queue Status", hi: "कतार की स्थिति" },
  yourTurnSoon: { en: "Your turn is coming up!", hi: "आपकी बारी आने वाली है!" },
  pleaseWait: { en: "Please wait for your turn", hi: "कृपया अपनी बारी का इंतजार करें" },

  // SMS
  smsNotification: { en: "SMS Notification", hi: "SMS सूचना" },
  smsSent: { en: "SMS sent to", hi: "SMS भेजा गया" },
  appointmentReminder: { en: "Appointment Reminder", hi: "अपॉइंटमेंट रिमाइंडर" },
  timeRemaining: { en: "Time Remaining", hi: "शेष समय" },

  // Auth
  email: { en: "Email", hi: "ईमेल" },
  password: { en: "Password", hi: "पासवर्ड" },
  confirmPassword: { en: "Confirm Password", hi: "पासवर्ड की पुष्टि करें" },
  fullName: { en: "Full Name", hi: "पूरा नाम" },
  welcomeBack: { en: "Welcome Back", hi: "वापसी पर स्वागत है" },
  createAccount: { en: "Create Account", hi: "खाता बनाएं" },
  dontHaveAccount: { en: "Don't have an account?", hi: "खाता नहीं है?" },
  alreadyHaveAccount: { en: "Already have an account?", hi: "पहले से खाता है?" },

  // Admin
  dashboard: { en: "Dashboard", hi: "डैशबोर्ड" },
  totalBookings: { en: "Total Bookings", hi: "कुल बुकिंग" },
  todayAppointments: { en: "Today's Appointments", hi: "आज की अपॉइंटमेंट" },
  avgWaitTime: { en: "Avg. Wait Time", hi: "औसत प्रतीक्षा समय" },
  activeQueues: { en: "Active Queues", hi: "सक्रिय कतारें" },
  recentActivity: { en: "Recent Activity", hi: "हाल की गतिविधि" },
  manageServices: { en: "Manage Services", hi: "सेवाएं प्रबंधित करें" },
  analytics: { en: "Analytics", hi: "एनालिटिक्स" },

  // Common
  save: { en: "Save", hi: "सहेजें" },
  cancel: { en: "Cancel", hi: "रद्द करें" },
  submit: { en: "Submit", hi: "जमा करें" },
  loading: { en: "Loading...", hi: "लोड हो रहा है..." },
  error: { en: "Error", hi: "त्रुटि" },
  success: { en: "Success", hi: "सफलता" },
  back: { en: "Back", hi: "वापस" },
  next: { en: "Next", hi: "अगला" },
  download: { en: "Download", hi: "डाउनलोड" },
  share: { en: "Share", hi: "साझा करें" },
  switchLanguage: { en: "हिंदी", hi: "English" },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("smartgov-language") as Language | null
    if (stored && (stored === "en" || stored === "hi")) {
      setLanguageState(stored)
    }
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("smartgov-language", lang)
  }

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language]
    }
    return key
  }

  if (!mounted) {
    return null
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
