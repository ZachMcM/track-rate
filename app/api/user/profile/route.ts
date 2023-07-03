import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { revalidateTag } from "next/cache";
import { supabase } from "@/supabase/supabase";
import { uid } from "uid";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (session && session.user && session.user.id) {
    const formData = await request.formData()

      const bio = formData.get("bio") as string
      const name = formData.get("name") as string
      const spotifyUsername = formData.get("spotifyUsername") as string
      const pfp = formData.get("avatar") as File | undefined

    if (pfp) {
      const { data, error } = await supabase.storage.from("avatars").upload(`/public/${uid()}`, pfp)

      console.log(data)

      if (error) {
        console.log(error)
        return NextResponse.json(error.message)
      }
  
      const updateUser = await prisma.user.update({
        where: {
          id: session.user.id
        },
        data: {
          bio: bio,
          name: name,
          spotifyUsername: spotifyUsername,
          image: `https://rpiubyotsurmrmuepinw.supabase.co/storage/v1/object/public/avatars/${data.path}`
        }
      })

      revalidateTag(session.user.id)
      return NextResponse.json(updateUser)
    } else {
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

      revalidateTag(session.user.id)
      return NextResponse.json(updateUser)
    }

  } else {
    return NextResponse.json({ error: "Unauthorized request" }, { status: 400 })
  }
}