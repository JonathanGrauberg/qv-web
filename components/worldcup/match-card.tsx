"use client"

import { format } from "date-fns"
import { es } from "date-fns/locale"
import { toZonedTime } from "date-fns-tz"
import {
  Calendar,
  Clock,
  MapPin,
} from "lucide-react"

import { cn } from "@/lib/utils"

import type { Match } from "../../lib/fixtures"
import { teams } from "../../lib/fixtures"

import { LiveBadge } from "./live-badge"

interface MatchCardProps {
  match: Match
  featured?: boolean
  compact?: boolean
}

export function MatchCard({
  match,
  featured = false,
  compact = false,
}: MatchCardProps) {

  const argentinaTimezone =
    "America/Argentina/Buenos_Aires"

  const matchDate = new Date(
    `${match.date}T${match.time}:00`
  )

  const zonedDate = toZonedTime(
    matchDate,
    argentinaTimezone
  )

  const isArgentinaMatch =
    match.team1 === "Argentina" ||
    match.team2 === "Argentina"

  const isLive =
    match.status === "live" ||
    match.status === "halftime"

  const team1Data =
    teams[match.team1Code] || teams.TBD

  const team2Data =
    teams[match.team2Code] || teams.TBD

  // =========================
  // COMPACT CARD
  // =========================

  if (compact) {
    return (
      <div
        className={cn(
          "group relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300",
          "border-white/10 bg-white/[0.04]",
          "hover:border-emerald-400/20 hover:bg-white/[0.06]",
          "hover:shadow-[0_0_30px_rgba(34,197,94,0.12)]",
          isArgentinaMatch &&
            "border-sky-400/40 bg-sky-500/[0.08]",
          isLive &&
            "border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.18)]"
        )}
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

        {isLive && (
          <div className="absolute inset-0 bg-red-500/[0.03] animate-pulse pointer-events-none" />
        )}

        <div className="relative flex items-center justify-between gap-3 p-4">

          {/* TEAM 1 */}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="text-2xl">
              {team1Data.flag}
            </span>

            <span className="truncate text-sm font-semibold text-white">
              {match.team1}
            </span>
          </div>

          {/* SCORE */}
          <div className="shrink-0">
            {match.status === "finished" || isLive ? (
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg font-black text-white">
                  {match.score1 ?? 0}
                </div>

                <span className="text-white/40">
                  :
                </span>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg font-black text-white">
                  {match.score2 ?? 0}
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm font-semibold text-white/70">
                {format(zonedDate, "HH:mm")}
              </div>
            )}
          </div>

          {/* TEAM 2 */}
          <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
            <span className="truncate text-right text-sm font-semibold text-white">
              {match.team2}
            </span>

            <span className="text-2xl">
              {team2Data.flag}
            </span>
          </div>
        </div>

        {isLive && (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
            <LiveBadge
              status={match.status}
              minute={match.minute}
            />
          </div>
        )}
      </div>
    )
  }

  // =========================
  // FULL CARD
  // =========================

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-500",
        "border-white/10 bg-white/[0.04]",
        "hover:-translate-y-1 hover:border-emerald-400/20",
        "hover:bg-white/[0.06]",
        "hover:shadow-[0_10px_60px_rgba(0,0,0,0.35)]",
        featured && "xl:col-span-2",
        isArgentinaMatch &&
          "border-sky-400/40 shadow-[0_0_50px_rgba(14,165,233,0.12)]",
        isLive &&
          "border-red-500/40 shadow-[0_0_50px_rgba(239,68,68,0.18)]"
      )}
    >

      {/* Glow FX */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

      {/* Argentina Accent */}
      {isArgentinaMatch && (
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-sky-400 via-white to-sky-400" />
      )}

      {/* Live Glow */}
      {isLive && (
        <div className="absolute inset-0 bg-red-500/[0.03] animate-pulse pointer-events-none" />
      )}

      <div className="relative p-5 lg:p-6">

        {/* TOP */}
        <div className="mb-6 flex items-start justify-between gap-4">

          {/* Date */}
          <div className="space-y-2">

            <div className="flex items-center gap-2 text-sm text-white/60">
              <Calendar className="h-4 w-4" />

              <span>
                {format(
                  zonedDate,
                  "EEEE d MMMM",
                  { locale: es }
                )}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-white/60">
              <Clock className="h-4 w-4" />

              <span>
                {format(
                  zonedDate,
                  "HH:mm",
                  { locale: es }
                )}{" "}
                hs ARG
              </span>
            </div>
          </div>

          {/* Badge */}
          <LiveBadge
            status={match.status}
            minute={match.minute}
          />
        </div>

        {/* TEAMS */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">

          {/* TEAM 1 */}
          <div className="text-center">

            <div className="mb-3 text-5xl drop-shadow-lg">
              {team1Data.flag}
            </div>

            <h3
              className={cn(
                "font-black tracking-tight text-white",
                featured
                  ? "text-xl lg:text-2xl"
                  : "text-lg"
              )}
            >
              {match.team1}
            </h3>

            <span className="mt-1 inline-block text-xs uppercase tracking-[0.25em] text-white/40">
              {match.team1Code}
            </span>
          </div>

          {/* SCORE */}
          <div className="flex items-center gap-3">

            {match.status === "finished" || isLive ? (
              <>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-3xl font-black text-white shadow-inner backdrop-blur-xl">
                  {match.score1 ?? 0}
                </div>

                <span className="text-3xl font-thin text-white/30">
                  :
                </span>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-3xl font-black text-white shadow-inner backdrop-blur-xl">
                  {match.score2 ?? 0}
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-sky-400/20 bg-sky-500/10 px-5 py-3 text-lg font-black tracking-wider text-sky-300">
                VS
              </div>
            )}
          </div>

          {/* TEAM 2 */}
          <div className="text-center">

            <div className="mb-3 text-5xl drop-shadow-lg">
              {team2Data.flag}
            </div>

            <h3
              className={cn(
                "font-black tracking-tight text-white",
                featured
                  ? "text-xl lg:text-2xl"
                  : "text-lg"
              )}
            >
              {match.team2}
            </h3>

            <span className="mt-1 inline-block text-xs uppercase tracking-[0.25em] text-white/40">
              {match.team2Code}
            </span>
          </div>
        </div>

        {/* Penalties */}
        {match.penalties1 !== undefined &&
          match.penalties1 !== null && (
            <div className="mt-5 text-center">
              <div className="inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-300">
                Penales: {match.penalties1} -{" "}
                {match.penalties2}
              </div>
            </div>
          )}

        {/* STADIUM */}
        <div className="mt-6 border-t border-white/10 pt-5">

          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/50">

            <MapPin className="h-4 w-4" />

            <span>{match.stadium}</span>

            <span className="text-white/20">
              •
            </span>

            <span>{match.city}</span>
          </div>
        </div>
      </div>
    </div>
  )
}