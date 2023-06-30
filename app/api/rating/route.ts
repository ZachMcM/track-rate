import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const itemId = searchParams.get("itemId")

  const session = await getServerSession(authOptions)

  if (session && itemId) {
    const aggregations = await prisma.review.aggregate({
      _avg: {
        rating: true
      },
      _count: true,
      where: {
        itemId: itemId
      }
    })

    return NextResponse.json({ 
      avg: aggregations._avg.rating,
      total: aggregations._count
    })
  } else {
    return NextResponse.json({ error: "Unauthorized request" }, { status: 400 })

  }
}