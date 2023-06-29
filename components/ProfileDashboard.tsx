'use client'

import { useSession, signOut } from 'next-auth/react'
import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { getUser } from "@/app/apiMethods"
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
      <div className="flex flex-col space-y-5">
        <div className='flex justify-between'>
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-3 md:space-x-5 md:flex-row md:space-y-0 md:items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 aspect-square">
                <Image 
                  src={user.image || ""}
                  height={100}
                  width={100}
                  alt="avatar"
                  className="rounded-full border border-zinc-800 p-0.5"
                />
              </div>  
              <div className="flex flex-col space-y-2">
                <div className="flex flex-col">
                  <h3 className="font-bold md:text-lg">{user.name}</h3>
                  <p className="text-zinc-400 font-medium">{user.bio}</p>
                </div>
                <p className="text-xs text-zinc-400">Joined {(new Date(user.joined)).getFullYear()}</p>
              </div>
            </div>         
          </div>
          <div className="flex space-x-4 md:space-x-8">
            <div className="flex flex-col space-y-1 text-center">
              <p className="font-bold md:text-lg">{user.reviews.length}</p>
              <Link href={`/profile/${user.id}`} className="text-xs text-zinc-400 hover:opacity-80 duration-300">Review{user.reviews.length != 1 && "s"}</Link>
            </div>
            <div className="flex flex-col space-y-1 text-center">
              <p className="font-bold md:text-lg">{user.followers ? user.followers.length : 0}</p>
              <Link href={`/profile/${user.id}/followers`} className="text-xs text-zinc-400 hover:opacity-80 duration-300">Follower{user.followers && user.followers.length != 1 && "s"}</Link>
            </div>
            <div className="flex flex-col space-y-1 text-center">
              <p className="font-bold md:text-lg">{user.follows ? user.follows.length : 0}</p>
              <Link href={`/profile/${user.id}/following`} className="text-xs text-zinc-400 hover:opacity-80 duration-300">Following</Link>
            </div>
          </div>
        </div>
        {
          user.spotifyUsername &&
          <a className='w-fit flex space-x-2 items-center text-zinc-400 font-medium text-sm hover:text-green-400 duration-300' href={`https://open.spotify.com/user/${user.spotifyUsername}`}>
            <BsSpotify className='text-xl'/>
            <p>{user.spotifyUsername}</p>
          </a>
        }
        {
          (session && session.user.id == user.id) ?
          <div className="flex space-x-5 items-center text-sm font-semibold">
          <button 
            className="py-2 px-8 rounded-md bg-white text-zinc-950 hover:opacity-80 duration-300"
            onClick={() => signOut()}
          >            
            <p>Sign Out</p>
          </button>
          <Link 
            href="/settings"
            className="py-2 px-8 rounded-md border border-zinc-800 hover:bg-zinc-800 duration-300"
          >
            <p>Settings</p>
          </Link>
        </div> : 
          session && session.user && user &&
          <FollowButton user={user}/>
        }   
      </div>
    )
  } else {
    return (
      <div className="flex flex-col space-y-8 md:space-y-5">
        <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:justify-between md:items-start">
          <div className="flex space-x-5 items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 aspect-square bg-zinc-800 animate-pulse rounded-full"></div>  
            <div className="flex flex-col space-y-3">
              <div className="bg-zinc-800 h-2 rounded-full w-48 md:w-64 animate-pulse"></div>
              <div className="bg-zinc-800 h-2 rounded-full w-32 md:w-48 animate-pulse"></div>
              <div className="bg-zinc-800 h-2 rounded-full w-16 md:w-32 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}