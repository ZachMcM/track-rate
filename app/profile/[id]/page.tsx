'use client'

import { redirect } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getUserData } from "@/app/apiMethods"

export default function Profile({ params }: { params: { id: string }}) {
  const userDataQuery = useQuery({ queryKey: ["user", params.id], queryFn: () => getUserData(params.id)})

  if (userDataQuery.isSuccess && userDataQuery.data == null) {
    return redirect("/")
  } else if (userDataQuery.isSuccess && userDataQuery != null) {
    return (
      <div className="flex flex-col space-y-10 w-full">

      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}