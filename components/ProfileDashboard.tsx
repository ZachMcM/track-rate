'use client'

import { useSession } from 'next-auth/react'
import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { formatCompactNumber, getUser } from "@/app/apiMethods"
import FollowButton from "./FollowButton"
import { BsSpotify } from 'react-icons/bs'

export default function ProfileDashboard({ id }: { id: string }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id)
  })
  const { data: session } = useSession()

  if (!isLoading && user) {
    return (
      <div className="flex flex-col items-center space-y-8 md:flex-row md:space-y-0 md:justify-between md:items-start rounded-lg">
        <div className='flex flex-col space-y-3 items-center md:space-y-0 md:flex-row md:space-x-5'>
          <div className="relative w-20 h-20 md:w-24 md:h-24 aspect-square">
            <Image 
              src={user.image || ""}
              fill
              alt="avatar"
              className="rounded-full"
            />
          </div>  
          <div className="flex flex-col space-y-1 items-center md:items-start">
            <h3 className="font-bold text-2xl md:text-3xl">{user.name}</h3>
            <p className="text-zinc-400 font-medium md:text-lg whitespace-pre-wrap">{user.bio}</p>
          {
            user.spotifyUsername &&
            <a href={`https://open.spotify.com/user/${user.spotifyUsername}`} className='flex font-medium space-x-2 items-center text-sky-400 hover:opacity-80 duration-300'>
              <BsSpotify className='md:text-xl'/>
              <p className='text-sm md:text-base'>{user.spotifyUsername}</p>
            </a>
          }
          </div>
        </div>
        <div className='flex flex-col space-y-5'>
          <div className="flex">
            <div className="flex flex-col text-center border-r border-zinc-200 px-4">
              <p className="font-bold text-lg md:text-2xl">{formatCompactNumber(user.reviews.length)}</p>
              <Link href={`/profile/${user.id}`} className="text-sm md:text-base text-zinc-400 hover:text-sky-400 duration-300">Review{user.reviews.length != 1 && "s"}</Link>
            </div>
            <div className="flex flex-col text-center border-r border-zinc-200 px-4">
              <p className="font-bold text-lg md:text-2xl">{formatCompactNumber(user.followers.length)}</p>
              <Link href={`/profile/${user.id}/followers`} className="text-sm md:text-base text-zinc-400 hover:text-sky-400 duration-300">Follower{user.followers && user.followers.length != 1 && "s"}</Link>
            </div>
            <div className="flex flex-col text-center px-4">
              <p className="font-bold text-lg md:text-2xl">{formatCompactNumber(user.follows.length)}</p>
              <Link href={`/profile/${user.id}/following`} className="text-sm md:text-base text-zinc-400 hover:text-sky-400 duration-300">Following</Link>
            </div>
          </div>
          {
            session &&
            <>
            {
              session.user.id == user.id ?
              <button
                className='py-3 px-4 rounded-md drop-shadow-lg bg-sky-400 font-medium text-white hover:opacity-80 duration-300'
              >
                <p>Settings</p>
              </button> :
              <FollowButton user={user}/>
            }              
            </>
          }
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col space-y-8 md:space-y-5 px-10 py-20">
        <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:justify-between md:items-start">
          <div className="flex space-x-5 items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 aspect-square bg-zinc-200 animate-pulse rounded-full"></div>  
            <div className="flex flex-col space-y-3">
              <div className="bg-zinc-200 h-2 rounded-full w-48 md:w-64 animate-pulse"></div>
              <div className="bg-zinc-200 h-2 rounded-full w-32 md:w-48 animate-pulse"></div>
              <div className="bg-zinc-200 h-2 rounded-full w-16 md:w-32 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}