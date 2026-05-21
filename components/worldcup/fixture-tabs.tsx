"use client"

import { cn } from "@/lib/utils"

export type FilterTab =
  | "all"
  | "live"
  | "today"
  | "argentina"
  | "upcoming"
  | "finished"

interface FixtureTabsProps {
  activeTab: FilterTab
  onTabChange: (tab: FilterTab) => void

  liveCounts?: {
    all: number
    live: number
    today: number
    argentina: number
    upcoming: number
    finished: number
  }
}

const tabs: {
  id: FilterTab
  label: string
  shortLabel: string
}[] = [
  { id: "all", label: "Todos", shortLabel: "Todos" },
  { id: "live", label: "En Vivo", shortLabel: "Live" },
  { id: "today", label: "Hoy", shortLabel: "Hoy" },
  { id: "argentina", label: "Argentina", shortLabel: "ARG" },
  { id: "upcoming", label: "Próximos", shortLabel: "Prox" },
  { id: "finished", label: "Finalizados", shortLabel: "Fin" },
]

export function FixtureTabs({
  activeTab,
  onTabChange,
  liveCounts,
}: FixtureTabsProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-2 min-w-max px-1 py-1">
        {tabs.map((tab) => {
          const count = liveCounts?.[tab.id]

          const isActive = activeTab === tab.id
          const isLive = tab.id === "live" && count && count > 0
          const isArgentina = tab.id === "argentina"

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative flex items-center gap-2",
                "px-4 py-2.5 rounded-2xl",
                "text-sm font-semibold whitespace-nowrap",
                "transition-all duration-200",

                "border",

                isActive
                  ? isArgentina
                    ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white border-transparent shadow-lg shadow-sky-500/20"
                    : isLive
                    ? "bg-gradient-to-r from-red-500 to-rose-500 text-white border-transparent shadow-lg shadow-red-500/20"
                    : "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-300 hover:text-sky-600 dark:hover:text-sky-400"
              )}
            >
              <span className="hidden sm:inline">
                {tab.label}
              </span>

              <span className="sm:hidden">
                {tab.shortLabel}
              </span>

              {isArgentina && (
                <span className="text-base">
                  🇦🇷
                </span>
              )}

              {/* Count */}
              {count !== undefined && count > 0 && (
                <span
                  className={cn(
                    "inline-flex items-center justify-center",
                    "min-w-[20px] h-5 px-1.5 rounded-full",
                    "text-[11px] font-bold",

                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                  )}
                >
                  {count}
                </span>
              )}

              {/* Live pulse */}
              {isLive && !isActive && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}