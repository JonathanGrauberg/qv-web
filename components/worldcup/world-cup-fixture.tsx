"use client"

import { useState, useMemo } from "react"
import useSWR from "swr"
import { format, isToday, parseISO } from "date-fns"
import { RefreshCw, Wifi, WifiOff } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  groups,
  knockoutFixtures,
  getArgentinaMatches,
  type Match,
  type MatchStatus,
} from "../../lib/fixtures"

import { HeroHeader } from "./hero-header"
import { FixtureTabs, type FilterTab } from "./fixture-tabs"
import { SearchBar } from "./search-bar"
import { GroupSection } from "./group-section"
import { KnockoutBracket } from "./knockout-bracket"
import { MatchCard } from "./match-card"
import { NextArgentinaMatch } from "./next-argentina-match"
import { SponsorBanner } from "./sponsor-banner"
import { MobileNav, type NavSection } from "./mobile-nav"

interface LiveData {
  useLocalData: boolean
  fixtures?: Array<{
    id: number
    team1: string
    team2: string
    score1: number | null
    score2: number | null
    penalties1: number | null
    penalties2: number | null
    status: string
    minute: number | null
    round: string
  }>
  lastUpdate: string
  error?: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function WorldCupFixture() {
  const [activeSection, setActiveSection] =
    useState<NavSection>("groups")

  const [activeFilter, setActiveFilter] =
    useState<FilterTab>("all")

  const [searchQuery, setSearchQuery] = useState("")

  // Live updates
  const {
    data: liveData,
    error,
    isLoading,
    mutate,
  } = useSWR<LiveData>("/api/worldcup", fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  })

  // Merge live API with static fixture
  const mergedMatches = useMemo(() => {
    const allMatches: Match[] = groups.flatMap(
      (group) => group.matches
    )

    if (!liveData?.fixtures || liveData.useLocalData) {
      return allMatches
    }

    return allMatches.map((match) => {
      const liveMatch = liveData.fixtures?.find(
        (f) =>
          (f.team1.includes(match.team1) &&
            f.team2.includes(match.team2)) ||
          (f.team1.includes(match.team2) &&
            f.team2.includes(match.team1))
      )

      if (!liveMatch) return match

      return {
        ...match,
        score1: liveMatch.score1,
        score2: liveMatch.score2,
        penalties1: liveMatch.penalties1,
        penalties2: liveMatch.penalties2,
        status: liveMatch.status as MatchStatus,
        minute: liveMatch.minute ?? undefined,
      }
    })
  }, [liveData])

  // Filters
  const filteredMatches = useMemo(() => {
    let matches = mergedMatches

    switch (activeFilter) {
      case "live":
        matches = matches.filter(
          (m) =>
            m.status === "live" ||
            m.status === "halftime"
        )
        break

      case "today":
        matches = matches.filter((m) =>
          isToday(parseISO(m.date))
        )
        break

      case "argentina":
        matches = matches.filter(
          (m) =>
            m.team1 === "Argentina" ||
            m.team2 === "Argentina"
        )
        break

      case "upcoming":
        matches = matches.filter(
          (m) => m.status === "scheduled"
        )
        break

      case "finished":
        matches = matches.filter(
          (m) => m.status === "finished"
        )
        break
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()

      matches = matches.filter(
        (m) =>
          m.team1.toLowerCase().includes(query) ||
          m.team2.toLowerCase().includes(query) ||
          m.stadium.toLowerCase().includes(query) ||
          m.city.toLowerCase().includes(query)
      )
    }

    return matches
  }, [mergedMatches, activeFilter, searchQuery])

  // Counters
  const counts = useMemo(
    () => ({
      all: mergedMatches.length,

      live: mergedMatches.filter(
        (m) =>
          m.status === "live" ||
          m.status === "halftime"
      ).length,

      today: mergedMatches.filter((m) =>
        isToday(parseISO(m.date))
      ).length,

      argentina: mergedMatches.filter(
        (m) =>
          m.team1 === "Argentina" ||
          m.team2 === "Argentina"
      ).length,

      upcoming: mergedMatches.filter(
        (m) => m.status === "scheduled"
      ).length,

      finished: mergedMatches.filter(
        (m) => m.status === "finished"
      ).length,
    }),
    [mergedMatches]
  )

  // Next Argentina match
  const nextArgentinaMatch = useMemo(() => {
    const argMatches = getArgentinaMatches()

    return (
      argMatches.find(
        (m) => m.status === "scheduled"
      ) || argMatches[0]
    )
  }, [])

  const isLiveDataAvailable =
    !liveData?.useLocalData && !error

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06110f] text-white">
      {/* Background FX */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.10),transparent_35%)] pointer-events-none" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(14,165,233,0.08),transparent_30%)] pointer-events-none" />

      {/* Hero */}
      <HeroHeader />

      {/* Main */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 lg:px-8 py-8 lg:py-12 pb-28">

        {/* Live Status */}
        <div className="mb-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4 shadow-[0_0_40px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-3">
            {isLiveDataAvailable ? (
              <>
                <Wifi className="h-5 w-5 text-emerald-400" />

                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">
                    Datos en vivo conectados
                  </span>

                  {liveData?.lastUpdate && (
                    <span className="text-xs text-white/50">
                      Actualizado:{" "}
                      {format(
                        new Date(liveData.lastUpdate),
                        "HH:mm:ss"
                      )}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <>
                <WifiOff className="h-5 w-5 text-white/40" />

                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white/70">
                    Usando datos locales
                  </span>

                  <span className="text-xs text-white/40">
                    API no disponible
                  </span>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => mutate()}
            disabled={isLoading}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border border-sky-400/20 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-300 transition-all duration-200 hover:bg-sky-500/20 hover:scale-[1.02]",
              isLoading &&
                "cursor-not-allowed opacity-50"
            )}
          >
            <RefreshCw
              className={cn(
                "h-4 w-4",
                isLoading && "animate-spin"
              )}
            />

            Actualizar
          </button>
        </div>

        {/* Navigation */}
        <div className="mb-8 lg:hidden">
          <MobileNav
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Featured */}
        <div className="mb-10 flex flex-col gap-6 xl:flex-row">
          <div className="flex-1">
            <NextArgentinaMatch
              match={nextArgentinaMatch}
            />
          </div>

          <div className="xl:w-[380px]">
            <SponsorBanner />
          </div>
        </div>

        {/* GROUPS */}
        {activeSection === "groups" && (
          <div className="space-y-8">

            {/* Sticky Filters */}
            <div className="sticky top-0 z-30 rounded-2xl border border-white/10 bg-[#06110f]/80 backdrop-blur-xl py-4">
              <div className="space-y-4">
                <FixtureTabs
                  activeTab={activeFilter}
                  onTabChange={setActiveFilter}
                  liveCounts={counts}
                />

                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  className="max-w-xl mx-auto"
                />
              </div>
            </div>

            {/* Results */}
            {(activeFilter !== "all" || searchQuery) ? (
              <>
                {filteredMatches.length === 0 ? (
                  <div className="rounded-3xl border border-white/10 bg-white/5 py-20 text-center backdrop-blur-xl">
                    <p className="text-white/60">
                      No se encontraron partidos
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredMatches.map((match) => (
                      <MatchCard
                        key={match.id}
                        match={match}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                {groups.map((group) => (
                  <GroupSection
                    key={group.letter}
                    group={group}
                    defaultExpanded={
                      group.letter === "D"
                    }
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* KNOCKOUT */}
        {activeSection === "knockout" && (
          <div className="space-y-8">

            <div className="text-center">
              <h2 className="mb-2 text-3xl font-black tracking-tight text-white">
                Fase Eliminatoria
              </h2>

              <p className="text-white/50">
                Del 29 de junio al 19 de julio de 2026
              </p>
            </div>

            <KnockoutBracket
              knockout={knockoutFixtures}
            />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/50">
            FIFA World Cup 2026™ • Horarios en Argentina (GMT-3)
          </p>

          <p className="mt-2 text-xs text-white/30">
            Resultados en vivo actualizados automáticamente cada 30 segundos
          </p>
        </footer>
      </div>
    </div>
  )
}