"use client"

import { QRCodeSVG } from "qrcode.react"
import { useLanguage } from "@/contexts/language-context"
import type { Booking } from "@/contexts/user-context"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type QRTokenProps = {
  booking: Booking
  className?: string
}

export function QRToken({ booking, className }: QRTokenProps) {
  const { t } = useLanguage()

  const qrData = JSON.stringify({
    token: booking.tokenNumber,
    service: booking.service,
    date: booking.date,
    time: booking.time,
    location: booking.location,
  })

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-2 border-primary/20 bg-card",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      <CardContent className="relative flex flex-col items-center gap-4 p-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">{t("tokenNumber")}</p>
          <p className="text-3xl font-bold tracking-wider text-primary">
            {booking.tokenNumber}
          </p>
        </div>

        <div className="rounded-xl bg-card p-3 shadow-inner">
          <QRCodeSVG
            value={qrData}
            size={160}
            level="H"
            includeMargin
            bgColor="transparent"
            fgColor="currentColor"
            className="text-foreground"
          />
        </div>

        <div className="text-center">
          <p className="font-medium">{booking.service}</p>
          <p className="text-sm text-muted-foreground">
            {booking.date} | {booking.time}
          </p>
          <p className="text-sm text-muted-foreground">{booking.location}</p>
        </div>

        <div
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium",
            booking.status === "scheduled" && "bg-accent/20 text-accent",
            booking.status === "in-queue" && "bg-primary/20 text-primary",
            booking.status === "completed" && "bg-muted text-muted-foreground",
            booking.status === "cancelled" && "bg-destructive/20 text-destructive"
          )}
        >
          {booking.status.replace("-", " ").toUpperCase()}
        </div>
      </CardContent>
    </Card>
  )
}
