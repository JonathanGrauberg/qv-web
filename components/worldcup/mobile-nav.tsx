"use client"

import { useState } from "react"
import { Home, Calendar, Trophy, Flag, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export type NavSection = "groups" | "knockout"

interface MobileNavProps {
  activeSection: NavSection
  onSectionChange: (section: NavSection) => void
  className?: string
}

export function MobileNav({ activeSection, onSectionChange, className }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: "groups" as NavSection, label: "Fase de Grupos", icon: Flag },
    { id: "knockout" as NavSection, label: "Eliminatorias", icon: Trophy },
  ]

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className={cn(
        "fixed bottom-0 left-0 right-0 z-50 lg:hidden",
        "bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg",
        "border-t border-slate-200 dark:border-slate-700",
        "safe-area-inset-bottom",
        className
      )}>
        <div className="flex items-center justify-around p-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all",
                activeSection === item.id
                  ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center justify-center gap-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200",
              activeSection === item.id
                ? item.id === "knockout"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
                  : "bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-500/30"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </div>
    </>
  )
}
