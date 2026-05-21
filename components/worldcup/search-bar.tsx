"use client"

import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Buscar equipo, estadio o ciudad...",
  className 
}: SearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full pl-12 pr-12 py-3 rounded-xl",
          "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
          "border border-slate-200/50 dark:border-slate-700/50",
          "text-slate-800 dark:text-white placeholder:text-slate-400",
          "focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent",
          "transition-all duration-200"
        )}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>
      )}
    </div>
  )
}
