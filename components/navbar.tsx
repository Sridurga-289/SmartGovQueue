"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CalendarPlus,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react"
import { useState } from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/language-context"
import { useUser } from "@/contexts/user-context"
import { LanguageSelector } from "@/components/language-selector"
import { AnimatedButton } from "@/components/animated-button"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const { t } = useLanguage()
  const { user, logout } = useUser()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = user
    ? [
        {
          href: "/citizen/book",
          label: t("bookAppointment"),
          icon: CalendarPlus,
        },
        {
          href: "/citizen/track",
          label: t("trackQueue"),
          icon: ClipboardList,
        },
        {
          href: "/citizen/documents",
          label: t("documents"),
          icon: FileText,
        },
      ]
    : []

  const adminLinks = user?.role === "admin"
    ? [
        {
          href: "/admin",
          label: t("dashboard"),
          icon: LayoutDashboard,
        },
      ]
    : []

  const allLinks = [...navLinks, ...adminLinks]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in-down">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent animate-glow">
            <span className="text-lg font-bold text-primary-foreground">SG</span>
          </div>
          <span className="hidden font-semibold sm:inline-block text-gradient-animate">
            SmartGov Queue
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {allLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={pathname === link.href ? "secondary" : "ghost"}
                size="sm"
                className="gap-2 transition-all duration-300 hover:scale-105 hover-lift"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="transition-all duration-300 hover:scale-110"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 transition-transform duration-300 rotate-0" />
            ) : (
              <Moon className="h-4 w-4 transition-transform duration-300 rotate-180" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <LanguageSelector />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="hidden sm:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="flex flex-col items-start gap-1">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="transition-all duration-300 hover:scale-105"
                >
                  {t("login")}
                </Button>
              </Link>
              <Link href="/auth/register">
                <AnimatedButton size="sm">{t("register")}</AnimatedButton>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-4 pt-8">
                {!user && (
                  <div className="flex flex-col gap-2 border-b border-border pb-4">
                    <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        {t("login")}
                      </Button>
                    </Link>
                    <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                      <AnimatedButton className="w-full">
                        {t("register")}
                      </AnimatedButton>
                    </Link>
                  </div>
                )}
                {allLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={pathname === link.href ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Button>
                  </Link>
                ))}
                {user && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    {t("logout")}
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
