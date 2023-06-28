import { cache } from "react"
import { Album, FullReview, FullUser, Track } from "./types"

export const getReview = async (id: string): Promise<FullReview> => {
  const res = await fetch(`${process.env.URL}/api/review?id=${id}`, { next: { tags: [id]}})
  const data = await res.json()
  return data
}

export const getUser = async (id: string): Promise<FullUser> => {
  const res = await fetch(`${process.env.URL}/api/user?id=${id}`, { cache: "no-store"} )
  const data = await res.json()
  return data
}

const getAccessToken = async () => {
  const authParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`
  }

  const res = await fetch("https://accounts.spotify.com/api/token", authParams)
  const data = await res.json()
  return data.access_token
}

export const getTrack = async (id: string): Promise<Track> => {
  const accessToken = await getAccessToken()
  const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, { 
    cache: 'force-cache', 
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const data = await res.json()
  return data
}

export const getAlbum = async (id: string): Promise<Album> => {
  const accessToken = await getAccessToken()
  const res = await fetch(`https://api.spotify.com/v1/albums/${id}`, { 
    cache: 'force-cache', 
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const data = await res.json()
  return data
}