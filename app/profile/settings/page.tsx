'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
export default function ProfileSettings() {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("signin?callbackUrl=/")
    }
  })

  return (
    <main className="p-10 md:py-10 md:px-48 lg:px-64">
    </main>
  )
}