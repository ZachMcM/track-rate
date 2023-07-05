import GeneralFeed from "@/components/GeneralFeed";
import Link from "next/link";
import { TbAlignLeft, TbArrowRight, TbHeartFilled, TbHome, TbStarFilled, TbUserCheck } from "react-icons/tb";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route";
import CustomFeed from "@/components/CustomFeed";
import ReviewClientButton from "@/components/ReviewClientButton";

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
 
export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex space-y-5 mx-8 mt-20 md:mx-20 flex-col">
      <h1 className="text-3xl font-semibold">Your Feed</h1>
      <div className="flex flex-col-reverse md:flex-row md:space-y-0 md:space-x-8 items-start">
        {
          session ?
          <CustomFeed/> :
          <GeneralFeed/>
        }
        <div className="drop-shadow-lg mb-8 mt-0 rounded-lg bg-white w-full basis-1/3">
          <div className="p-5 flex space-x-2 items-center border-b border-zinc-200">
            <TbHome className="text-lg"/>
            <p className="font-medium text-lg">Home</p>
          </div>
          <div className="flex flex-col space-y-5 bg-zinc-100 p-5 rounded-b-lg">
            <p className="text-zinc-500">This is your trackrate homepage. Come here to view the latest and greatest reviews from your friends and the community!</p>
            <ReviewClientButton/>
          </div>
        </div>
      </div>
    </div>
  ) 
}