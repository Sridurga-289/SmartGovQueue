"use client"

import { useEffect, useState } from "react"
import { Bell, MessageSquare, Phone } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type SMSNotificationProps = {
  phoneNumber: string
  appointmentTime: string
  serviceName: string
  className?: string
}

export function SMSNotification({
  phoneNumber,
  appointmentTime,
  serviceName,
  className,
}: SMSNotificationProps) {
  const { t } = useLanguage()
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Parse appointment time and calculate countdown
    const [hours, minutes] = appointmentTime.split(":").map(Number)
    const now = new Date()
    const appointment = new Date()
    appointment.setHours(hours, minutes, 0, 0)

    if (appointment < now) {
      appointment.setDate(appointment.getDate() + 1)
    }

    const updateCountdown = () => {
      const currentTime = new Date()
      const diff = appointment.getTime() - currentTime.getTime()

      if (diff <= 0) {
        setCountdown({ hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const h = Math.floor(diff / (1000 * 60 * 60))
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((diff % (1000 * 60)) / 1000)

      setCountdown({ hours: h, minutes: m, seconds: s })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    // Animate in
    setTimeout(() => setIsVisible(true), 100)

    return () => clearInterval(interval)
  }, [appointmentTime])

  const formatNumber = (n: number) => n.toString().padStart(2, "0")

  return (
    <Card
      className={cn(
        "overflow-hidden border-accent/30 bg-gradient-to-br from-accent/10 to-transparent transition-all duration-500",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="relative">
            <MessageSquare className="h-5 w-5 text-accent" />
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
            </span>
          </div>
          {t("smsNotification")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>
            {t("smsSent")} <span className="font-medium text-foreground">{phoneNumber}</span>
          </span>
        </div>

        <div className="rounded-lg bg-card p-4 shadow-inner">
          <div className="mb-2 flex items-center gap-2">
            <Bell className="h-4 w-4 text-accent" />
            <span className="font-medium">{t("appointmentReminder")}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your appointment for <span className="font-medium text-foreground">{serviceName}</span>{" "}
            is scheduled at <span className="font-medium text-foreground">{appointmentTime}</span>
          </p>
        </div>

        <div>
          <p className="mb-2 text-sm text-muted-foreground">{t("timeRemaining")}</p>
          <div className="flex justify-center gap-2">
            {[
              { value: countdown.hours, label: "H" },
              { value: countdown.minutes, label: "M" },
              { value: countdown.seconds, label: "S" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-lg bg-primary/10 px-4 py-2"
              >
                <span className="text-2xl font-bold tabular-nums text-primary">
                  {formatNumber(item.value)}
                </span>
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
