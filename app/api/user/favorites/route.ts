import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (session && session.user && session.user.id) {
    const body = await request.json()
    const { favAlbum, favArtist, favTrack } = body
    const updateUser = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        favAlbum: favAlbum,
        favArtist: favArtist,
        favTrack: favTrack
      }
    })
    return NextResponse.json(updateUser)
  } else {
    return NextResponse.json({ error: "Unauthorized request" }, { status: 400 })
  }
}