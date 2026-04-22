"use client"

import Link from "next/link"
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  Clock,
  CreditCard,
  GraduationCap,
  Heart,
  MessageSquare,
  QrCode,
  Shield,
  Wheat,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useUser } from "@/contexts/user-context"
import { useTheme } from "next-themes"
import { Navbar } from "@/components/navbar"
import { AnimatedButton } from "@/components/animated-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GradientBackground } from "@/components/gradient-background"
import { Sparkles } from "@/components/sparkles"
import { GlowCard } from "@/components/glow-card"
import { useState, useEffect } from "react"

export default function LandingPage() {
  const { t, language } = useLanguage()
  const { user } = useUser()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: CalendarCheck,
      title: t("easyBooking"),
      description: t("easyBookingDesc"),
    },
    {
      icon: Clock,
      title: t("realTimeTracking"),
      description: t("realTimeTrackingDesc"),
    },
    {
      icon: MessageSquare,
      title: t("smsReminders"),
      description: t("smsRemindersDesc"),
    },
    {
      icon: QrCode,
      title: t("qrTokens"),
      description: t("qrTokensDesc"),
    },
  ]

  const services = [
    {
      icon: Building2,
      title: language === "hi" ? "सरकारी सेवाएं" : "Government Services",
      description: language === "hi" ? "पासपोर्ट, आधार, ड्राइविंग लाइसेंस, प्रमाण पत्र" : "Passport, Aadhaar, Driving License, Certificates",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Wheat,
      title: language === "hi" ? "कृषि और किसान कल्याण" : "Agriculture & Farmer Welfare",
      description: language === "hi" ? "रायथू बंधु, पीएम किसान, फसल बीमा, किसान क्रेडिट" : "Rythu Bandhu, PM Kisan, Crop Insurance, Kisan Credit",
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      icon: Heart,
      title: language === "hi" ? "बीमा और सामाजिक सुरक्षा" : "Insurance & Social Security",
      description: language === "hi" ? "आयुष्मान भारत, PMSBY, PMJJBY, अटल पेंशन" : "Ayushman Bharat, PMSBY, PMJJBY, Atal Pension",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      icon: GraduationCap,
      title: language === "hi" ? "शिक्षा और छात्रवृत्ति" : "Education & Scholarships",
      description: language === "hi" ? "छात्रवृत्ति, EAMCET, NEET, JEE, SSC परीक्षाएं" : "Scholarships, EAMCET, NEET, JEE, SSC Exams",
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
    {
      icon: CreditCard,
      title: language === "hi" ? "बैंकिंग और वित्त" : "Banking & Finance",
      description: language === "hi" ? "खाता खोलना, ऋण, KYC, मुद्रा लोन" : "Account Opening, Loans, KYC, Mudra Loan",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ]

  const stats = [
    { value: "10M+", label: "Appointments Booked" },
    { value: "500+", label: "Service Centers" },
    { value: "4.8", label: "User Rating" },
    { value: "30min", label: "Avg. Time Saved" },
  ]

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <GradientBackground isDark={theme === "dark"} className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:to-accent/10" />
          <div className="container relative px-4 py-20 md:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium animate-fade-in-down">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-primary">{language === "hi" ? "विश्वसनीय और कुशल सार्वजनिक सेवा" : language === "te" ? "విశ్వస్త మరియు సమర్థ ప్రజా సేవ" : "Trusted & Efficient Public Service"}</span>
              </div>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl animate-fade-in-up stagger-1">
                {t("heroTitle")}
              </h1>
              <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl animate-fade-in-up stagger-2">
                {t("heroSubtitle")}
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up stagger-3">
                <Link href={user ? "/citizen/book" : "/auth/register"}>
                  <AnimatedButton size="lg" className="gap-2 px-8">
                    {t("getStarted")}
                    <ArrowRight className="h-4 w-4" />
                  </AnimatedButton>
                </Link>
                <Link href="#features">
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover-lift"
                  >
                    {t("learnMore")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="border-y border-border bg-muted/30 dark:bg-muted/20">
            <div className="container grid grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center transition-all duration-300 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                >
                  <p className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container px-4 py-20">
          <div className="mb-12 text-center animate-fade-in-up">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-gradient-animate">{t("features")}</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Everything you need for a seamless queue management experience
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <GlowCard
                key={index}
                className="group border-border/50 bg-card/50 dark:bg-card/30 transition-all duration-300 hover:border-primary/30 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:animate-glow">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </GlowCard>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-muted/30 dark:bg-muted/20 py-20">
          <div className="container px-4">
            <div className="mb-12 text-center animate-fade-in-up">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl text-gradient-animate">{t("services")}</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Universal queue management for all service sectors
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {services.map((service, index) => (
                <GlowCard
                  key={index}
                  className="group cursor-pointer border-border/50 bg-card dark:bg-card/50 transition-all duration-300 hover:border-primary/40 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div
                      className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${service.bgColor} ${service.color} transition-all duration-300 group-hover:scale-110 group-hover:animate-glow`}
                    >
                      <service.icon className="h-8 w-8" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container px-4 py-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-accent/80 to-primary px-6 py-16 text-center text-primary-foreground md:px-12 shadow-2xl animate-fade-in-up">
            <div className="absolute inset-0 opacity-50 animate-gradient" />
            <div className="absolute inset-0 from-primary/20 to-transparent bg-gradient-radial pointer-events-none" />
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                {language === "hi" ? "क्यू छोड़ने के लिए तैयार?" : language === "te" ? "క్యూని छన్నగా ఉండటానికి సిద్ధమైనారా?" : "Ready to Skip the Queue?"}
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-primary-foreground/80">
                {language === "hi" ? "SmartGov Queue के साथ समय बचाने वाली लाखों उपयोगकर्ताओं के साथ जुड़ें। आज ही अपनी पहली अपॉइंटमेंट बुक करें।" : language === "te" ? "SmartGov Queue తో సమయం ఆదా చేసే లక్షల మంది వినియోగదారుల చేరండి. ఈ రోజు మీ మొదటి నియామకాన్ని బుక్ చేయండి." : "Join millions of users who save time with SmartGov Queue. Book your first appointment today."}
              </p>
              <Link href={user ? "/citizen/book" : "/auth/register"}>
                <AnimatedButton
                  size="lg"
                  variant="secondary"
                  className="gap-2 bg-background text-foreground hover:bg-background/90"
                >
                  {t("getStarted")}
                  <ArrowRight className="h-4 w-4" />
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-muted/30 dark:bg-muted/20 animate-fade-in-up">
          <div className="container px-4 py-12">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent animate-glow">
                  <span className="text-lg font-bold text-primary-foreground">SG</span>
                </div>
                <span className="font-semibold">SmartGov Queue</span>
              </div>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} SmartGov Queue. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </GradientBackground>
    </div>
  )
}
