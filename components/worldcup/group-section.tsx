"use client"

import { useState } from "react"

import {
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react"

import { cn } from "@/lib/utils"

import type { Group } from "../../lib/fixtures"

import { teams } from "../../lib/fixtures"

import { MatchCard } from "./match-card"

interface GroupSectionProps {
  group: Group
  defaultExpanded?: boolean
}

export function GroupSection({
  group,
  defaultExpanded = false,
}: GroupSectionProps) {

  const [isExpanded, setIsExpanded] =
    useState(defaultExpanded)

  const hasArgentina = group.matches.some(
    (match) =>
      match.team1 === "Argentina" ||
      match.team2 === "Argentina"
  )

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-300",
        "border-white/10 bg-white/[0.03]",
        "hover:border-emerald-400/20 hover:bg-white/[0.05]",
        "hover:shadow-[0_12px_50px_rgba(0,0,0,0.35)]",

        hasArgentina &&
          "border-sky-400/30 shadow-[0_0_40px_rgba(56,189,248,0.12)]"
      )}
    >

      {/* HEADER */}
      <button
        onClick={() =>
          setIsExpanded(!isExpanded)
        }
        className={cn(
          "relative w-full overflow-hidden p-5 transition-all duration-300"
        )}
      >

        {/* Background */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-300",

            hasArgentina
              ? "bg-gradient-to-r from-sky-500/20 via-cyan-400/10 to-white/[0.03]"
              : "bg-gradient-to-r from-white/[0.04] to-white/[0.02]"
          )}
        />

        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />

        <div className="relative flex items-center justify-between gap-4">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            {/* LETTER */}
            <div
              className={cn(
                "relative flex h-14 w-14 items-center justify-center rounded-2xl border text-2xl font-black shadow-lg",

                hasArgentina
                  ? "border-sky-300/30 bg-sky-400/20 text-white"
                  : "border-white/10 bg-white/[0.05] text-white"
              )}
            >

              {hasArgentina && (
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="h-4 w-4 text-yellow-300" />
                </div>
              )}

              {group.letter}
            </div>

            {/* TEXT */}
            <div className="text-left">

              <h3
                className={cn(
                  "text-xl font-black tracking-tight",

                  hasArgentina
                    ? "text-white"
                    : "text-white"
                )}
              >
                {group.name}
              </h3>

              <div className="mt-2 flex items-center gap-2">

                {group.teams.map((team, idx) => (
                  <div
                    key={idx}
                    title={team.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-lg shadow-sm backdrop-blur-sm transition-transform duration-200 hover:scale-110"
                  >
                    {teams[team.code]?.flag || "🏳️"}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-end gap-2">

            <div
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",

                hasArgentina
                  ? "border-sky-300/20 bg-sky-400/10 text-sky-100"
                  : "border-white/10 bg-white/[0.04] text-white/60"
              )}
            >
              {group.matches.length} partidos
            </div>

            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300",

                hasArgentina
                  ? "border-sky-300/20 bg-sky-400/10 text-white"
                  : "border-white/10 bg-white/[0.04] text-white/70"
              )}
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>
          </div>
        </div>
      </button>

      {/* CONTENT */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-in-out",

          isExpanded
            ? "max-h-[3000px] opacity-100"
            : "max-h-0 opacity-0"
        )}
      >

        <div className="space-y-3 border-t border-white/5 p-4">

          {group.matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              compact
            />
          ))}
        </div>
      </div>
    </div>
  )
}