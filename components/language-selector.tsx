"use client"

import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function LanguageSelector({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "gap-2 transition-all duration-300 hover:scale-105",
            className
          )}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {language === "en" ? "EN" : "हिं"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={cn(
            "cursor-pointer transition-colors",
            language === "en" && "bg-primary/10 text-primary"
          )}
        >
          <span className="mr-2">🇺🇸</span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("hi")}
          className={cn(
            "cursor-pointer transition-colors",
            language === "hi" && "bg-primary/10 text-primary"
          )}
        >
          <span className="mr-2">🇮🇳</span>
          हिंदी
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
