'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { TbLayoutSidebarRightCollapse, TbPlus, TbX } from "react-icons/tb"
import Image from "next/image"
import { useState } from "react"
import { useDetectClickOutside } from 'react-detect-click-outside';
import { ReviewFormContext, ReviewFormProviderType } from "./ReviewFormProvider";
import { useContext } from "react"
import ReviewForm from "./ReviewForm"

const Navbar = () => {
  const { data: session } = useSession()

  const [mobileMenu, setMobileMenu] = useState<boolean>(false)
  const {reviewForm, setReviewForm}= useContext(ReviewFormContext) as ReviewFormProviderType

  const MobileMenu = () => {
    const menuRef = useDetectClickOutside({ onTriggered(e) {
        e.preventDefault()
        setMobileMenu(false)
    }})

    return (
      <div className="fixed h-full w-full left-0 top-0 bottom-0 backdrop-blur-sm z-50">
        <div ref={menuRef} className="h-full w-4/5 bg-gray-950 z-50 border-r border-gray-700 p-6 text-gray-400">
          <div className="flex flex-col space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-white">trackrate</h3>
              <button 
                className="p-1 rounded-md border border-gray-700"
                onClick={() => setMobileMenu(false)}
              >
                <TbX className="text-sm text-white"/>
              </button>
            </div>
            {
              session && session.user && session.user.image && session.user.email &&
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
              <Link onClick={() => setMobileMenu(false)} href="/profile" className="hover:opacity-80">Profile</Link>
              <Link onClick={() => setMobileMenu(false)} href="/profile/reviews" className="hover:opacity-80">Reviews</Link>
              <Link onClick={() => setMobileMenu(false)} href="/profile/settings" className="hover:opacity-80">Settings</Link>
              <button onClick={() => signOut()} className="hover:opacity-80 text-start">Sign Out</button>
            </div>
            <div className="flex flex-col space-y-3 font-medium">
              <Link onClick={() => setMobileMenu(false)} href="/" className="hover:opacity-80 pb-3 border-b border-gray-700">Home</Link>
              <Link onClick={() => setMobileMenu(false)} href="/msuic" className="hover:opacity-80 pb-3 border-b border-gray-700">Music</Link>
              <Link onClick={() => setMobileMenu(false)} href="/users" className="hover:opacity-80 pb-3 border-b border-gray-700">Users</Link>
            </div>
          </div>
        </div>
      </div>
    ) 
  }

  return (
    <>
      <nav className="z-40 bg-gray-950 sticky top-0 left-0 border-b w-full border-gray-700 p-4 md:px-16 flex justify-between items-center">
        <div className="flex space-x-1 items-center">
          <h3 className="font-bold hidden md:flex">trackrate</h3>
          <button 
            onClick={() => setMobileMenu(true)}
            className="md:hidden p-2 rounded-md hover:bg-gray-900 duration-300 flex items-center space-x-1"
          >
            <TbLayoutSidebarRightCollapse className="text-3xl"/>
          </button>
          {/* Todo */}
          <input 
            type="text" 
            className="md:hidden focus:outline-none ring-offset-gray-950 focus:ring-2 ring-offset-2 ring-gray-700 bg-transparent border w-fit border-gray-700 outline-none placeholder:text-gray-300 py-2 px-4 rounded-md"
            placeholder="Search..."
          />
        </div>
        <div className="hidden md:flex items-center text-gray-400 font-medium text-sm">
          {
            session && session.user && session.user.image ?
            <Link href="/profile" className="py-2 px-3 rounded-md hover:bg-gray-900 duration-300 flex items-center space-x-3">
              <Image
                src={session.user.image}
                height={30}
                width={30}
                alt="avatar"
                className="rounded-full"
              />
              <p>{session.user.name}</p>
            </Link> :
            <button className="py-2 px-3 rounded-md hover:bg-gray-900 duration-300" onClick={() => signIn()}>Sign In</button>
          }
          {/* Todo */}
          <Link 
            href="/"
            className="py-2 px-3 rounded-md hover:bg-gray-900 duration-300 flex items-center space-x-1"
          >
            <p>Home</p>
          </Link>
          <Link className="py-2 px-3 rounded-md hover:bg-gray-900 duration-300" href="/music">Music</Link>
          {/* Todo */}
          <button 
            onClick={() => setReviewForm(true)}
            className="py-2 px-3 rounded-md hover:bg-gray-900 duration-300 flex items-center space-x-1"
          >
            <p>New Review</p>
            <TbPlus className="text-xl"/>
          </button>
          {/* Todo */}
          <input 
            type="text" 
            className="focus:ring-2 mx-3 my-2 ring-offset-2 ring-offset-gray-950  focus:outline-none ring-gray-700 bg-transparent border w-fit border-gray-700 placeholder:text-gray-300 py-2 px-4 rounded-md"
            placeholder="Search..."
          />
        </div>
        <div className="md:hidden flex text-gray-400">
          <Link 
              href="/new-review"
              className="p-2 rounded-md hover:bg-gray-900 duration-300 flex items-center space-x-1"
          >
            <TbPlus className="text-2xl"/>
          </Link>
        </div>
      </nav>
      {mobileMenu && <MobileMenu/>}
      {reviewForm && <ReviewForm/>}
    </>
  )
}



export default Navbar