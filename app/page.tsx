import GeneralFeed from "@/components/GeneralFeed";
import { TbHome } from "react-icons/tb";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route";
import CustomFeed from "@/components/CustomFeed";
import ReviewClientButton from "@/components/review/ReviewClientButton";
import Link from "next/link";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
 
export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col mt-20 mx-3 my-10 md:m-14 lg:mx-48 2xl:mx-96 ">
      {
        !session &&
        <div className="flex-col my-20 space-y-5 w-full flex items-center text-center">
          <div className="flex flex-col space-y-2 md:space-y-1 items-center">
            <div className="rounded-full w-fit px-6 py-1.5 text-xs bg-white text-zinc-500 dark:bg-zinc-900">Just Launched</div>
            <h1 className="font-bold text-4xl md:text-5xl">Rate and review your favorite music</h1>
            <p className="md:text-xl font-medium text-zinc-500">A social media site for all music fans- from hip hop heads to punk rockers</p>
          </div>
          <Link className="font-medium py-2.5 px-5 rounded-lg bg-zinc-950 text-white hover:opacity-80 duration-300 dark:bg-white dark:text-zinc-950 " href="/signin">Get Started</Link>
        </div>
      }
      <div className="flex flex-col space-y-5">
        <h1 className="text-3xl font-semibold">Your Feed</h1>
        <div className="flex flex-col-reverse md:flex-row md:space-y-0 md:space-x-8 items-start">
          {
            session ?
            <Suspense fallback={<LoadingSpinner/>}>
              <CustomFeed/>
            </Suspense> :
            <Suspense fallback={<LoadingSpinner/>}>
              <GeneralFeed/>
            </Suspense>
          }
          <div className="drop-shadow-md  mb-8 mt-0 rounded-lg dark:bg-zinc-900 bg-white w-full basis-1/3">
            <div className="p-5 flex space-x-2 items-center border-b dark:border-zinc-700 border-zinc-200">
              <TbHome className="text-lg"/>
              <p className="font-medium text-lg">Home</p>
            </div>
            <div className="flex flex-col space-y-5 dark:bg-zinc-900 bg-white p-5 rounded-b-lg">
              <p className="text-zinc-500">This is your trackrate homepage. Come here to view the latest and greatest reviews from your friends and the community!</p>
              <ReviewClientButton/>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) 
}