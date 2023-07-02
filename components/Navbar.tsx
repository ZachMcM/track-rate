'use client'

import Link from "next/link"
import Image from "next/image"
import { useContext, useState } from "react"
import SearchBar from "./SearchBar"
import { TbMenu2, TbPlayerTrackNextFilled, TbPlus } from "react-icons/tb"
import Sidebar from "./Sidebar"
import { useSession } from "next-auth/react"
import ProfileDropdwon from "./ProfileDropdown"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { ReviewFormContext } from "./Provider"
import { ReviewFormProviderType } from "@/app/types"
import ReviewForm from "./ReviewForm"
import SearchModal from "./SearchModal"

export default function Navbar() {
  const [sideBar, setSidebar] = useState<boolean>(false)
  const { data: session, status } = useSession()
  const [dropdown, setDropdown] = useState<boolean>(false)

  const pathname = usePathname()
  const router = useRouter()

  const { 
    setSearchModal,
  } = useContext(ReviewFormContext) as ReviewFormProviderType

  const handleModalClick = () => {
    if (session) {
      setSearchModal(true)
    } else {
      router.push(`/signin?callbackUrl=${pathname}`)
    }
  }

  return (
    <nav className="sticky drop-shadow-md bg-white top-0 left-0 w-full z-20 px-5 md:px-10 h-16 flex items-center justify-between">
      <button
        className="hover:text-white flex md:hidden"
        onClick={() => setSidebar(true)}
        >
        <TbMenu2 className="text-2xl"/>
      </button>
      <div className="hidden md:flex space-x-5 items-center">
        <Link href="/" className="flex font-bold items-center space-x-2 hover:opacity-80 duration-300">
          <TbPlayerTrackNextFilled className="text-xl"/>
          <p>trackrate</p>
        </Link>
        <div className="flex items-center">
          <SearchBar/>
          <Link className="duration-300 text-sm font-medium py-2 px-4 hover:bg-zinc-100 rounded-md" href={"/users"}>Users</Link>
          <Link className="duration-300 text-sm font-medium py-2 px-4 hover:bg-zinc-100 rounded-md" href={"/music"}>Tracks</Link>
          <Link className="duration-300 text-sm font-medium py-2 px-4 hover:bg-zinc-100 rounded-md" href={"/music"}>Albums</Link>
        </div>
      </div>
      <div className="flex items-center space-x-3 text-sm">
          <button 
          className="flex space-x-2 items-center p-2.5 bg-zinc-200 drop-shadow-2xl rounded-full hover:bg-zinc-300 duration-300"
          onClick={handleModalClick}
          >
          <TbPlus className="text-xl"/>
        </button>
        {/* Todo */}
        {
          status != "loading" ?
          <>
            {
              session ? 
              <div className="relative">
              { dropdown && <ProfileDropdwon userId={session.user.id} name={session.user.name || ""} email={session.user.email || ""} setDropdown={setDropdown}/>}
                <button 
                  onClick={() => setDropdown(true)}
                  className="flex items-center space-x-2 hover:ring-4 rounded-full ring-sky-200 duration-300"
                >
                  <div className="relative w-10 h-10 aspect-square ">
                    <Image
                      fill
                      src={session.user.image || ""}
                      alt="avatar"
                      className="rounded-full bg-zinc-100"
                    />
                  </div>
                </button>
              </div> :
              <Link className="duration-300 text-sm text-zinc-950 px-4 py-2 font-medium bg-zinc rounded-md hover:opacity-80" href={"/signin?callbackUrl=/"}>Sign In</Link>
            }
          </> :
          <div className="w-10 h-10 aspect-square rounded-full bg-zinc-200 animate-pulse flex"></div>
        }
      </div>
      <Sidebar setSidebar={setSidebar} sideBar={sideBar}/>
      { sideBar && <div className="w-full h-full fixed top-0 left-0 z-30 backdrop-blur-md"></div> }
    </nav>
  )
}

