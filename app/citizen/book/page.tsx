"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  Building2,
  CalendarDays,
  Check,
  Clock,
  CreditCard,
  Heart,
  Phone,
  MapPin,
  GraduationCap,
  Wheat,
  FileText,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useUser } from "@/contexts/user-context"
import { Navbar } from "@/components/navbar"
import { AnimatedButton } from "@/components/animated-button"
import { QRToken } from "@/components/qr-token"
import { SMSNotification } from "@/components/sms-notification"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Booking } from "@/contexts/user-context"

// Service definitions with required documents
const serviceCategories = [
  {
    id: "government",
    icon: Building2,
    services: [
      { 
        id: "passport", 
        name: "Passport Application",
        nameHi: "पासपोर्ट आवेदन",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "PAN Card", nameHi: "पैन कार्ड", mandatory: true },
          { name: "Birth Certificate", nameHi: "जन्म प्रमाण पत्र", mandatory: true },
          { name: "Address Proof (Electricity Bill/Bank Statement)", nameHi: "पता प्रमाण (बिजली बिल/बैंक स्टेटमेंट)", mandatory: true },
          { name: "2 Passport Size Photos", nameHi: "2 पासपोर्ट साइज फोटो", mandatory: true },
          { name: "Old Passport (if renewal)", nameHi: "पुराना पासपोर्ट (यदि नवीनीकरण)", mandatory: false },
        ]
      },
      { 
        id: "aadhaar", 
        name: "Aadhaar Card",
        nameHi: "आधार कार्ड",
        documents: [
          { name: "Proof of Identity (Voter ID/PAN/Driving License)", nameHi: "पहचान प्रमाण (वोटर आईडी/पैन/ड्राइविंग लाइसेंस)", mandatory: true },
          { name: "Proof of Address", nameHi: "पता प्रमाण", mandatory: true },
          { name: "Date of Birth Proof", nameHi: "जन्म तिथि प्रमाण", mandatory: true },
          { name: "Mobile Number", nameHi: "मोबाइल नंबर", mandatory: true },
        ]
      },
      { 
        id: "driving", 
        name: "Driving License",
        nameHi: "ड्राइविंग लाइसेंस",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "Address Proof", nameHi: "पता प्रमाण", mandatory: true },
          { name: "Age Proof (Birth Certificate/10th Marksheet)", nameHi: "आयु प्रमाण (जन्म प्रमाण पत्र/10वीं मार्कशीट)", mandatory: true },
          { name: "Passport Size Photos (4 copies)", nameHi: "पासपोर्ट साइज फोटो (4 प्रतियां)", mandatory: true },
          { name: "Medical Certificate (Form 1-A)", nameHi: "मेडिकल सर्टिफिकेट (फॉर्म 1-A)", mandatory: true },
          { name: "Learner's License (for permanent)", nameHi: "लर्नर्स लाइसेंस (स्थायी के लिए)", mandatory: false },
        ]
      },
      { 
        id: "ration", 
        name: "Ration Card",
        nameHi: "राशन कार्ड",
        documents: [
          { name: "Aadhaar Card of all family members", nameHi: "परिवार के सभी सदस्यों का आधार कार्ड", mandatory: true },
          { name: "Address Proof", nameHi: "पता प्रमाण", mandatory: true },
          { name: "Income Certificate", nameHi: "आय प्रमाण पत्र", mandatory: true },
          { name: "Passport Size Photos", nameHi: "पासपोर्ट साइज फोटो", mandatory: true },
          { name: "Gas Connection Proof", nameHi: "गैस कनेक्शन प्रमाण", mandatory: false },
        ]
      },
      { 
        id: "voter", 
        name: "Voter ID Card",
        nameHi: "मतदाता पहचान पत्र",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "Address Proof", nameHi: "पता प्रमाण", mandatory: true },
          { name: "Age Proof (18+ years)", nameHi: "आयु प्रमाण (18+ वर्ष)", mandatory: true },
          { name: "Passport Size Photo", nameHi: "पासपोर्ट साइज फोटो", mandatory: true },
        ]
      },
      { 
        id: "income", 
        name: "Income Certificate",
        nameHi: "आय प्रमाण पत्र",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "Ration Card", nameHi: "राशन कार्ड", mandatory: true },
          { name: "Salary Slip / Self Declaration", nameHi: "वेतन पर्ची / स्व-घोषणा", mandatory: true },
          { name: "Bank Statement (6 months)", nameHi: "बैंक स्टेटमेंट (6 महीने)", mandatory: false },
        ]
      },
    ],
  },
  {
    id: "agriculture",
    icon: Wheat,
    services: [
      { 
        id: "rythu_bandhu", 
        name: "Rythu Bandhu",
        nameHi: "रायथू बंधु",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "Land Ownership Documents (Pattadar Passbook)", nameHi: "भूमि स्वामित्व दस्तावेज (पट्टादार पासबुक)", mandatory: true },
          { name: "Bank Passbook (First Page)", nameHi: "बैंक पासबुक (पहला पन्ना)", mandatory: true },
          { name: "Passport Size Photo", nameHi: "पासपोर्ट साइज फोटो", mandatory: true },
          { name: "Mobile Number linked with Aadhaar", nameHi: "आधार से जुड़ा मोबाइल नंबर", mandatory: true },
        ]
      },
      { 
        id: "pm_kisan", 
        name: "PM Kisan Samman Nidhi",
        nameHi: "पीएम किसान सम्मान निधि",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "Land Records (Khata/Khatauni)", nameHi: "भूमि रिकॉर्ड (खाता/खतौनी)", mandatory: true },
          { name: "Bank Account Details", nameHi: "बैंक खाता विवरण", mandatory: true },
          { name: "Mobile Number", nameHi: "मोबाइल नंबर", mandatory: true },
        ]
      },
      { 
        id: "crop_insurance", 
        name: "Fasal Bima Yojana",
        nameHi: "फसल बीमा योजना",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "Land Records", nameHi: "भूमि रिकॉर्ड", mandatory: true },
          { name: "Bank Account Details", nameHi: "बैंक खाता विवरण", mandatory: true },
          { name: "Sowing Certificate", nameHi: "बुवाई प्रमाण पत्र", mandatory: true },
          { name: "Previous Season Crop Details", nameHi: "पिछले मौसम की फसल विवरण", mandatory: false },
        ]
      },
      { 
        id: "kisan_credit", 
        name: "Kisan Credit Card",
        nameHi: "किसान क्रेडिट कार्ड",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "PAN Card", nameHi: "पैन कार्ड", mandatory: true },
          { name: "Land Ownership Documents", nameHi: "भूमि स्वामित्व दस्तावेज", mandatory: true },
          { name: "Passport Size Photos", nameHi: "पासपोर्ट साइज फोटो", mandatory: true },
          { name: "Crop Pattern Details", nameHi: "फसल पैटर्न विवरण", mandatory: true },
        ]
      },
    ],
  },
  {
    id: "insurance",
    icon: Heart,
    services: [
      { 
        id: "ayushman_bharat", 
        name: "Ayushman Bharat (PMJAY)",
        nameHi: "आयुष्मान भारत (PMJAY)",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "Ration Card (BPL/APL)", nameHi: "राशन कार्ड (BPL/APL)", mandatory: true },
          { name: "Income Certificate", nameHi: "आय प्रमाण पत्र", mandatory: true },
          { name: "Mobile Number", nameHi: "मोबाइल नंबर", mandatory: true },
          { name: "Family Details", nameHi: "परिवार विवरण", mandatory: true },
        ]
      },
      { 
        id: "pmsby", 
        name: "PM Suraksha Bima Yojana",
        nameHi: "पीएम सुरक्षा बीमा योजना",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "Bank Account with Aadhaar linkage", nameHi: "आधार से जुड़ा बैंक खाता", mandatory: true },
          { name: "Age Proof (18-70 years)", nameHi: "आयु प्रमाण (18-70 वर्ष)", mandatory: true },
        ]
      },
      { 
        id: "pmjjby", 
        name: "PM Jeevan Jyoti Bima",
        nameHi: "पीएम जीवन ज्योति बीमा",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "Bank Account Details", nameHi: "बैंक खाता विवरण", mandatory: true },
          { name: "Age Proof (18-50 years)", nameHi: "आयु प्रमाण (18-50 वर्ष)", mandatory: true },
          { name: "Nominee Details", nameHi: "नॉमिनी विवरण", mandatory: true },
        ]
      },
      { 
        id: "atal_pension", 
        name: "Atal Pension Yojana",
        nameHi: "अटल पेंशन योजना",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "Bank Account Details", nameHi: "बैंक खाता विवरण", mandatory: true },
          { name: "Mobile Number", nameHi: "मोबाइल नंबर", mandatory: true },
          { name: "Nominee Aadhaar Card", nameHi: "नॉमिनी आधार कार्ड", mandatory: true },
        ]
      },
    ],
  },
  {
    id: "education",
    icon: GraduationCap,
    services: [
      { 
        id: "scholarship", 
        name: "Post Matric Scholarship",
        nameHi: "पोस्ट मैट्रिक छात्रवृत्ति",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "Caste Certificate (SC/ST/OBC)", nameHi: "जाति प्रमाण पत्र (SC/ST/OBC)", mandatory: true },
          { name: "Income Certificate", nameHi: "आय प्रमाण पत्र", mandatory: true },
          { name: "Previous Year Marksheet", nameHi: "पिछले वर्ष की मार्कशीट", mandatory: true },
          { name: "Admission Receipt/Fee Receipt", nameHi: "प्रवेश रसीद/शुल्क रसीद", mandatory: true },
          { name: "Bank Account Details", nameHi: "बैंक खाता विवरण", mandatory: true },
          { name: "Bonafide Certificate from Institution", nameHi: "संस्थान से बोनाफाइड प्रमाण पत्र", mandatory: true },
        ]
      },
      { 
        id: "merit_scholarship", 
        name: "Merit Scholarship",
        nameHi: "मेरिट छात्रवृत्ति",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "10th/12th Marksheet (80%+ marks)", nameHi: "10वीं/12वीं मार्कशीट (80%+ अंक)", mandatory: true },
          { name: "Income Certificate", nameHi: "आय प्रमाण पत्र", mandatory: true },
          { name: "Bank Account Details", nameHi: "बैंक खाता विवरण", mandatory: true },
          { name: "College Admission Proof", nameHi: "कॉलेज प्रवेश प्रमाण", mandatory: true },
        ]
      },
      { 
        id: "eamcet", 
        name: "EAMCET Registration",
        nameHi: "EAMCET पंजीकरण",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "10th Class Marksheet", nameHi: "10वीं कक्षा मार्कशीट", mandatory: true },
          { name: "12th Class Marksheet/Hall Ticket", nameHi: "12वीं कक्षा मार्कशीट/हॉल टिकट", mandatory: true },
          { name: "Caste Certificate (if applicable)", nameHi: "जाति प्रमाण पत्र (यदि लागू हो)", mandatory: false },
          { name: "Income Certificate", nameHi: "आय प्रमाण पत्र", mandatory: false },
          { name: "Passport Size Photo", nameHi: "पासपोर्ट साइज फोटो", mandatory: true },
          { name: "Signature Scan", nameHi: "हस्ताक्षर स्कैन", mandatory: true },
        ]
      },
      { 
        id: "neet", 
        name: "NEET Registration",
        nameHi: "NEET पंजीकरण",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "10th Class Marksheet", nameHi: "10वीं कक्षा मार्कशीट", mandatory: true },
          { name: "12th Class Marksheet (PCB)", nameHi: "12वीं कक्षा मार्कशीट (PCB)", mandatory: true },
          { name: "Category Certificate (if applicable)", nameHi: "श्रेणी प्रमाण पत्र (यदि लागू हो)", mandatory: false },
          { name: "Passport Size Photo (White Background)", nameHi: "पासपोर्ट साइज फोटो (सफेद बैकग्राउंड)", mandatory: true },
          { name: "Signature Scan", nameHi: "हस्ताक्षर स्कैन", mandatory: true },
          { name: "Left Thumb Impression", nameHi: "बाएं अंगूठे का निशान", mandatory: true },
        ]
      },
      { 
        id: "jee", 
        name: "JEE Main Registration",
        nameHi: "JEE Main पंजीकरण",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "10th Class Marksheet", nameHi: "10वीं कक्षा मार्कशीट", mandatory: true },
          { name: "12th Class Marksheet (PCM)", nameHi: "12वीं कक्षा मार्कशीट (PCM)", mandatory: true },
          { name: "Category Certificate (if applicable)", nameHi: "श्रेणी प्रमाण पत्र (यदि लागू हो)", mandatory: false },
          { name: "Passport Size Photo", nameHi: "पासपोर्ट साइज फोटो", mandatory: true },
          { name: "Signature Scan", nameHi: "हस्ताक्षर स्कैन", mandatory: true },
        ]
      },
      { 
        id: "ssc_cgl", 
        name: "SSC CGL Exam",
        nameHi: "SSC CGL परीक्षा",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "Graduation Certificate/Marksheet", nameHi: "स्नातक प्रमाण पत्र/मार्कशीट", mandatory: true },
          { name: "Photo ID Proof", nameHi: "फोटो आईडी प्रमाण", mandatory: true },
          { name: "Caste Certificate (if applicable)", nameHi: "जाति प्रमाण पत्र (यदि लागू हो)", mandatory: false },
          { name: "Passport Size Photo", nameHi: "पासपोर्ट साइज फोटो", mandatory: true },
        ]
      },
    ],
  },
  {
    id: "banking",
    icon: CreditCard,
    services: [
      { 
        id: "account", 
        name: "Bank Account Opening",
        nameHi: "बैंक खाता खोलना",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "PAN Card", nameHi: "पैन कार्ड", mandatory: true },
          { name: "Address Proof", nameHi: "पता प्रमाण", mandatory: true },
          { name: "Passport Size Photos (2)", nameHi: "पासपोर्ट साइज फोटो (2)", mandatory: true },
          { name: "Initial Deposit", nameHi: "प्रारंभिक जमा", mandatory: false },
        ]
      },
      { 
        id: "loan", 
        name: "Personal Loan Application",
        nameHi: "पर्सनल लोन आवेदन",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "PAN Card", nameHi: "पैन कार्ड", mandatory: true },
          { name: "Salary Slips (3 months)", nameHi: "वेतन पर्ची (3 महीने)", mandatory: true },
          { name: "Bank Statements (6 months)", nameHi: "बैंक स्टेटमेंट (6 महीने)", mandatory: true },
          { name: "Employment Proof", nameHi: "रोजगार प्रमाण", mandatory: true },
          { name: "Address Proof", nameHi: "पता प्रमाण", mandatory: true },
        ]
      },
      { 
        id: "kyc", 
        name: "KYC Update",
        nameHi: "KYC अपडेट",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "PAN Card", nameHi: "पैन कार्ड", mandatory: true },
          { name: "Recent Photograph", nameHi: "हाल की फोटो", mandatory: true },
          { name: "Address Proof (if changed)", nameHi: "पता प्रमाण (यदि बदला हो)", mandatory: false },
        ]
      },
      { 
        id: "mudra_loan", 
        name: "Mudra Loan",
        nameHi: "मुद्रा लोन",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "PAN Card", nameHi: "पैन कार्ड", mandatory: true },
          { name: "Business Plan", nameHi: "व्यापार योजना", mandatory: true },
          { name: "Business Registration/License", nameHi: "व्यापार पंजीकरण/लाइसेंस", mandatory: true },
          { name: "Bank Statements (6 months)", nameHi: "बैंक स्टेटमेंट (6 महीने)", mandatory: true },
          { name: "Address Proof", nameHi: "पता प्रमाण", mandatory: true },
        ]
      },
    ],
  },
  {
    id: "telecom",
    icon: Phone,
    services: [
      { 
        id: "sim", 
        name: "SIM Activation",
        nameHi: "सिम एक्टिवेशन",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "Passport Size Photo", nameHi: "पासपोर्ट साइज फोटो", mandatory: true },
          { name: "Address Proof", nameHi: "पता प्रमाण", mandatory: false },
        ]
      },
      { 
        id: "port", 
        name: "Mobile Number Porting",
        nameHi: "मोबाइल नंबर पोर्टिंग",
        documents: [
          { name: "Aadhaar Card", nameHi: "आधार कार्ड", mandatory: true },
          { name: "Current SIM", nameHi: "वर्तमान सिम", mandatory: true },
          { name: "Porting Request", nameHi: "पोर्टिंग अनुरोध", mandatory: true },
        ]
      },
    ],
  },
]

const locations = [
  "New Delhi - Connaught Place",
  "Mumbai - Andheri West",
  "Bangalore - MG Road",
  "Chennai - T. Nagar",
  "Kolkata - Park Street",
  "Hyderabad - Banjara Hills",
  "Hyderabad - Secunderabad",
  "Visakhapatnam - MVP Colony",
  "Vijayawada - Governorpet",
  "Warangal - Hanamkonda",
]

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
]

export default function BookingPage() {
  const { t, language } = useLanguage()
  const { user, addBooking } = useUser()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || "")
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null)

  const currentCategory = serviceCategories.find((c) => c.id === selectedCategory)
  const currentService = currentCategory?.services.find((s) => s.id === selectedService)

  const handleConfirmBooking = () => {
    if (!selectedService || !selectedDate || !selectedTime || !selectedLocation) return

    const serviceName = language === "hi" 
      ? currentService?.nameHi || currentService?.name || selectedService
      : currentService?.name || selectedService

    const booking = addBooking({
      service: serviceName,
      category: selectedCategory,
      date: selectedDate,
      time: selectedTime,
      location: selectedLocation,
      status: "scheduled",
    })

    setConfirmedBooking(booking)
    setStep(5)
  }

  const resetBooking = () => {
    setStep(1)
    setSelectedCategory("")
    setSelectedService("")
    setSelectedDate("")
    setSelectedTime("")
    setSelectedLocation("")
    setConfirmedBooking(null)
  }

  // Get tomorrow's date as minimum
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  const getCategoryName = (id: string) => {
    const names: Record<string, { en: string; hi: string }> = {
      government: { en: "Government Services", hi: "सरकारी सेवाएं" },
      agriculture: { en: "Agriculture & Farmer Welfare", hi: "कृषि और किसान कल्याण" },
      insurance: { en: "Insurance & Social Security", hi: "बीमा और सामाजिक सुरक्षा" },
      education: { en: "Education & Scholarships", hi: "शिक्षा और छात्रवृत्ति" },
      banking: { en: "Banking & Finance", hi: "बैंकिंग और वित्त" },
      telecom: { en: "Telecom Services", hi: "दूरसंचार सेवाएं" },
    }
    return language === "hi" ? names[id]?.hi : names[id]?.en
  }

  const getCategoryDesc = (id: string) => {
    const descs: Record<string, { en: string; hi: string }> = {
      government: { en: "Passport, Aadhaar, License, Certificates", hi: "पासपोर्ट, आधार, लाइसेंस, प्रमाण पत्र" },
      agriculture: { en: "Rythu Bandhu, PM Kisan, Crop Insurance", hi: "रायथू बंधु, पीएम किसान, फसल बीमा" },
      insurance: { en: "Ayushman Bharat, PMSBY, Pension Schemes", hi: "आयुष्मान भारत, PMSBY, पेंशन योजनाएं" },
      education: { en: "Scholarships, EAMCET, NEET, JEE, SSC", hi: "छात्रवृत्ति, EAMCET, NEET, JEE, SSC" },
      banking: { en: "Account, Loans, KYC, Mudra", hi: "खाता, ऋण, KYC, मुद्रा" },
      telecom: { en: "SIM, Porting, Services", hi: "सिम, पोर्टिंग, सेवाएं" },
    }
    return language === "hi" ? descs[id]?.hi : descs[id]?.en
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                      step >= s
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground"
                    )}
                  >
                    {step > s ? <Check className="h-5 w-5" /> : s}
                  </div>
                  {s < 5 && (
                    <div
                      className={cn(
                        "h-1 w-8 transition-all duration-300 sm:w-16",
                        step > s ? "bg-primary" : "bg-border"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Select Category */}
          {step === 1 && (
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle>{t("selectService")}</CardTitle>
                <CardDescription>
                  {language === "hi" ? "शुरू करने के लिए एक सेवा श्रेणी चुनें" : "Choose a service category to get started"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {serviceCategories.map((category) => (
                    <Card
                      key={category.id}
                      className={cn(
                        "cursor-pointer border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
                        selectedCategory === category.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      )}
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setSelectedService("")
                      }}
                    >
                      <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                        <div
                          className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-xl transition-colors",
                            selectedCategory === category.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          <category.icon className="h-7 w-7" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{getCategoryName(category.id)}</h3>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {getCategoryDesc(category.id)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedCategory && currentCategory && (
                  <div className="mt-6 space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      {language === "hi" ? "एक सेवा चुनें:" : "Select a service:"}
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {currentCategory.services.map((service) => (
                        <Button
                          key={service.id}
                          variant={selectedService === service.id ? "default" : "outline"}
                          className="h-auto justify-start py-3 transition-all duration-300 hover:scale-[1.02]"
                          onClick={() => setSelectedService(service.id)}
                        >
                          {language === "hi" ? service.nameHi : service.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <AnimatedButton
                    onClick={() => setStep(2)}
                    disabled={!selectedService}
                  >
                    {t("next")}
                  </AnimatedButton>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Select Date */}
          {step === 2 && (
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  {t("selectDate")}
                </CardTitle>
                <CardDescription>
                  {language === "hi" ? "अपनी पसंदीदा अपॉइंटमेंट तारीख चुनें" : "Choose your preferred appointment date"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Field>
                  <FieldLabel>{language === "hi" ? "अपॉइंटमेंट तारीख" : "Appointment Date"}</FieldLabel>
                  <Input
                    type="date"
                    min={minDate}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                  />
                </Field>
                <div className="mt-6 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="transition-all duration-300 hover:scale-105"
                  >
                    {t("back")}
                  </Button>
                  <AnimatedButton onClick={() => setStep(3)} disabled={!selectedDate}>
                    {t("next")}
                  </AnimatedButton>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Select Time & Location */}
          {step === 3 && (
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  {t("selectTime")} & {t("selectLocation")}
                </CardTitle>
                <CardDescription>
                  {language === "hi" ? "अपना पसंदीदा समय स्लॉट और स्थान चुनें" : "Choose your preferred time slot and location"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="mb-3 text-sm font-medium text-muted-foreground">
                    {language === "hi" ? "उपलब्ध समय स्लॉट:" : "Available time slots:"}
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        className="transition-all duration-300 hover:scale-105"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {language === "hi" ? "स्थान चुनें:" : "Select location:"}
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {locations.map((location) => (
                      <Button
                        key={location}
                        variant={selectedLocation === location ? "default" : "outline"}
                        className="h-auto justify-start py-3 transition-all duration-300 hover:scale-[1.02]"
                        onClick={() => setSelectedLocation(location)}
                      >
                        {location}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="transition-all duration-300 hover:scale-105"
                  >
                    {t("back")}
                  </Button>
                  <AnimatedButton
                    onClick={() => setStep(4)}
                    disabled={!selectedTime || !selectedLocation}
                  >
                    {t("next")}
                  </AnimatedButton>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Phone Number & Confirm */}
          {step === 4 && (
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle>{t("confirmBooking")}</CardTitle>
                <CardDescription>
                  {language === "hi" ? "अपने अपॉइंटमेंट विवरण की समीक्षा करें और पुष्टि करें" : "Review and confirm your appointment details"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-muted/50 p-4">
                  <h4 className="mb-3 font-medium">{t("appointmentDetails")}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === "hi" ? "सेवा:" : "Service:"}</span>
                      <span className="font-medium">
                        {language === "hi" ? currentService?.nameHi : currentService?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === "hi" ? "तारीख:" : "Date:"}</span>
                      <span className="font-medium">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === "hi" ? "समय:" : "Time:"}</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === "hi" ? "स्थान:" : "Location:"}</span>
                      <span className="font-medium">{selectedLocation}</span>
                    </div>
                  </div>
                </div>

                <Field>
                  <FieldLabel htmlFor="phone">
                    {t("phoneNumber")} ({language === "hi" ? "SMS रिमाइंडर के लिए" : "for SMS reminders"})
                  </FieldLabel>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                  />
                </Field>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setStep(3)}
                    className="transition-all duration-300 hover:scale-105"
                  >
                    {t("back")}
                  </Button>
                  <AnimatedButton onClick={handleConfirmBooking}>
                    {t("confirmBooking")}
                  </AnimatedButton>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 5: Confirmation with Required Documents */}
          {step === 5 && confirmedBooking && (
            <div className="space-y-6">
              <Card className="border-accent/30 bg-accent/5 shadow-lg">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Check className="h-8 w-8" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold">{t("bookingConfirmed")}</h2>
                  <p className="text-muted-foreground">
                    {language === "hi" 
                      ? "आपकी अपॉइंटमेंट सफलतापूर्वक बुक हो गई है। कृपया अपना टोकन सहेजें।"
                      : "Your appointment has been successfully booked. Please save your token."}
                  </p>
                </CardContent>
              </Card>

              {/* Required Documents Section */}
              {currentService && currentService.documents && (
                <Card className="border-amber-500/30 bg-amber-50 shadow-lg dark:bg-amber-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                      <FileText className="h-5 w-5" />
                      {language === "hi" ? "आवश्यक दस्तावेज़" : "Required Documents"}
                    </CardTitle>
                    <CardDescription className="text-amber-600 dark:text-amber-500">
                      {language === "hi" 
                        ? "कृपया अपनी अपॉइंटमेंट पर ये दस्तावेज़ लाएं"
                        : "Please bring these documents to your appointment"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentService.documents.map((doc, index) => (
                        <div 
                          key={index}
                          className={cn(
                            "flex items-start gap-3 rounded-lg p-3 transition-colors",
                            doc.mandatory 
                              ? "bg-amber-100/50 dark:bg-amber-900/20" 
                              : "bg-muted/50"
                          )}
                        >
                          {doc.mandatory ? (
                            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
                          ) : (
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                          )}
                          <div className="flex-1">
                            <p className={cn(
                              "font-medium",
                              doc.mandatory ? "text-amber-800 dark:text-amber-300" : "text-foreground"
                            )}>
                              {language === "hi" ? doc.nameHi : doc.name}
                            </p>
                          </div>
                          <Badge 
                            variant={doc.mandatory ? "default" : "secondary"}
                            className={cn(
                              "shrink-0",
                              doc.mandatory 
                                ? "bg-amber-600 hover:bg-amber-700 dark:bg-amber-700" 
                                : ""
                            )}
                          >
                            {doc.mandatory 
                              ? (language === "hi" ? "अनिवार्य" : "Mandatory")
                              : (language === "hi" ? "वैकल्पिक" : "Optional")
                            }
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-lg bg-primary/10 p-3">
                      <p className="text-sm text-primary">
                        <strong>{language === "hi" ? "नोट:" : "Note:"}</strong>{" "}
                        {language === "hi" 
                          ? "कृपया सभी दस्तावेज़ों की मूल और फोटोकॉपी दोनों लाएं।"
                          : "Please bring both original and photocopies of all documents."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                <QRToken booking={confirmedBooking} />
                <SMSNotification
                  phoneNumber={phoneNumber || user?.phone || "+91 9876543210"}
                  appointmentTime={selectedTime}
                  serviceName={confirmedBooking.service}
                />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <AnimatedButton onClick={() => router.push("/citizen/track")}>
                  {t("trackQueue")}
                </AnimatedButton>
                <Button
                  variant="outline"
                  onClick={resetBooking}
                  className="transition-all duration-300 hover:scale-105"
                >
                  {language === "hi" ? "एक और अपॉइंटमेंट बुक करें" : "Book Another Appointment"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
