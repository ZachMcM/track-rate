'use client'

import { updateFollow } from "@/app/apiMethods";
import { FullUser, UserExtendedFollowers } from "@/app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from 'next-auth/react'
import { useState } from "react";
import { useRouter } from "next/navigation"

export default function FollowButton({ user }: { user: UserExtendedFollowers }) {
  const queryClient = useQueryClient()
  const { data: session } = useSession()

  const router = useRouter()

  const followMutation = useMutation({
    mutationFn: () => updateFollow(user?.id || ""),
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['user', user?.id]})
      queryClient.invalidateQueries({ queryKey: ['user', session?.user.id]})
      router.refresh()
    }
  })

  const isFollowing = (): boolean => {
    if (user && session?.user) {
      for (const follower of user.followers) {
        if (follower.id == session.user.id) {
          return true
        }
      }
    }
    return false
  }

  const [following, setFollowing] = useState<boolean>(isFollowing())

  if (session) {
    return (
      <button
        className="py-3 px-4 rounded-md drop-shadow-lg bg-sky-400 font-medium text-white hover:opacity-80 duration-300"
        onClick={() => {
          followMutation.mutate()
          setFollowing(!following)
        }}
      >
      {
        following ? 
        <p>Unfollow</p> : 
        <p>Follow</p>
      }
    </button>
    )    
  }
}