import { ExtendedReview, UserExtended } from "./types"

export const getReview = async (id: string): Promise<ExtendedReview> => {
  const res = await fetch(`${process.env.URL}/api/review?id=${id}`)
  const data = await res.json()
  return data
}

export const getAccessToken = async () => {
  const res = await fetch(`${process.env.URL}/api/access-token`, {
    method: "POST",
    next: {
      revalidate: 3600
    }
  });
  const data = await res.json();
  return data.access_token;
}

export const getUser = async (id: string): Promise<UserExtended> => {
  const res = await fetch(`${process.env.URL}/api/user?id=${id}`, { next: { tags: [id] }})
  const data = await res.json()
  return data
}