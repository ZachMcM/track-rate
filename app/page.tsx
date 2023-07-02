import GeneralFeed from "@/components/GeneralFeed";
import Link from "next/link";
import { TbAlignLeft, TbArrowRight, TbHeartFilled, TbStarFilled, TbUserCheck } from "react-icons/tb";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route";
import CustomFeed from "@/components/CustomFeed";
 
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <div className="flex flex-col mt-10 space-y-16 w-full p-5 md:px-10 lg:px-44">
        <div className="w-full flex flex-col space-y-10">
          <div className="flex flex-col space-y-5 items-center">
            <div className="flex flex-col space-y-2 items-center text-center">
              <div className="py-1.5 px-4 font-medium bg-zinc-800 text-xs rounded-full w-fit">Just launched</div>
              <h1 className="text-3xl md:text-5xl font-bold">Review the latest albums and tracks.</h1>
              <p className="text-zinc-400 font-medium md:text-xl">A social media app for rock and roll fans rap fans and everything in between.</p>
            </div>
            <Link href="/signin" className="font-medium text-sm bg-white text-zinc-950 hover:opacity-80 duration-300 rounded-md py-3 px-4 flex items-center space-x-2">
              <p>Get Started</p>
              <TbArrowRight className="text-lg"/>
            </Link>
          </div>
          <div className="flex flex-col space-y-3 md:space-y-0 md:grid grid-cols-2 gap-3 font-medium">
            <div className="border border-zinc-800 rounded-md flex space-x-3 p-5">
              <TbHeartFilled className="text-3xl"/>
              <p>Show another user some love by liking their review.</p>
            </div>
            <div className="border border-zinc-800 rounded-md flex space-x-3 p-5">
              <TbStarFilled className="text-3xl"/>
              <p>Rate tracks or albums on a five star scale to show what you thought.</p>
            </div>
            <div className="border border-zinc-800 rounded-md flex space-x-3 p-5">
              <TbUserCheck className="text-3xl"/>
              <p>Build a network by following other users.</p>
            </div>
            <div className="border border-zinc-800 rounded-md flex space-x-3 p-5">
              <TbAlignLeft className="text-3xl"/>
              <p>Write reviews to share your thoughts on the latest music.</p>
              </div>
          </div>
        </div>
        <GeneralFeed/>
      </div>
    ) 
  } else {
    return (
      <div className="flex flex-col space-y-2 mt-10 p-5 lg:px-44">
        <h1 className="font-medium text-lg">Timeline</h1>
        <CustomFeed/>
      </div>
    )
  }
}
