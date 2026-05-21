import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    useLocalData: true,

    fixtures: [],

    lastUpdate: new Date().toISOString(),
  })
}