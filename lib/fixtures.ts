export type MatchStatus =
  | "scheduled"
  | "live"
  | "halftime"
  | "finished"

export interface Match {
  id: string
  group: string
  date: string
  time: string

  team1: string
  team2: string

  team1Code: string
  team2Code: string

  stadium: string
  city: string

  status: MatchStatus

  score1?: number | null
  score2?: number | null

  penalties1?: number | null
  penalties2?: number | null

  minute?: number
}

export interface Group {
  letter: string
  name: string
  teams: {
    name: string
    code: string
  }[]

  matches: Match[]
}

export interface KnockoutMatch extends Match {}

export const teams: Record<
  string,
  {
    name: string
    flag: string
  }
> = {
  ARG: { name: "Argentina", flag: "🇦🇷" },
  AUT: { name: "Austria", flag: "🇦🇹" },
  JOR: { name: "Jordania", flag: "🇯🇴" },
  ALG: { name: "Argelia", flag: "🇩🇿" },

  MEX: { name: "México", flag: "🇲🇽" },
  RSA: { name: "Sudáfrica", flag: "🇿🇦" },
  COR: { name: "Corea del Sur", flag: "🇰🇷" },
  CZE: { name: "República Checa", flag: "🇨🇿" },

  CAN: { name: "Canadá", flag: "🇨🇦" },
  BIH: { name: "Bosnia y Herzegovina", flag: "🇧🇦" },
  QAT: { name: "Qatar", flag: "🇶🇦" },
  SUI: { name: "Suiza", flag: "🇨🇭" },

  USA: { name: "Estados Unidos", flag: "🇺🇸" },
  TUR: { name: "Turquía", flag: "🇹🇷" },
  AUS: { name: "Australia", flag: "🇦🇺" },
  PAR: { name: "Paraguay", flag: "🇵🇾" },

  BRA: { name: "Brasil", flag: "🇧🇷" },
  HAI: { name: "Haití", flag: "🇭🇹" },
  ESC: { name: "Escocia", flag: "🏴" },
  MAR: { name: "Marruecos", flag: "🇲🇦" },

  ALE: { name: "Alemania", flag: "🇩🇪" },
  CUR: { name: "Curazao", flag: "🇨🇼" },
  CDM: { name: "Costa de Marfil", flag: "🇨🇮" },
  ECU: { name: "Ecuador", flag: "🇪🇨" },

  PBA: { name: "Países Bajos", flag: "🇳🇱" },
  TUN: { name: "Túnez", flag: "🇹🇳" },
  SWE: { name: "Suecia", flag: "🇸🇪" },
  JAP: { name: "Japón", flag: "🇯🇵" },

  BEL: { name: "Bélgica", flag: "🇧🇪" },
  EGI: { name: "Egipto", flag: "🇪🇬" },
  IRA: { name: "Irán", flag: "🇮🇷" },
  NZL: { name: "Nueva Zelanda", flag: "🇳🇿" },

  ESP: { name: "España", flag: "🇪🇸" },
  CAB: { name: "Cabo Verde", flag: "🇨🇻" },
  ARA: { name: "Arabia Saudita", flag: "🇸🇦" },
  URU: { name: "Uruguay", flag: "🇺🇾" },

  FRA: { name: "Francia", flag: "🇫🇷" },
  IRQ: { name: "Irak", flag: "🇮🇶" },
  NOR: { name: "Noruega", flag: "🇳🇴" },
  SEN: { name: "Senegal", flag: "🇸🇳" },

  POR: { name: "Portugal", flag: "🇵🇹" },
  COL: { name: "Colombia", flag: "🇨🇴" },
  UZB: { name: "Uzbekistán", flag: "🇺🇿" },
  COD: { name: "R.D. del Congo", flag: "🇨🇩" },

  ING: { name: "Inglaterra", flag: "🏴" },
  GHA: { name: "Ghana", flag: "🇬🇭" },
  PAN: { name: "Panamá", flag: "🇵🇦" },
  CRO: { name: "Croacia", flag: "🇭🇷" },

  TBD: {
    name: "Por definir",
    flag: "⚪",
  },
}

export const groups: Group[] = [
  {
    letter: "J",
    name: "Grupo J",
    teams: [
      { name: "Argentina", code: "ARG" },
      { name: "Austria", code: "AUT" },
      { name: "Jordania", code: "JOR" },
      { name: "Argelia", code: "ALG" },
    ],

    matches: [
      {
        id: "J-1",
        group: "J",

        date: "2026-06-16",
        time: "22:00",

        team1: "Argentina",
        team2: "Austria",

        team1Code: "ARG",
        team2Code: "AUT",

        stadium: "Kansas City Stadium",
        city: "Kansas City",

        status: "scheduled",
      },

      {
        id: "J-2",
        group: "J",

        date: "2026-06-17",
        time: "01:00",

        team1: "Jordania",
        team2: "Argelia",

        team1Code: "JOR",
        team2Code: "ALG",

        stadium: "San Francisco Bay Stadium",
        city: "San Francisco",

        status: "scheduled",
      },

      {
        id: "J-3",
        group: "J",

        date: "2026-06-22",
        time: "21:00",

        team1: "Argentina",
        team2: "Jordania",

        team1Code: "ARG",
        team2Code: "JOR",

        stadium: "Dallas Stadium",
        city: "Dallas",

        status: "scheduled",
      },

      {
        id: "J-4",
        group: "J",

        date: "2026-06-23",
        time: "23:00",

        team1: "Argelia",
        team2: "Austria",

        team1Code: "ALG",
        team2Code: "AUT",

        stadium: "San Francisco Bay Stadium",
        city: "San Francisco",

        status: "scheduled",
      },

      {
        id: "J-5",
        group: "J",

        date: "2026-06-27",
        time: "23:00",

        team1: "Argelia",
        team2: "Argentina",

        team1Code: "ALG",
        team2Code: "ARG",

        stadium: "Dallas Stadium",
        city: "Dallas",

        status: "scheduled",
      },

      {
        id: "J-6",
        group: "J",

        date: "2026-06-27",
        time: "23:00",

        team1: "Austria",
        team2: "Jordania",

        team1Code: "AUT",
        team2Code: "JOR",

        stadium: "Dallas Stadium",
        city: "Dallas",

        status: "scheduled",
      },
    ],
  },
]

export const knockoutFixtures = {
  round32: [],
  round16: [],
  quarterfinals: [],
  semifinals: [],

  thirdplace: {
    id: "third",

    group: "",

    date: "2026-07-18",
    time: "17:00",

    team1: "Perdedor SF1",
    team2: "Perdedor SF2",

    team1Code: "TBD",
    team2Code: "TBD",

    stadium: "Hard Rock Stadium",
    city: "Miami",

    status: "scheduled" as MatchStatus,
  },

  final: {
    id: "final",

    group: "",

    date: "2026-07-19",
    time: "17:00",

    team1: "Ganador SF1",
    team2: "Ganador SF2",

    team1Code: "TBD",
    team2Code: "TBD",

    stadium: "MetLife Stadium",
    city: "Nueva York",

    status: "scheduled" as MatchStatus,
  },
}

export function getArgentinaMatches() {
  return groups
    .flatMap((group) => group.matches)
    .filter(
      (match) =>
        match.team1 === "Argentina" ||
        match.team2 === "Argentina"
    )
}