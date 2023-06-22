import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (session && session.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: email || session.user?.email
      }
    })
    return NextResponse.json(user)
  } else {
    return NextResponse.json({error: "Unauthorized request"})
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (session && session.user && session.user.email) {
    const body = await request.json()
    const { bio, favoriteAlbum, favoriteArtist, favoriteTrack, name } = body
    const updateUser = await prisma.user.update({
      where: {
        email: session.user.email
      },
      data: {
        bio: bio,
        name: name,
        favAlbum: favoriteAlbum,
        favArtist: favoriteArtist,
        favTrack: favoriteTrack
      }
    })
    return NextResponse.json(updateUser)
  } else {
    return NextResponse.json({ error: "Unauthorized request" }, { status: 400 })
  }
}