import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (userId) {
    const userActivity = await prisma.activity.findMany({
      where: {
        userId: userId
      }
    })
    return NextResponse.json(userActivity)
  } else {
    return NextResponse.json({ error: "Unauthorized request", status: 400 })
  }
}