import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      },
      include: {
        reviews: {
          include: {
            _count: true
          }
        },
        followers: {
          include: {
           followers: true
          }
        },
        follows: {
          include: {
            followers: true
          }
        }
      }
    })
    return NextResponse.json(user)
  } else {
    return NextResponse.json({error: "Invalid request, no id"})
  }
}