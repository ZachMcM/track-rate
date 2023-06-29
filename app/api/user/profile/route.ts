import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (session && session.user && session.user.id) {
    const body = await request.json()
    const { bio, name, spotifyUsername } = body
    const updateUser = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        bio: bio,
        name: name,
        spotifyUsername: spotifyUsername
      }
    })
    return NextResponse.json(updateUser)
  } else {
    return NextResponse.json({ error: "Unauthorized request" }, { status: 400 })
  }
}