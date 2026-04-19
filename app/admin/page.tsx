"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Activity,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Heart,
  Phone,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useLanguage } from "@/contexts/language-context"
import { useUser } from "@/contexts/user-context"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const dailyStats = [
  { name: "Mon", appointments: 120, completed: 110 },
  { name: "Tue", appointments: 150, completed: 140 },
  { name: "Wed", appointments: 180, completed: 165 },
  { name: "Thu", appointments: 140, completed: 130 },
  { name: "Fri", appointments: 200, completed: 185 },
  { name: "Sat", appointments: 90, completed: 85 },
  { name: "Sun", appointments: 60, completed: 55 },
]

const serviceDistribution = [
  { name: "Government", value: 35, color: "hsl(var(--primary))" },
  { name: "Banking", value: 30, color: "hsl(var(--accent))" },
  { name: "Healthcare", value: 20, color: "hsl(var(--destructive))" },
  { name: "Telecom", value: 15, color: "hsl(var(--chart-3))" },
]

const hourlyTraffic = [
  { hour: "9AM", visitors: 45 },
  { hour: "10AM", visitors: 80 },
  { hour: "11AM", visitors: 120 },
  { hour: "12PM", visitors: 90 },
  { hour: "1PM", visitors: 60 },
  { hour: "2PM", visitors: 100 },
  { hour: "3PM", visitors: 130 },
  { hour: "4PM", visitors: 110 },
  { hour: "5PM", visitors: 75 },
]

const recentActivity = [
  {
    id: 1,
    action: "Appointment Completed",
    user: "Rajesh Kumar",
    service: "Passport Application",
    time: "2 mins ago",
    status: "completed",
  },
  {
    id: 2,
    action: "New Booking",
    user: "Priya Singh",
    service: "Account Opening",
    time: "5 mins ago",
    status: "new",
  },
  {
    id: 3,
    action: "Queue Updated",
    user: "System",
    service: "Government Services",
    time: "8 mins ago",
    status: "info",
  },
  {
    id: 4,
    action: "Appointment Cancelled",
    user: "Amit Patel",
    service: "Driving License",
    time: "15 mins ago",
    status: "cancelled",
  },
  {
    id: 5,
    action: "Appointment Completed",
    user: "Sneha Reddy",
    service: "Doctor Consultation",
    time: "20 mins ago",
    status: "completed",
  },
]

const queueStatus = [
  {
    category: "government",
    icon: Building2,
    waiting: 12,
    avgWait: 25,
    serving: 3,
  },
  {
    category: "banking",
    icon: CreditCard,
    waiting: 8,
    avgWait: 15,
    serving: 2,
  },
  {
    category: "healthcare",
    icon: Heart,
    waiting: 15,
    avgWait: 30,
    serving: 4,
  },
  {
    category: "telecom",
    icon: Phone,
    waiting: 5,
    avgWait: 10,
    serving: 2,
  },
]

export default function AdminDashboard() {
  const { t } = useLanguage()
  const { user } = useUser()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (user && user.role !== "admin") {
      router.push("/")
    }
  }, [user, router])

  if (!mounted || !user || user.role !== "admin") {
    return null
  }

  const stats = [
    {
      title: t("totalBookings"),
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: Calendar,
    },
    {
      title: t("todayAppointments"),
      value: "156",
      change: "+8%",
      trend: "up",
      icon: Users,
    },
    {
      title: t("avgWaitTime"),
      value: "18 min",
      change: "-15%",
      trend: "down",
      icon: Clock,
    },
    {
      title: t("activeQueues"),
      value: "24",
      change: "0%",
      trend: "neutral",
      icon: Activity,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{t("dashboard")}</h1>
          <p className="text-muted-foreground">
            Real-time analytics and queue management overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl",
                      "bg-primary/10 text-primary"
                    )}
                  >
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                      stat.trend === "up" && "bg-accent/20 text-accent",
                      stat.trend === "down" && "bg-destructive/20 text-destructive",
                      stat.trend === "neutral" && "bg-muted text-muted-foreground"
                    )}
                  >
                    {stat.trend === "up" && <TrendingUp className="h-3 w-3" />}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Weekly Appointments Chart */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>{t("analytics")}</CardTitle>
              <CardDescription>Weekly appointment statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="appointments"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="completed"
                    fill="hsl(var(--accent))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Service Distribution */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>{t("services")}</CardTitle>
              <CardDescription>Distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={serviceDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {serviceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {serviceDistribution.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Hourly Traffic */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Hourly Traffic</CardTitle>
              <CardDescription>Today&apos;s visitor distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={hourlyTraffic}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Queue Status */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>{t("activeQueues")}</CardTitle>
              <CardDescription>Current queue status by category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {queueStatus.map((queue, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <queue.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{t(queue.category)}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        Waiting: <span className="font-medium text-foreground">{queue.waiting}</span>
                      </span>
                      <span className="text-muted-foreground">
                        Avg: <span className="font-medium text-foreground">{queue.avgWait}m</span>
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={(queue.serving / (queue.waiting + queue.serving)) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>{t("recentActivity")}</CardTitle>
            <CardDescription>Latest system activity and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50"
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      activity.status === "completed" && "bg-accent/20 text-accent",
                      activity.status === "new" && "bg-primary/20 text-primary",
                      activity.status === "info" && "bg-muted text-muted-foreground",
                      activity.status === "cancelled" && "bg-destructive/20 text-destructive"
                    )}
                  >
                    {activity.status === "completed" && <CheckCircle2 className="h-5 w-5" />}
                    {activity.status === "new" && <Calendar className="h-5 w-5" />}
                    {activity.status === "info" && <Activity className="h-5 w-5" />}
                    {activity.status === "cancelled" && <XCircle className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.user} - {activity.service}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
