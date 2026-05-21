"use client"

import { useEffect, useState } from "react"

import {
  Calendar,
  Globe,
  Sparkles,
  Trophy,
} from "lucide-react"

import { cn } from "@/lib/utils"

interface HeroHeaderProps {
  className?: string
}

export function HeroHeader({
  className,
}: HeroHeaderProps) {

  const [countdown, setCountdown] =
    useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })

  useEffect(() => {

    const targetDate = new Date(
      "2026-06-11T20:30:00-03:00"
    )

    const updateCountdown = () => {

      const now = new Date()

      const diff =
        targetDate.getTime() - now.getTime()

      if (diff <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })

        return
      }

      setCountdown({
        days: Math.floor(
          diff / (1000 * 60 * 60 * 24)
        ),

        hours: Math.floor(
          (diff %
            (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        ),

        minutes: Math.floor(
          (diff % (1000 * 60 * 60)) /
            (1000 * 60)
        ),

        seconds: Math.floor(
          (diff % (1000 * 60)) / 1000
        ),
      })
    }

    updateCountdown()

    const interval =
      setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)

  }, [])

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        className
      )}
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#071412]" />

      {/* GRADIENT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_45%)]" />

      {/* GLOW */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-sky-400/10 blur-[120px]" />

      {/* PATTERN */}
      <div className="absolute inset-0 opacity-[0.03]">

        {Array.from({ length: 30 }).map(
          (_, i) => (
            <div
              key={i}
              className="absolute h-[200%] w-[1px] bg-white"
              style={{
                left: `${i * 5}%`,
                top: "-50%",
              }}
            />
          )
        )}
      </div>

      {/* TOP GOLD LINE */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

      {/* CONTENT */}
      <div className="relative px-4 pb-24 pt-12 lg:pb-32 lg:pt-20">

        <div className="mx-auto max-w-6xl text-center">

          {/* BADGE */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-xl">

            <Trophy className="h-4 w-4 text-yellow-400" />

            <span className="text-sm font-semibold tracking-wide text-white/90">
              FIFA WORLD CUP 2026
            </span>

            <Trophy className="h-4 w-4 text-yellow-400" />
          </div>

          {/* TITLE */}
          <div className="space-y-5">

            <div className="flex items-center justify-center gap-3 text-4xl sm:text-5xl lg:text-6xl">

              <span className="drop-shadow-lg">
                🇺🇸
              </span>

              <span className="drop-shadow-lg">
                🇲🇽
              </span>

              <span className="drop-shadow-lg">
                🇨🇦
              </span>
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl font-black leading-none tracking-tight text-white sm:text-6xl lg:text-8xl">

              Copa del Mundo
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">

              Fixture completo del Mundial
              2026 con horarios de Argentina,
              resultados en vivo y fase final.
            </p>
          </div>

          {/* COUNTDOWN */}
          <div className="mt-10 flex justify-center">

            <div className="grid grid-cols-4 gap-3 rounded-[28px] border border-white/10 bg-white/[0.05] p-4 backdrop-blur-2xl sm:gap-5 sm:p-6">

              <CountdownItem
                label="Días"
                value={countdown.days}
              />

              <CountdownItem
                label="Horas"
                value={countdown.hours}
              />

              <CountdownItem
                label="Min"
                value={countdown.minutes}
              />

              <CountdownItem
                label="Seg"
                value={countdown.seconds}
              />
            </div>
          </div>

          {/* INFO ROW */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 backdrop-blur-xl">

              <Calendar className="h-4 w-4 text-sky-400" />

              11 junio — 19 julio 2026
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 backdrop-blur-xl">

              <Globe className="h-4 w-4 text-emerald-400" />

              USA • México • Canadá
            </div>
          </div>

          {/* ARGENTINA */}
          <div className="mt-10 flex justify-center">

            <div className="group relative overflow-hidden rounded-3xl border border-sky-300/20 bg-gradient-to-r from-sky-400/10 via-white/[0.03] to-sky-400/10 p-[1px] shadow-[0_0_50px_rgba(56,189,248,0.12)]">

              <div className="relative flex items-center gap-5 rounded-3xl bg-[#091816] px-6 py-5 backdrop-blur-xl">

                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400/[0.04] to-transparent pointer-events-none" />

                {/* Flag */}
                <div className="relative text-5xl">
                  🇦🇷

                  <div className="absolute -right-1 -top-1">
                    <Sparkles className="h-5 w-5 text-yellow-300" />
                  </div>
                </div>

                {/* Text */}
                <div className="text-left">

                  <div className="mb-2 flex items-center gap-1">

                    <span className="text-yellow-300">
                      ⭐
                    </span>

                    <span className="text-yellow-300">
                      ⭐
                    </span>

                    <span className="text-yellow-300">
                      ⭐
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white">
                    Argentina
                  </h3>

                  <p className="text-sm text-white/60">
                    Campeón del Mundo vigente
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10">

            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-300 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:bg-emerald-400/15"
            >

              <span>🧉</span>

              Visitar QuedeVerde
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#081412] to-transparent" />
    </section>
  )
}

function CountdownItem({
  value,
  label,
}: {
  value: number
  label: string
}) {

  return (
    <div className="min-w-[72px] rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 backdrop-blur-xl">

      <div className="text-3xl font-black tabular-nums text-white sm:text-5xl">

        {value.toString().padStart(2, "0")}
      </div>

      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
        {label}
      </div>
    </div>
  )
}