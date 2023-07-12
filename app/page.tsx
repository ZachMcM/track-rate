import { TbHome } from "react-icons/tb";
import ReviewClientButton from "@/components/review/ReviewClientButton";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Feed from "@/components/review/homepage/Feed";

 
export default function Home() {
  return (
    <div className="flex flex-col mt-20 mx-3 my-10 md:m-14 lg:mx-48 2xl:mx-96 ">
      <div className="flex flex-col space-y-5">
        <h1 className="text-3xl font-semibold">Your Feed</h1>
        <div className="flex flex-col-reverse md:flex-row md:space-y-0 md:space-x-8 items-start">
          <Suspense fallback={<div className="w-full basis-2/3"><LoadingSpinner/></div>}>
            <Feed/>
          </Suspense>
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