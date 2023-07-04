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
        likes: {
          include: {
            review: {
              include: {
                comments: true,
                likes: true,
                user: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
      }
    })
    return NextResponse.json(user)
  } else {
    return NextResponse.json({error: "Invalid request, no id"})
  }
}