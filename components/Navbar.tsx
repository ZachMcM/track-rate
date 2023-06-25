'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { TbLayoutSidebarRightCollapse, TbPlaylist, TbPlaylistAdd, TbX } from "react-icons/tb"
import Image from "next/image"
import { useState } from "react"
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useContext } from "react"
import { ReviewModalContext, ReviewModalProviderType } from "./ReviewModalProvider"

const Navbar = () => {
  const { data: session } = useSession()

  const [mobileMenu, setMobileMenu] = useState<boolean>(false)
  const { setReviewModal } = useContext(ReviewModalContext) as ReviewModalProviderType

  const MobileMenu = () => {
    const menuRef = useDetectClickOutside({ onTriggered(e) {
        e.preventDefault()
        setMobileMenu(false)
    }})

    return (
      <div className="fixed h-full w-full left-0 top-0 bottom-0 backdrop-blur-sm z-50">
        <div ref={menuRef} className="h-full w-4/5 bg-gray-950 z-50 border-r border-gray-700 p-6 text-gray-400">
          <div className="flex flex-col space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2 items-center text-white">
                <TbPlaylist className="text-2xl"/>
                <h3 className="font-bold">TrackRate</h3>
              </div>
              <button 
                className="p-1 rounded-md border border-gray-700"
                onClick={() => setMobileMenu(false)}
              >
                <TbX className="text-sm text-white"/>
              </button>
            </div>
            {
              session && session.user.image &&
              <div className="flex items-center space-x-3 border-b border-gray-700 pb-3">
                <Image
                  src={session.user.image}
                  height={30}
                  width={30}
                  alt="avatar"
                  className="rounded-full"
                />
                <p className="font-bold">{session.user.email?.substring(0, session.user.email.indexOf("@"))}</p>
              </div>
            }
            <div className="px-5 flex flex-col space-y-3 font-medium">
              <Link 
                onClick={() => setMobileMenu(false)} 
                href={`/profile/${session?.user.id}`}
                className="hover:opacity-80"
              >
                  Profile
              </Link>
              <Link 
                onClick={() => setMobileMenu(false)} 
                href={`/profile/${session?.user.id}/reviews`}
                className="hover:opacity-80"
              >
                Reviews
              </Link>
              <Link onClick={() => setMobileMenu(false)} href="/settings" className="hover:opacity-80">Settings</Link>
              <button onClick={() => signOut()} className="hover:opacity-80 text-start">Sign Out</button>
            </div>
            <div className="flex flex-col space-y-3 font-medium">
              <Link onClick={() => setMobileMenu(false)} href="/" className="hover:opacity-80 pb-3 border-b border-gray-700">Home</Link>
              <Link onClick={() => setMobileMenu(false)} href="/tracks" className="hover:opacity-80 pb-3 border-b border-gray-700">Tracks</Link>
              <Link onClick={() => setMobileMenu(false)} href="/albums" className="hover:opacity-80 pb-3 border-b border-gray-700">Albums</Link>
            </div>
          </div>
        </div>
      </div>
    ) 
  }

  return (
    <>
      <nav className="z-40 bg-gray-950 sticky top-0 left-0 border-b w-full border-gray-700 p-4 md:px-8 lg:px-16 flex justify-between items-center">
        <div className="flex space-x-1 items-center">
          <Link className="hidden md:flex space-x-2 items-center" href="/">
            <TbPlaylist className="text-2xl"/>
            <h3 className="font-bold text-lg">TrackRate</h3>
          </Link>
          <button 
            onClick={() => setMobileMenu(true)}
            className="md:hidden p-2 rounded-md hover:bg-gray-900 duration-300 flex items-center space-x-1"
          >
            <TbLayoutSidebarRightCollapse className="text-3xl"/>
          </button>
          {/* Todo */}
          <input 
            type="text" 
            className="md:hidden text-sm focus:outline-none ring-offset-gray-950 focus:ring-2 ring-offset-2 ring-gray-700 bg-transparent border w-fit border-gray-700 outline-none placeholder:text-gray-300 py-2 px-4 rounded-md"
            placeholder="Search..."
          />
        </div>
        <div className="hidden md:flex items-center text-gray-400 font-medium text-xs lg:text-sm">
          {
            session && session.user.image ?
            <Link 
              href={`/profile/${session.user?.id}`}
              className="py-2 px-3 rounded-md hover:bg-gray-900 duration-300"
            >
              <div className="flex items-center space-x-3">
                <Image
                  src={session.user.image}
                  height={30}
                  width={30}
                  alt="avatar"
                  className="rounded-full"
                />
                <p className="hidden lg:block">{session.user.name}</p>
              </div>
            </Link> :
            <button className="py-2 px-3 rounded-md hover:bg-gray-900 duration-300" onClick={() => signIn()}>Sign In</button>
          }
          <Link className="py-2 px-3 rounded-md hover:bg-gray-900 duration-300" href="/tracks">Tracks</Link>
          <Link className="py-2 px-3 rounded-md hover:bg-gray-900 duration-300" href="/albums">Albums</Link>
          {/* Todo */}
          <button 
            onClick={() => setReviewModal(true)}
            className="py-2 px-3 rounded-md hover:bg-gray-900 duration-300 flex items-center space-x-1"
          >
            <p>Add</p>
            <TbPlaylistAdd className="text-xl"/>
          </button>
          {/* Todo */}
          <input 
            type="text" 
            className="focus:ring-2 mx-3 my-2 ring-offset-2 ring-offset-gray-950 focus:outline-none ring-gray-700 bg-transparent border border-gray-700 placeholder:text-gray-300 py-2 px-4 rounded-md"
            placeholder="Search..."
          />
        </div>
        <div className="md:hidden flex text-gray-400">
          <button 
            onClick={() => setReviewModal(true)}
            className="p-2 rounded-md hover:bg-gray-900 duration-300 flex items-center space-x-1"
          >
            <TbPlaylistAdd className="text-2xl"/>
          </button>
        </div>
      </nav>
      {mobileMenu && <MobileMenu/>}
    </>
  )
}

export default Navbar