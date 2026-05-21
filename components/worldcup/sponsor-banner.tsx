"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Leaf, Globe, Sparkles } from "lucide-react"

interface SponsorBannerProps {
  className?: string
}

export function SponsorBanner({ className }: SponsorBannerProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group relative overflow-hidden rounded-3xl block",
        "bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]",
        "border border-white/10",
        "transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20",
        className
      )}
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-sky-500/10" />

      {/* Pattern */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:24px_24px]" />
      </div>

      <div className="relative p-6 h-full flex flex-col justify-between">
        {/* TOP */}
        <div className="flex items-center gap-4">
          <div
            className="
              w-14 h-14 rounded-2xl
              bg-gradient-to-br from-emerald-400 to-sky-500
              flex items-center justify-center
              shadow-lg shadow-emerald-500/20
            "
          >
            <Leaf className="w-7 h-7 text-white" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[3px] text-white/40">
              Plataforma
            </p>

            <h3 className="text-2xl font-black text-white tracking-tight">
              QuedeVerde
            </h3>
          </div>
        </div>

        {/* CENTER */}
        <div className="my-6">
          <h4 className="text-white text-lg font-bold leading-tight mb-2">
            Mundial 2026 en tiempo real ⚽
          </h4>

          <p className="text-white/70 text-sm leading-relaxed">
            Resultados en vivo, grupos, eliminatorias y seguimiento completo
            del Mundial FIFA 2026 desde Argentina.
          </p>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="text-white text-sm font-medium">
              Datos en vivo
            </span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span className="text-white text-sm font-medium">
              Diseño moderno
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}