'use client'

import { useSession } from 'next-auth/react'
import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { formatCompactNumber, getUser } from "@/app/apiMethods"
import FollowButton from "../FollowButton"
import { BsSpotify } from 'react-icons/bs'
import ProfileSkeleton from './ProfileSkeleton'

export default function ProfileDashboard({ id }: { id: string }) {
  const { data: session } = useSession()

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', { id: id }],
    queryFn: () => getUser(id)
  })

  if (user && !isLoading) {
    return (
      <div className="flex flex-col items-center space-y-8 md:flex-row md:space-y-0 md:justify-between md:items-start rounded-lg">
        <div className='flex flex-col space-y-3 items-center md:space-y-0 md:flex-row md:space-x-5'>
          <div className="relative w-20 h-20 drop-shadow-md md:w-24 md:h-24 aspect-square">
            <Image 
              src={user.image || ""}
              fill
              alt="avatar"
              className="rounded-full drop-shadow-md"
            />
          </div>  
          <div className="flex flex-col space-y-1 items-center md:items-start">
            <h3 className="font-bold text-2xl md:text-3xl">{user.name}</h3>
            <p className="text-zinc-500 font-medium md:text-lg whitespace-pre-wrap">{user.bio}</p>
          {
            user.spotifyUsername &&
            <a href={`https://open.spotify.com/user/${user.spotifyUsername}`} className='flex font-medium space-x-2 items-center text-sky-400 hover:underline duration-300'>
              <BsSpotify className='md:text-xl'/>
              <p className='text-sm md:text-base'>{user.spotifyUsername}</p>
            </a>
          }
          </div>
        </div>
        <div className='flex flex-col space-y-5'>
          <div className="flex">
            <div className="flex flex-col text-center border-r dark:border-zinc-800 border-zinc-200 px-6">
              <p className="font-bold text-lg md:text-2xl">{formatCompactNumber(user.reviews.length)}</p>
              <Link href={`/profile/${user.id}`} className="text-sm md:text-base text-zinc-500 hover:text-zinc-950 duration-300">Review{user.reviews.length != 1 && "s"}</Link>
            </div>
            <div className="flex flex-col text-center border-r dark:border-zinc-800 border-zinc-200 px-6">
              <p className="font-bold text-lg md:text-2xl">{formatCompactNumber(user.followers.length)}</p>
              <Link href={`/profile/${user.id}/followers`} className="text-sm md:text-base text-zinc-500 hover:text-zinc-950 duration-300">Follower{user.followers && user.followers.length != 1 && "s"}</Link>
            </div>
            <div className="flex flex-col text-center px-6">
              <p className="font-bold text-lg md:text-2xl">{formatCompactNumber(user.follows.length)}</p>
              <Link href={`/profile/${user.id}/following`} className="text-sm md:text-base text-zinc-500 hover:text-zinc-950 duration-300">Following</Link>
            </div>
          </div>
          {
            session &&
            <>
            {
              session.user.id == user.id ?
              <Link href="/settings"
                className='py-3 px-4 text-center rounded-lg drop-shadow-md bg-sky-400 font-medium text-white hover:opacity-80 duration-300'
              >
                <p>Settings</p>
              </Link> : 
              <FollowButton user={user}/>
            }
            </>
          }
        </div>
      </div>
    )    
  } else {
    return <ProfileSkeleton/>    
  }


}