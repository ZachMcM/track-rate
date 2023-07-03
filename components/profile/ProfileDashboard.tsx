import { useSession } from 'next-auth/react'
import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { formatCompactNumber } from "@/app/apiMethods"
import FollowButton from "../FollowButton"
import { BsSpotify } from 'react-icons/bs'
import { getUser } from '@/app/serverMethods'
import ProfileButtons from './ProfileButtons'

export default async function ProfileDashboard({ id }: { id: string }) {
  const user = await getUser(id)

    return (
      <div className="flex flex-col items-center space-y-8 md:flex-row md:space-y-0 md:justify-between md:items-start rounded-lg">
        <div className='flex flex-col space-y-3 items-center md:space-y-0 md:flex-row md:space-x-5'>
          <div className="relative w-20 h-20 drop-shadow-xl  md:w-24 md:h-24 aspect-square">
            <Image 
              src={user.image || ""}
              fill
              alt="avatar"
              className="rounded-full drop-shadow-xl "
            />
          </div>  
          <div className="flex flex-col space-y-1 items-center md:items-start">
            <h3 className="font-bold text-2xl md:text-3xl">{user.name}</h3>
            <p className="text-zinc-500 font-medium md:text-lg whitespace-pre-wrap">{user.bio}</p>
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
              <Link href={`/profile/${user.id}`} className="text-sm md:text-base text-zinc-500 hover:text-sky-400 duration-300">Review{user.reviews.length != 1 && "s"}</Link>
            </div>
            <div className="flex flex-col text-center border-r border-zinc-200 px-4">
              <p className="font-bold text-lg md:text-2xl">{formatCompactNumber(user.followers.length)}</p>
              <Link href={`/profile/${user.id}/followers`} className="text-sm md:text-base text-zinc-500 hover:text-sky-400 duration-300">Follower{user.followers && user.followers.length != 1 && "s"}</Link>
            </div>
            <div className="flex flex-col text-center px-4">
              <p className="font-bold text-lg md:text-2xl">{formatCompactNumber(user.follows.length)}</p>
              <Link href={`/profile/${user.id}/following`} className="text-sm md:text-base text-zinc-500 hover:text-sky-400 duration-300">Following</Link>
            </div>
          </div>
          <ProfileButtons user={user}/>
        </div>
      </div>
    )
}