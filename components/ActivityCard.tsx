import { getAlbum, getReview, getUser } from "@/app/serverMethods";
import { Activity } from "@prisma/client";
import { access } from "fs";
import Link from "next/link";

export default async function ActivityCard({ activity }: { activity: Activity }) {
  const review = await getReview(activity.itemId)
  const otherUser = await getUser(activity.otherUserId || "")

    if (activity.activityType == "created review") {
      return (
        <>
          <span className="mr-1">You</span> 
          <Link className="font-bold hover:opacity-80 text-sky-400 duration-300 mr-1" href={`/review/${review.id}`}>reviewed</Link> 
          <Link className="font-bold hover:opacity-80 duration-300 mr-1" href={`/${review.type}/${review.item[1]}`}>{review.item[0]}</Link> 
        </>
      )
    }
    if (activity.activityType == "gave like") {
      return (
        <>
          <span className="mr-1">You</span> 
          <span className="mr-1">liked</span>
          <Link className="font-bold hover:opacity-80 duration-300 mr-1" href={`/profile/${otherUser.id}`}>{otherUser.name}'s</Link> 
          <Link className="font-bold hover:opacity-80 duration-300 mr-1 text-sky-400" href={`/review/${review.id}`}>review</Link> 
          <span className="mr-1">of</span>
          <Link className="font-bold hover:opacity-80 duration-300" href={`/${review.type}/${review.item[1]}`}>{review.item[0]}</Link> 
        </>
      )
    }
    if (activity.activityType == "recieved like") {
      return (
        <>
          <Link className="font-bold hover:opacity-80 duration-300 mr-1" href={`/profile/${otherUser.id}`}>{otherUser.name}</Link> 
          <span className="mr-1">liked</span>
          <span className="mr-1">your</span>
          <Link className="font-bold hover:opacity-80 duration-300 mr-1 text-sky-400" href={`/review/${review.id}`}>review</Link> 
          <span className="mr-1">of</span>
          <Link className="font-bold hover:opacity-80 duration-300" href={`/${review.type}/${review.item[1]}`}>{review.item[0]}</Link> 
      </>
      )
    }
    if (activity.activityType == "gave comment") {
      return (
        <>
          <span className="mr-1">You</span> 
          <span className="mr-1">commented</span>          
          <span className="mr-1">on</span>
          <Link className="font-bold hover:opacity-80 duration-300 mr-1" href={`/profile/${otherUser.id}`}>{otherUser.name}'s</Link> 
          <Link className="font-bold hover:opacity-80 duration-300 mr-1 text-sky-400" href={`/review/${review.id}`}>review</Link> 
          <span className="mr-1">of</span>
          <Link className="font-bold hover:opacity-80 duration-300" href={`/${review.type}/${review.item[1]}`}>{review.item[0]}</Link> 
        </>
      )
    }
    if (activity.activityType == "recieved comment") {
    return (
      <>
        <Link className="font-bold hover:opacity-80 duration-300 mr-1" href={`/profile/${otherUser.id}`}>{otherUser.name}</Link> 
        <span className="mr-1">commented</span>          
        <span className="mr-1">on</span>
        <span className="mr-1">your</span>
        <Link className="font-bold hover:opacity-80 duration-300 mr-1 text-sky-400" href={`/review/${review.id}`}>review</Link> 
        <span className="mr-1">of</span>
        <Link className="font-bold hover:opacity-80 duration-300" href={`/${review.type}/${review.item[1]}`}>{review.item[0]}</Link> 
      </>
    )
  }
}