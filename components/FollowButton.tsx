import { updateFollow } from "@/app/apiMethods";
import { FullUser } from "@/app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from 'next-auth/react'
import { useState } from "react";
import { TbUserPlus, TbUserX } from "react-icons/tb";

export default function FollowButton({ user }: { user: FullUser }) {
  const queryClient = useQueryClient()
  const { data: session } = useSession()

  const followMutation = useMutation({
    mutationFn: () => updateFollow(user?.id || ""),
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['user', user?.id]})
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

  return (
    <button
      className="flex w-fit space-x-2 items-center text-xs md:text-sm px-4 py-2 rounded-md font-medium border border-zinc-700 hover:opacity-80 duration-300"
      onClick={() => {
        followMutation.mutate()
        setFollowing(!following)
      }}
    >
    {
      following ? 
      <div className="flex space-x-2 items-center">
        <p>Unfollow</p>
        <TbUserX className="text-lg"/>
      </div> : 
      <div className="flex space-x-2 items-center">
        <p>Follow</p>
        <TbUserPlus className="text-lg"/>
      </div>
    }
  </button>
  )
}