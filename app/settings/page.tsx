'use client'

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react"
import { getUser } from "@/app/apiMethods";
import ProfileForm from "@/components/profile/ProfileForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import { redirect } from "next/navigation";

export default function Settings() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect("/")
    },
  })

  if (session) {
    const { data: user, isLoading } = useQuery({
      queryKey: ['user', { id: session?.user.id }],
      queryFn: () => getUser(session?.user.id)
    })

    if (user && !isLoading) {
      return <ProfileForm user={user}/>
    } else {
      return <LoadingSpinner/>
    }    
  } else {
    redirect("/")
  }
}