import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (query) {
    const queryResults = await prisma.user.findMany({
      where: {
        name: {
          contains: query
        }
      },
      take: 20,
      orderBy: {
        followers: {
          _count: "desc"
        }
      }
    })    
    return NextResponse.json(queryResults)
  } else {
    return NextResponse.json({ error: "No query" })
  }
}