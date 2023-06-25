import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Link from "next/link"
import { TbArrowLeft } from "react-icons/tb"
import ReviewForm from "@/components/ReviewForm"
import { getTrack } from "@/app/serverMethods"
import TrackData from "@/components/TrackData"
import { Suspense } from "react"
import DataSkeleton from "@/components/DataSkeleton"

export default function NewTrackReview({ params }: { params: { id: string }}) {
  return (
    <div className="flex flex-col space-y-10">
      <Link href="/" className="flex space-x-2 items-center py-2 px-4 border border-gray-700 rounded-md w-fit hover:opacity-80 duration-300">
        <TbArrowLeft className="text-lg"/>
        <p className="font-medium text-xs">Back</p>
      </Link>
      <Suspense fallback={<DataSkeleton/>}>
        <PageContent id={params.id}/>
      </Suspense>
    </div>
  )
}

async function PageContent({ id }: { id: string }) {
  const session = await getServerSession(authOptions)
  if (!session.user) {
    redirect("/")
  }

  const track = await getTrack(id)

  return (
    <>
      <TrackData id={id}/>
      <ReviewForm itemId={track.id} itemName={track.name}/>
    </>
  )
}