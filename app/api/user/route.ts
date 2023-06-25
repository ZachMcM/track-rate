import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      },
      include: {
        reviews: true,
        likes: true,
        acivities: true
      }
    })
    return NextResponse.json(user)
  } else {
    return NextResponse.json({error: "Invalid request, no id"})
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