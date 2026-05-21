"use client"

import { cn } from "@/lib/utils"
import type { MatchStatus } from "@/lib/fixtures"

interface LiveBadgeProps {
  status: MatchStatus
  minute?: number
  className?: string
}

export function LiveBadge({
  status,
  minute,
  className,
}: LiveBadgeProps) {
  if (status === "scheduled") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
          "bg-slate-100 text-slate-700",
          "dark:bg-slate-800 dark:text-slate-300",
          className
        )}
      >
        Programado
      </span>
    )
  }

  if (status === "finished") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
          "bg-emerald-100 text-emerald-700",
          "dark:bg-emerald-900/30 dark:text-emerald-400",
          className
        )}
      >
        Finalizado
      </span>
    )
  }

  if (status === "halftime") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
          "bg-amber-100 text-amber-700",
          "dark:bg-amber-900/30 dark:text-amber-400",
          className
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        Entretiempo
      </span>
    )
  }

  // LIVE
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold",
        "bg-red-500 text-white",
        "shadow-lg shadow-red-500/30",
        "animate-pulse",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>

      EN VIVO {minute ? `${minute}'` : ""}
    </span>
  )
}