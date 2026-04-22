"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "en" | "hi" | "te"

type Translations = {
  [key: string]: {
    en: string
    hi: string
    te: string
  }
}

export const translations: Translations = {
  // Navigation
  home: { en: "Home", hi: "होम", te: "హోమ్" },
  bookAppointment: { en: "Book Appointment", hi: "अपॉइंटमेंट बुक करें", te: "నియమితాన్ని బుక్ చేయండి" },
  trackQueue: { en: "Track Queue", hi: "कतार ट्रैक करें", te: "క్యూ ట్రాక్ చేయండి" },
  documents: { en: "Documents", hi: "दस्तावेज़", te: "డాక్యుమెంట్‌లు" },
  admin: { en: "Admin", hi: "एडमिन", te: "అడ్మిన్" },
  login: { en: "Login", hi: "लॉगिन", te: "లాగిన్" },
  register: { en: "Register", hi: "रजिस्टर", te: "నిబంధనలు" },
  logout: { en: "Logout", hi: "लॉगआउट", te: "లాగ్ అవుట్" },

  // Landing page
  heroTitle: { en: "Smart Queue Management", hi: "स्मार्ट कतार प्रबंधन", te: "స్మార్ట్ క్యూ నిర్వహణ" },
  heroSubtitle: {
    en: "Skip the wait. Book appointments, track your position, and get SMS reminders.",
    hi: "प्रतीक्षा से बचें। अपॉइंटमेंट बुक करें, अपनी स्थिति ट्रैक करें, और SMS रिमाइंडर प्राप्त करें।",
    te: "प్రతీక్ష నుండి తప్పించండి. నియామకాలను బుక్ చేసుకోండి, మీ స్థితిని ట్రాక్ చేసుకోండి మరియు SMS రిమైండర్‌లను పొందండి.",
  },
  getStarted: { en: "Get Started", hi: "शुरू करें", te: "ప్రారంభించండి" },
  learnMore: { en: "Learn More", hi: "और जानें", te: "మరిన్ని తెలుసుకోండి" },
  features: { en: "Features", hi: "विशेषताएं", te: "లక్షణాలు" },
  easyBooking: { en: "Easy Booking", hi: "आसान बुकिंग", te: "సులభ బుకింగ్" },
  easyBookingDesc: {
    en: "Book appointments online in minutes",
    hi: "मिनटों में ऑनलाइन अपॉइंटमेंट बुक करें",
    te: "నిమిషాలలో ఆన్‌లైన్‌లో నియామకాలను బుక్ చేయండి",
  },
  realTimeTracking: { en: "Real-Time Tracking", hi: "रीयल-टाइम ट्रैकिंग", te: "రీయల్-టైమ్ ట్రాకింగ్" },
  realTimeTrackingDesc: {
    en: "Know your exact position in queue",
    hi: "कतार में अपनी सटीक स्थिति जानें",
    te: "క్యూలో మీ ఖచ్చిత స్థితిని తెలుసుకోండి",
  },
  smsReminders: { en: "SMS Reminders", hi: "SMS रिमाइंडर", te: "SMS రిమైండర్‌లు" },
  smsRemindersDesc: {
    en: "Get notified when your turn is near",
    hi: "जब आपकी बारी आने वाली हो तो सूचना प्राप्त करें",
    te: "మీ మొగ్గ సమీపించినప్పుడు నోటిఫికేషన్ పొందండి",
  },
  qrTokens: { en: "QR Tokens", hi: "QR टोकन", te: "QR టోకెన్‌లు" },
  qrTokensDesc: {
    en: "Digital tokens with QR codes for easy verification",
    hi: "आसान सत्यापन के लिए QR कोड के साथ डिजिटल टोकन",
    te: "సులభ ధృవీకరణ కోసం QR కోడ్‌లతో డిజిటల్ టోకెన్‌లు",
  },

  // Services
  services: { en: "Services", hi: "सेवाएं", te: "సేవలు" },
  government: { en: "Government", hi: "सरकारी", te: "ప్రభుత్వ" },
  governmentDesc: { en: "Passport, Aadhaar, Driving License", hi: "पासपोर्ट, आधार, ड्राइविंग लाइसेंस", te: "పాస్‌పోర్ట్, ఆధార్, డ్రైవింగ్ లైసెన్స్" },
  banking: { en: "Banking", hi: "बैंकिंग", te: "బ్యాంకింగ్" },
  bankingDesc: { en: "Account opening, Loans, Services", hi: "खाता खोलना, ऋण, सेवाएं", te: "ఖాతా ఓపెనింగ్, రుణాలు, సేవలు" },
  healthcare: { en: "Healthcare", hi: "स्वास्थ्य सेवा", te: "ఆరోగ్య సేవ" },
  healthcareDesc: { en: "Hospital appointments, Lab tests", hi: "अस्पताल अपॉइंटमेंट, लैब टेस्ट", te: "ఆసుపత్రి నియామకాలు, ల్యాబ్ పరీక్షలు" },
  telecom: { en: "Telecom", hi: "दूरसंचार", te: "టెలికమ్" },
  telecomDesc: { en: "SIM activation, Bill payments", hi: "सिम एक्टिवेशन, बिल भुगतान", te: "SIM యాక్టివేషన్, బిల్ చెల్లింపులు" },

  // Booking
  selectService: { en: "Select Service", hi: "सेवा चुनें", te: "సేవను ఎంచుకోండి" },
  selectDate: { en: "Select Date", hi: "तारीख चुनें", te: "తేదీని ఎంచుకోండి" },
  selectTime: { en: "Select Time", hi: "समय चुनें", te: "సమయాన్ని ఎంచుకోండి" },
  selectLocation: { en: "Select Location", hi: "स्थान चुनें", te: "ప్రదేశాన్ని ఎంచుకోండి" },
  phoneNumber: { en: "Phone Number", hi: "फोन नंबर", te: "ఫోన్ నంబర్" },
  confirmBooking: { en: "Confirm Booking", hi: "बुकिंग की पुष्टि करें", te: "బుకింగ్ నిర్ధారించండి" },
  bookingConfirmed: { en: "Booking Confirmed!", hi: "बुकिंग की पुष्टि हो गई!", te: "బుకింగ్ నిర్ధారించబడింది!" },
  tokenNumber: { en: "Token Number", hi: "टोकन नंबर", te: "టోకెన్ నంబర్" },
  appointmentDetails: { en: "Appointment Details", hi: "अपॉइंटमेंट विवरण", te: "నియామకం వివరాలు" },

  // Queue tracking
  yourPosition: { en: "Your Position", hi: "आपकी स्थिति", te: "మీ స్థితి" },
  estimatedWait: { en: "Estimated Wait", hi: "अनुमानित प्रतीक्षा", te: "అంచనా వేసిన ఎదురుచూపు" },
  minutes: { en: "minutes", hi: "मिनट", te: "నిమిషాలు" },
  currentlyServing: { en: "Currently Serving", hi: "वर्तमान में सेवारत", te: "ప్రస్తుతం సేవ చేస్తున్నారు" },
  queueStatus: { en: "Queue Status", hi: "कतार की स्थिति", te: "క్యూ స్థితి" },
  yourTurnSoon: { en: "Your turn is coming up!", hi: "आपकी बारी आने वाली है!", te: "మీ వరుస వస్తుంది!" },
  pleaseWait: { en: "Please wait for your turn", hi: "कृपया अपनी बारी का इंतजार करें", te: "దయచేసి మీ వరుసకు ఎదురుచూడండి" },

  // SMS
  smsNotification: { en: "SMS Notification", hi: "SMS सूचना", te: "SMS నోటిఫికేషన్" },
  smsSent: { en: "SMS sent to", hi: "SMS भेजा गया", te: "SMS పంపిన" },
  appointmentReminder: { en: "Appointment Reminder", hi: "अपॉइंटमेंट रिमाइंडर", te: "నియామకం రిమైండర్" },
  timeRemaining: { en: "Time Remaining", hi: "शेष समय", te: "మిగిలిన సమయం" },

  // Auth
  email: { en: "Email", hi: "ईमेल", te: "ఈమెయిల్" },
  password: { en: "Password", hi: "पासवर्ड", te: "పాస్‌వర్డ్" },
  confirmPassword: { en: "Confirm Password", hi: "पासवर्ड की पुष्टि करें", te: "పాస్‌వర్డ్ నిర్ధారించండి" },
  fullName: { en: "Full Name", hi: "पूरा नाम", te: "పూర్తి పేరు" },
  welcomeBack: { en: "Welcome Back", hi: "वापसी पर स्वागत है", te: "తిరిగి స్వాగతం" },
  createAccount: { en: "Create Account", hi: "खाता बनाएं", te: "ఖాతాను సృష్టించండి" },
  dontHaveAccount: { en: "Don't have an account?", hi: "खाता नहीं है?", te: "ఖాతా లేనిది?" },
  alreadyHaveAccount: { en: "Already have an account?", hi: "पहले से खाता है?", te: "ఇప్పటికే ఖాతా ఉందా?" },

  // Admin
  dashboard: { en: "Dashboard", hi: "डैशबोर्ड", te: "డ్యాష్‌బోర్డ్" },
  totalBookings: { en: "Total Bookings", hi: "कुल बुकिंग", te: "మొత్తం బుకింగ్‌లు" },
  todayAppointments: { en: "Today's Appointments", hi: "आज की अपॉइंटमेंट", te: "ఈ రోజు నియామకాలు" },
  avgWaitTime: { en: "Avg. Wait Time", hi: "औसत प्रतीक्षा समय", te: "సగటు ఎదురుచూపు సమయం" },
  activeQueues: { en: "Active Queues", hi: "सक्रिय कतारें", te: "క్రియాశీల సుబ్బులు" },
  recentActivity: { en: "Recent Activity", hi: "हाल की गतिविधि", te: "ఇటీవలి కార్యకలాపం" },
  manageServices: { en: "Manage Services", hi: "सेवाएं प्रबंधित करें", te: "సేవలను నిర్వహించండి" },
  analytics: { en: "Analytics", hi: "एनालिटिक्स", te: "విశ్లేషణలు" },

  // Common
  save: { en: "Save", hi: "सहेजें", te: "సేవ్ చేయండి" },
  cancel: { en: "Cancel", hi: "रद्द करें", te: "రద్దు చేయండి" },
  submit: { en: "Submit", hi: "जमा करें", te: "సమర్పించండి" },
  loading: { en: "Loading...", hi: "लोड हो रहा है...", te: "లోడ్ చేస్తున్నారు..." },
  error: { en: "Error", hi: "त्रुटि", te: "లోపం" },
  success: { en: "Success", hi: "सफलता", te: "విజయం" },
  back: { en: "Back", hi: "वापस", te: "బ్యాక్" },
  next: { en: "Next", hi: "अगला", te: "తరువాత" },
  download: { en: "Download", hi: "डाउनलोड", te: "డౌన్‌లోడ్ చేయండి" },
  share: { en: "Share", hi: "साझा करें", te: "భాగస్వామ్యం చేయండి" },
  switchLanguage: { en: "हिंदी", hi: "ఇంగ్లీష్", te: "English" },
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
    if (stored && (stored === "en" || stored === "hi" || stored === "te")) {
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
