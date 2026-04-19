"use client"

import { useState } from "react"
import Link from "next/link"
import {
  CalendarPlus,
  Clock,
  Download,
  FileText,
  MapPin,
  Share2,
  Ticket,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useUser } from "@/contexts/user-context"
import { Navbar } from "@/components/navbar"
import { AnimatedButton } from "@/components/animated-button"
import { QRToken } from "@/components/qr-token"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Empty } from "@/components/ui/empty"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import type { Booking } from "@/contexts/user-context"

export default function DocumentsPage() {
  const { t } = useLanguage()
  const { bookings } = useUser()
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const scheduledBookings = bookings.filter((b) => b.status === "scheduled" || b.status === "in-queue")
  const completedBookings = bookings.filter((b) => b.status === "completed")
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled")

  const handleDownload = (booking: Booking) => {
    // Create a simple text content for the token
    const content = `
SmartGov Queue Token
====================
Token Number: ${booking.tokenNumber}
Service: ${booking.service}
Date: ${booking.date}
Time: ${booking.time}
Location: ${booking.location}
Status: ${booking.status}
    `.trim()

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `SmartGov-Token-${booking.tokenNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShare = async (booking: Booking) => {
    const shareData = {
      title: "SmartGov Queue Token",
      text: `My appointment for ${booking.service} on ${booking.date} at ${booking.time}. Token: ${booking.tokenNumber}`,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log("Share cancelled")
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareData.text)
      alert("Token details copied to clipboard!")
    }
  }

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-lg",
        booking.status === "cancelled" && "opacity-60"
      )}
    >
      <CardContent className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <p className="font-semibold">{booking.service}</p>
            <p className="font-mono text-lg text-primary">{booking.tokenNumber}</p>
          </div>
          <div
            className={cn(
              "rounded-full px-2 py-1 text-xs font-medium",
              booking.status === "scheduled" && "bg-accent/20 text-accent",
              booking.status === "in-queue" && "bg-primary/20 text-primary",
              booking.status === "completed" && "bg-muted text-muted-foreground",
              booking.status === "cancelled" && "bg-destructive/20 text-destructive"
            )}
          >
            {booking.status.replace("-", " ").toUpperCase()}
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {booking.date} at {booking.time}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {booking.location}
          </div>
        </div>

        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 transition-all duration-300 hover:scale-105"
                onClick={() => setSelectedBooking(booking)}
              >
                <Ticket className="mr-2 h-4 w-4" />
                View Token
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{t("tokenNumber")}</DialogTitle>
                <DialogDescription>
                  Show this QR code at the service center
                </DialogDescription>
              </DialogHeader>
              {selectedBooking && <QRToken booking={selectedBooking} />}
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            className="transition-all duration-300 hover:scale-105"
            onClick={() => handleDownload(booking)}
          >
            <Download className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="transition-all duration-300 hover:scale-105"
            onClick={() => handleShare(booking)}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const EmptyState = ({ type }: { type: string }) => (
    <Empty
      icon={FileText}
      title={`No ${type} appointments`}
      description={
        type === "scheduled"
          ? "Book an appointment to see your tokens here"
          : `You don't have any ${type} appointments yet`
      }
    >
      {type === "scheduled" && (
        <Link href="/citizen/book">
          <AnimatedButton className="mt-4 gap-2">
            <CalendarPlus className="h-4 w-4" />
            {t("bookAppointment")}
          </AnimatedButton>
        </Link>
      )}
    </Empty>
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold">{t("documents")}</h1>
            <p className="text-muted-foreground">
              View, download, and share your appointment tokens
            </p>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger
                value="active"
                className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Active ({scheduledBookings.length})
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Completed ({completedBookings.length})
              </TabsTrigger>
              <TabsTrigger
                value="cancelled"
                className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Cancelled ({cancelledBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              {scheduledBookings.length === 0 ? (
                <EmptyState type="scheduled" />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {scheduledBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed">
              {completedBookings.length === 0 ? (
                <EmptyState type="completed" />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {completedBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="cancelled">
              {cancelledBookings.length === 0 ? (
                <EmptyState type="cancelled" />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {cancelledBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
