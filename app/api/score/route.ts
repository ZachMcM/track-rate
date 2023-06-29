import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const itemId = searchParams.get("itemId")

  const session = await getServerSession(authOptions)

  if (session && itemId) {
    const numPositive = await prisma.review.count({
      where: {
        itemId: itemId,
        rating: {
          gt: 2
        }
      }
    })

    const total = await prisma.review.count({
      where: {
        itemId: itemId
      }
    })

    return NextResponse.json(Math.round(numPositive / total) * 100)

  } else {
    return NextResponse.json({ error: "Unauthorized request" }, { status: 400 })

  }
}