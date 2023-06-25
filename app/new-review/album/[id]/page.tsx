import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Link from "next/link"
import { TbArrowLeft } from "react-icons/tb"
import ReviewForm from "@/components/ReviewForm"
import AlbumData from "@/components/AlbumData"
import { getAlbum } from "@/app/serverMethods"
import DataSkeleton from "@/components/DataSkeleton"
import { Suspense } from "react"

export default function NewAlbumReview({ params }: { params: { id: string }}) {
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

  const album = await getAlbum(id)

  return (
    <>
      <AlbumData id={id}/>
      <ReviewForm albumTracks={album.tracks.items} itemId={album.id} itemName={album.name}/>
    </>
  )
}