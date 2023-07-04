import { ExtendedReview, UserExtended } from "./types"

export const getReview = async (id: string): Promise<ExtendedReview> => {
  const res = await fetch(`${process.env.URL}/api/review?id=${id}`)
  const data = await res.json()
  return data
}

export const getUser = async (id: string): Promise<UserExtended> => {
  const res = await fetch(`${process.env.URL}/api/user?id=${id}`, { next: { tags: [id] }})
  const data = await res.json()
  return data
}