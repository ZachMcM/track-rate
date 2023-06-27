import { getAlbum, getReview, getUser } from "@/app/serverMethods";
import { Activity } from "@prisma/client";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ActivityCard({ activity }: { activity: Activity }) {
  const review = activity.itemId ? await getReview(activity.itemId) : null
  const otherUser = await getUser(activity.otherUserId || "")
  const user = await getUser(activity.userId)
  const session = await getServerSession(authOptions)

    if (activity.activityType == "created review") {
      return (
        <>
          <span className="mr-1">{ session?.user.id == user.id && "You" }</span> 
          <a className="font-bold hover:opacity-80 text-sky-400 duration-300 mr-1" href={`/review/${review?.id}`}>reviewed</a> 
          <a className="font-bold hover:opacity-80 duration-300 mr-1" href={`/${review?.type}/${review?.itemId}`}>{review?.itemName}</a> 
        </>
      )
    }
    if (activity.activityType == "gave like") {
      return (
        <>
          <span className="mr-1">{ session?.user.id == user.id && "You" }</span> 
          <span className="mr-1">liked</span>
          <a className="font-bold hover:opacity-80 duration-300 mr-1" href={`/profile/${otherUser.id}`}>{otherUser.name}'s</a> 
          <a className="font-bold hover:opacity-80 duration-300 mr-1 text-sky-400" href={`/review/${review?.id}`}>review</a> 
          <span className="mr-1">of</span>
          <a className="font-bold hover:opacity-80 duration-300" href={`/${review?.type}/${review?.itemId}`}>{review?.itemName}</a> 
        </>
      )
    }
    if (activity.activityType == "recieved like") {
      return (
        <>
          <a className="font-bold hover:opacity-80 duration-300 mr-1" href={`/profile/${otherUser.id}`}>{otherUser.name}</a> 
          <span className="mr-1">liked</span>
          <span className="mr-1">{ session?.user.id == user.id && "You" }r</span>
          <a className="font-bold hover:opacity-80 duration-300 mr-1 text-sky-400" href={`/review/${review?.id}`}>review</a> 
          <span className="mr-1">of</span>
          <a className="font-bold hover:opacity-80 duration-300" href={`/${review?.type}/${review?.itemId}`}>{review?.itemName}</a> 
      </>
      )
    }
    if (activity.activityType == "gave comment") {
      return (
        <>
          <span className="mr-1">{ session?.user.id == user.id && "You" }</span> 
          <span className="mr-1">commented</span>          
          <span className="mr-1">on</span>
          <a className="font-bold hover:opacity-80 duration-300 mr-1" href={`/profile/${otherUser.id}`}>{otherUser.name}'s</a> 
          <a className="font-bold hover:opacity-80 duration-300 mr-1 text-sky-400" href={`/review/${review?.id}`}>review</a> 
          <span className="mr-1">of</span>
          <a className="font-bold hover:opacity-80 duration-300" href={`/${review?.type}/${review?.itemId}`}>{review?.itemName}</a> 
        </>
      )
    }
    if (activity.activityType == "recieved comment") {
    return (
      <>
        <a className="font-bold hover:opacity-80 duration-300 mr-1" href={`/profile/${otherUser.id}`}>{otherUser.name}</a> 
        <span className="mr-1">commented</span>          
        <span className="mr-1">on</span>
        <span className="mr-1">{ session?.user.id == user.id && "You" }r</span>
        <a className="font-bold hover:opacity-80 duration-300 mr-1 text-sky-400" href={`/review/${review?.id}`}>review</a> 
        <span className="mr-1">of</span>
        <a className="font-bold hover:opacity-80 duration-300" href={`/${review?.type}/${review?.itemId}`}>{review?.itemName}</a> 
      </>
    )
  }
}