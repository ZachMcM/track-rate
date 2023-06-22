import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (session) {
    const authParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`
    }
  
    const res = await fetch("https://accounts.spotify.com/api/token", authParams)
    const data = await res.json()
    return NextResponse.json(data)
  } else {
    return NextResponse.json({error: "Unauthorized Request", status: 400})
  }
}