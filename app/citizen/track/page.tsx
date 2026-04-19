"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarPlus, Clock, MapPin, Search, Ticket } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useUser } from "@/contexts/user-context"
import { Navbar } from "@/components/navbar"
import { AnimatedButton } from "@/components/animated-button"
import { QueueTracker } from "@/components/queue-tracker"
import { QRToken } from "@/components/qr-token"
import { SMSNotification } from "@/components/sms-notification"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Empty } from "@/components/ui/empty"
import { cn } from "@/lib/utils"
import type { Booking } from "@/contexts/user-context"

export default function TrackQueuePage() {
  const { t } = useLanguage()
  const { user, bookings } = useUser()
  const [searchToken, setSearchToken] = useState("")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const activeBookings = bookings.filter(
    (b) => b.status === "scheduled" || b.status === "in-queue"
  )

  const handleSearch = () => {
    const found = bookings.find(
      (b) => b.tokenNumber.toLowerCase() === searchToken.toLowerCase()
    )
    if (found) {
      setSelectedBooking(found)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold">{t("trackQueue")}</h1>
            <p className="text-muted-foreground">
              Track your position in the queue and get real-time updates
            </p>
          </div>

          {/* Token Search */}
          <Card className="mb-8 border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Search by Token
              </CardTitle>
              <CardDescription>
                Enter your token number to track your queue position
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter token (e.g., SG1234)"
                  value={searchToken}
                  onChange={(e) => setSearchToken(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                />
                <AnimatedButton onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                  Search
                </AnimatedButton>
              </div>
            </CardContent>
          </Card>

          {/* Selected Booking Details */}
          {selectedBooking && (
            <div className="mb-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <QueueTracker
                  position={selectedBooking.queuePosition || 5}
                  totalInQueue={20}
                />
                <QRToken booking={selectedBooking} />
              </div>
              <SMSNotification
                phoneNumber={user?.phone || "+91 9876543210"}
                appointmentTime={selectedBooking.time}
                serviceName={selectedBooking.service}
              />
            </div>
          )}

          {/* Active Bookings */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{t("todayAppointments")}</h2>
            {activeBookings.length === 0 ? (
              <Empty
                icon={Ticket}
                title="No Active Appointments"
                description="You don't have any active appointments. Book one to get started!"
              >
                <Link href="/citizen/book">
                  <AnimatedButton className="mt-4 gap-2">
                    <CalendarPlus className="h-4 w-4" />
                    {t("bookAppointment")}
                  </AnimatedButton>
                </Link>
              </Empty>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {activeBookings.map((booking) => (
                  <Card
                    key={booking.id}
                    className={cn(
                      "cursor-pointer border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
                      selectedBooking?.id === booking.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    )}
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <CardContent className="p-4">
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{booking.service}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.tokenNumber}
                          </p>
                        </div>
                        <div
                          className={cn(
                            "rounded-full px-2 py-1 text-xs font-medium",
                            booking.status === "scheduled" && "bg-accent/20 text-accent",
                            booking.status === "in-queue" && "bg-primary/20 text-primary"
                          )}
                        >
                          {booking.status === "scheduled" ? "Scheduled" : "In Queue"}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {booking.date} at {booking.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {booking.location}
                        </div>
                      </div>
                      {booking.queuePosition && (
                        <div className="mt-3 flex items-center justify-between rounded-lg bg-muted/50 p-2">
                          <span className="text-sm">{t("yourPosition")}</span>
                          <span className="text-lg font-bold text-primary">
                            #{booking.queuePosition}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
