"use client"

import { Trophy, Medal, Star } from "lucide-react"

import { cn } from "@/lib/utils"

import type { KnockoutMatch } from "../../lib/fixtures"

import {
  knockoutFixtures,
  teams,
} from "../../lib/fixtures"

import { LiveBadge } from "./live-badge"

interface KnockoutBracketProps {
  knockout?: typeof knockoutFixtures
}

function BracketMatch({
  match,
  size = "normal",
}: {
  match: KnockoutMatch
  size?: "small" | "normal" | "large"
}) {

  const team1Data =
    teams[match.team1Code] || teams.TBD

  const team2Data =
    teams[match.team2Code] || teams.TBD

  const isLive =
    match.status === "live" ||
    match.status === "halftime"

  const sizeClasses = {
    small: "p-3",
    normal: "p-4",
    large: "p-5",
  }

  const scoreSize = {
    small: "w-8 h-8 text-sm",
    normal: "w-10 h-10 text-base",
    large: "w-12 h-12 text-xl",
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300",
        "border-white/10 bg-white/[0.04]",
        "hover:border-emerald-400/20 hover:bg-white/[0.06]",
        "hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)]",
        isLive &&
          "border-red-500/40 shadow-[0_0_40px_rgba(239,68,68,0.18)]",
        sizeClasses[size]
      )}
    >

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

      {/* Live Glow */}
      {isLive && (
        <div className="absolute inset-0 bg-red-500/[0.03] animate-pulse pointer-events-none" />
      )}

      {/* Live Badge */}
      {isLive && (
        <div className="mb-3 flex justify-center">
          <LiveBadge
            status={match.status}
            minute={match.minute}
          />
        </div>
      )}

      {/* Teams */}
      <div className="space-y-2">

        {/* TEAM 1 */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2">

          <div className="flex min-w-0 flex-1 items-center gap-2">

            <span className="text-xl">
              {team1Data.flag}
            </span>

            <span
              className={cn(
                "truncate font-semibold text-white",
                size === "small"
                  ? "text-xs"
                  : "text-sm"
              )}
            >
              {match.team1}
            </span>
          </div>

          {(match.status === "finished" || isLive) && (
            <div
              className={cn(
                "flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.08] font-black text-white",
                scoreSize[size]
              )}
            >
              {match.score1 ?? 0}
            </div>
          )}
        </div>

        {/* TEAM 2 */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2">

          <div className="flex min-w-0 flex-1 items-center gap-2">

            <span className="text-xl">
              {team2Data.flag}
            </span>

            <span
              className={cn(
                "truncate font-semibold text-white",
                size === "small"
                  ? "text-xs"
                  : "text-sm"
              )}
            >
              {match.team2}
            </span>
          </div>

          {(match.status === "finished" || isLive) && (
            <div
              className={cn(
                "flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.08] font-black text-white",
                scoreSize[size]
              )}
            >
              {match.score2 ?? 0}
            </div>
          )}
        </div>
      </div>

      {/* Date */}
      {!isLive &&
        match.status === "scheduled" && (
          <div className="mt-3 border-t border-white/10 pt-3 text-center">

            <span className="text-xs font-medium tracking-wide text-white/45">
              {match.date
                .split("-")
                .reverse()
                .slice(0, 2)
                .join("/")}
            </span>
          </div>
        )}
    </div>
  )
}

export function KnockoutBracket({
  knockout = knockoutFixtures,
}: KnockoutBracketProps) {

  return (
    <div className="space-y-12">

      {/* FINAL */}
      <section className="relative">

        <div className="mb-5 flex items-center justify-center gap-3">

          <Trophy className="h-7 w-7 text-yellow-400 drop-shadow-lg" />

          <h2 className="text-2xl font-black tracking-tight text-white">
            Gran Final
          </h2>

          <Trophy className="h-7 w-7 text-yellow-400 drop-shadow-lg" />
        </div>

        <div className="mx-auto max-w-xl">

          <div className="rounded-[28px] bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 p-[1px] shadow-[0_0_60px_rgba(250,204,21,0.18)]">

            <div className="rounded-[28px] bg-[#081412] p-2">
              <BracketMatch
                match={knockout.final}
                size="large"
              />
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-white/45">
            {knockout.final.stadium} •{" "}
            {knockout.final.city}
          </div>
        </div>
      </section>

      {/* THIRD PLACE */}
      <section>

        <div className="mb-4 flex items-center justify-center gap-2">

          <Medal className="h-5 w-5 text-amber-500" />

          <h3 className="text-lg font-bold text-white">
            Tercer Puesto
          </h3>
        </div>

        <div className="mx-auto max-w-md">
          <BracketMatch
            match={knockout.thirdplace}
          />
        </div>
      </section>

      {/* SEMIFINALS */}
      <section>

        <div className="mb-5 flex items-center justify-center gap-2">

          <Star className="h-5 w-5 text-sky-400" />

          <h3 className="text-xl font-bold text-white">
            Semifinales
          </h3>

          <Star className="h-5 w-5 text-sky-400" />
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          {knockout.semifinals.map((match) => (
            <BracketMatch
              key={match.id}
              match={match}
            />
          ))}
        </div>
      </section>

      {/* QUARTERS */}
      <section>

        <h3 className="mb-5 text-center text-xl font-bold text-white">
          Cuartos de Final
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {knockout.quarterfinals.map((match) => (
            <BracketMatch
              key={match.id}
              match={match}
              size="small"
            />
          ))}
        </div>
      </section>

      {/* ROUND OF 16 */}
      <section>

        <h3 className="mb-5 text-center text-xl font-bold text-white">
          Octavos de Final
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {knockout.round16.map((match) => (
            <BracketMatch
              key={match.id}
              match={match}
              size="small"
            />
          ))}
        </div>
      </section>

      {/* ROUND OF 32 */}
      <section>

        <h3 className="mb-5 text-center text-xl font-bold text-white">
          Dieciseisavos de Final
        </h3>

        {/* MOBILE HORIZONTAL SCROLL */}
        <div className="overflow-x-auto pb-2">

          <div className="grid min-w-[1200px] grid-cols-8 gap-3">

            {knockout.round32.map((match) => (
              <BracketMatch
                key={match.id}
                match={match}
                size="small"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}