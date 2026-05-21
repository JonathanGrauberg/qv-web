"use client"

import { useEffect, useState } from "react"

import {
  Calendar,
  ChevronRight,
  Clock3,
  MapPin,
  Sparkles,
} from "lucide-react"

import { format } from "date-fns"

import { es } from "date-fns/locale"

import { toZonedTime } from "date-fns-tz"

import { cn } from "@/lib/utils"

import type { Match } from "../../lib/fixtures"

import { teams } from "../../lib/fixtures"

interface NextArgentinaMatchProps {
  match: Match | null
  className?: string
}

export function NextArgentinaMatch({
  match,
  className,
}: NextArgentinaMatchProps) {

  const [countdown, setCountdown] =
    useState("")

  if (!match) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl",
          className
        )}
      >

        <div className="text-center">

          <div className="mb-4 text-6xl">
            🇦🇷
          </div>

          <h3 className="mb-2 text-2xl font-black text-white">
            Próximo Partido
          </h3>

          <p className="text-white/50">
            Todavía no definido
          </p>
        </div>
      </div>
    )
  }

  const argentinaTimezone =
    "America/Argentina/Buenos_Aires"

  const matchDate = new Date(
    `${match.date}T${match.time}:00`
  )

  const zonedDate = toZonedTime(
    matchDate,
    argentinaTimezone
  )

  const isArgentinaTeam1 =
    match.team1 === "Argentina"

  const opponent = isArgentinaTeam1
    ? match.team2
    : match.team1

  const opponentCode = isArgentinaTeam1
    ? match.team2Code
    : match.team1Code

  const opponentData =
    teams[opponentCode] || teams.TBD

  useEffect(() => {

    const updateCountdown = () => {

      const now = new Date()

      const diff =
        zonedDate.getTime() - now.getTime()

      if (diff <= 0) {
        setCountdown("EN VIVO")
        return
      }

      const days = Math.floor(
        diff / (1000 * 60 * 60 * 24)
      )

      const hours = Math.floor(
        (diff %
          (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      )

      const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) /
          (1000 * 60)
      )

      setCountdown(
        `${days}d ${hours}h ${minutes}m`
      )
    }

    updateCountdown()

    const interval =
      setInterval(updateCountdown, 60000)

    return () => clearInterval(interval)

  }, [zonedDate])

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[32px] border border-sky-300/20 bg-[#081412] backdrop-blur-2xl transition-all duration-500",
        "hover:shadow-[0_20px_80px_rgba(56,189,248,0.18)]",
        "hover:border-sky-300/30",
        className
      )}
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_45%)]" />

      {/* GLOW */}
      <div className="absolute -top-20 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-sky-400/10 blur-[100px]" />

      {/* GOLD LINE */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

      {/* CONTENT */}
      <div className="relative p-6 lg:p-8">

        {/* TOP */}
        <div className="mb-8 flex items-center justify-between">

          <div className="flex items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-400/10 px-3 py-1.5">

            <Sparkles className="h-4 w-4 text-yellow-300" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-200">
              Próximo Partido
            </span>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/60">

            🇦🇷 Argentina
          </div>
        </div>

        {/* MATCH */}
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">

          {/* ARG */}
          <div className="flex flex-1 flex-col items-center text-center">

            <div className="mb-3 text-7xl drop-shadow-lg">
              🇦🇷
            </div>

            <h3 className="text-2xl font-black text-white">
              Argentina
            </h3>

            <span className="mt-1 text-sm font-semibold tracking-[0.25em] text-sky-300">
              ARG
            </span>
          </div>

          {/* CENTER */}
          <div className="flex flex-col items-center">

            <div className="rounded-3xl border border-white/10 bg-white/[0.05] px-6 py-4 backdrop-blur-xl">

              <span className="text-3xl font-black tracking-tight text-white">
                VS
              </span>
            </div>

            <div className="mt-4 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2">

              <span className="text-sm font-bold text-emerald-300">
                {countdown}
              </span>
            </div>
          </div>

          {/* RIVAL */}
          <div className="flex flex-1 flex-col items-center text-center">

            <div className="mb-3 text-7xl drop-shadow-lg">
              {opponentData.flag}
            </div>

            <h3 className="text-2xl font-black text-white">
              {opponent}
            </h3>

            <span className="mt-1 text-sm font-semibold tracking-[0.25em] text-white/40">
              {opponentCode}
            </span>
          </div>
        </div>

        {/* INFO */}
        <div className="mt-8 grid gap-3">

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">

            <Calendar className="h-5 w-5 text-sky-400" />

            <span className="text-sm text-white/80">

              {format(
                zonedDate,
                "EEEE d 'de' MMMM",
                { locale: es }
              )}
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">

            <Clock3 className="h-5 w-5 text-yellow-300" />

            <span className="text-sm text-white/80">

              {format(
                zonedDate,
                "HH:mm",
                { locale: es }
              )}{" "}
              hs (Argentina)
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">

            <MapPin className="h-5 w-5 text-emerald-400" />

            <span className="text-sm text-white/80">

              {match.stadium} •{" "}
              {match.city}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">

          <button
            className="group/button inline-flex items-center gap-2 rounded-2xl border border-sky-300/20 bg-sky-400/10 px-5 py-3 text-sm font-bold text-sky-200 backdrop-blur-xl transition-all duration-300 hover:bg-sky-400/20"
          >

            Ver fixture completo

            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  )
}