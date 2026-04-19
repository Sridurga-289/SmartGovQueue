"use client"

import { useEffect, useState } from "react"
import { Clock, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type QueueTrackerProps = {
  position: number
  totalInQueue?: number
  estimatedWaitMinutes?: number
  currentlyServing?: number
  className?: string
}

export function QueueTracker({
  position,
  totalInQueue = 20,
  estimatedWaitMinutes,
  currentlyServing,
  className,
}: QueueTrackerProps) {
  const { t } = useLanguage()
  const [animatedPosition, setAnimatedPosition] = useState(position + 5)
  const [serving, setServing] = useState(currentlyServing || Math.max(1, position - 3))

  const waitTime = estimatedWaitMinutes || position * 5
  const progress = Math.max(0, Math.min(100, ((totalInQueue - position) / totalInQueue) * 100))

  useEffect(() => {
    // Animate position counting down
    const timer = setTimeout(() => {
      setAnimatedPosition(position)
    }, 300)

    return () => clearTimeout(timer)
  }, [position])

  // Simulate queue movement
  useEffect(() => {
    if (position <= 1) return

    const interval = setInterval(() => {
      setServing((prev) => {
        const next = prev + 1
        if (next >= position) {
          clearInterval(interval)
          return prev
        }
        return next
      })
    }, 15000) // Move queue every 15 seconds for demo

    return () => clearInterval(interval)
  }, [position])

  const isAlmostTurn = position <= 3

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-500",
        isAlmostTurn && "border-accent shadow-lg shadow-accent/20",
        className
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          {t("queueStatus")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{t("yourPosition")}</p>
            <div className="relative">
              <p
                className={cn(
                  "text-5xl font-bold transition-all duration-500",
                  isAlmostTurn ? "text-accent" : "text-primary"
                )}
              >
                {animatedPosition}
              </p>
              {isAlmostTurn && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    !
                  </span>
                </span>
              )}
            </div>
          </div>

          <div className="h-16 w-px bg-border" />

          <div className="text-center">
            <p className="text-sm text-muted-foreground">{t("currentlyServing")}</p>
            <p className="text-5xl font-bold text-muted-foreground">{serving}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("queueStatus")}</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <div className="flex items-center justify-center gap-2 rounded-lg bg-muted/50 p-4">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">{t("estimatedWait")}:</span>
          <span className="text-xl font-bold text-primary">
            {waitTime} {t("minutes")}
          </span>
        </div>

        {isAlmostTurn && (
          <div className="animate-pulse rounded-lg bg-accent/20 p-4 text-center">
            <p className="font-medium text-accent">{t("yourTurnSoon")}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
