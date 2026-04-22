"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/language-context"
import { useUser } from "@/contexts/user-context"
import { Navbar } from "@/components/navbar"
import { PrimaryButton } from "@/components/primary-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { GradientBackground } from "@/components/gradient-background"

export default function RegisterPage() {
  const { t } = useLanguage()
  const { register } = useUser()
  const { theme } = useTheme()
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      const success = await register(name, email, phone, password)
      if (success) {
        router.push("/citizen/book")
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <GradientBackground isDark={theme === "dark"} className="min-h-screen">
        <Navbar />
        <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
          <Card className="w-full max-w-md border-border/50 shadow-xl bg-card/50 dark:bg-card/30 glow-card animate-zoom-in">
            <CardHeader className="space-y-1 text-center animate-fade-in-down">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent animate-glow">
                <UserPlus className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl text-gradient-animate">{t("createAccount")}</CardTitle>
              <CardDescription>
                Create an account to book appointments and track queues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">{t("fullName")}</FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 hover-lift"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">{t("email")}</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 hover-lift"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="phone">{t("phoneNumber")}</FieldLabel>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 hover-lift"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">{t("password")}</FieldLabel>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 hover-lift"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">{t("confirmPassword")}</FieldLabel>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 hover-lift"
                    />
                  </Field>
                </FieldGroup>

                {error && (
                  <p className="text-sm text-destructive animate-fade-in-up">{error}</p>
                )}

                <AnimatedButton
                  type="submit"
                  className="w-full"
                  disabled={loading}
                  isPending={loading}
                >
                  {t("register")}
                </AnimatedButton>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">{t("alreadyHaveAccount")} </span>
                  <Link
                    href="/auth/login"
                    className="font-medium text-primary transition-colors hover:text-primary/80 underline-animated"
                  >
                    {t("login")}
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </GradientBackground>
    </div>
  )
}
