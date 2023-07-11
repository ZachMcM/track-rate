import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import CustomFeed from "./CustomFeed";
import GeneralFeed from "./GeneralFeed";

export default async function Feed() {
  const session = await getServerSession(authOptions)

    return (
      <Suspense fallback={<div className="w-full basis-2/3"><LoadingSpinner/></div>}>
        {
          session ? <CustomFeed/> : <GeneralFeed/>
        }
      </Suspense>
    )
}