import { Like, ReviewComment } from "@prisma/client";
import { Album, Artist, FullComment, FullReview, SimplifiedAlbum, Track } from "./apiTypes";

// gets the likes of a review

export const getLikes = async (reviewId: string): Promise<Like[]> => {
  const res = await fetch(`/api/likes?reviewId=${reviewId}`)
  const data = await res.json()
  return data
}

// either deletes or creates a new like for a user 

export const updateLike = async (reviewId: string): Promise<Like> => {
  const res = await fetch(`/api/likes?reviewId=${reviewId}`, {
    method: "PATCH"
  })
  const data = await res.json()
  return data
}

// adds a new comment

export const addComment = async (reviewId: string, content: string): Promise<ReviewComment> => {
  const res = await fetch (`/api/comments?reviewId=${reviewId}&content=${content}`, {
    method: "POST"
  })
  const data = await res.json()
  return data
} 

// deletes a comment

export const deleteComment = async (id: string): Promise<ReviewComment> => {
  const res = await fetch (`/api/comments?id=${id}`, {
    method: "DELETE"
  })
  const data = await res.json()
  return data
}

// gets all comments associated with a post 

export const getComments = async (reviewId: string): Promise<FullComment[]> => {
  const res = await fetch(`/api/comments?reviewId=${reviewId}`)
  const data = await res.json()
  return data
}

// gets the access token to use the spotify api

export const getAccessToken = async () => {
  const res = await fetch("/api/access-token", {
    method: "POST"
  })
  const data = await res.json()
  return data.access_token
}

// method for getting full user Data

export const getUserData = async (id?: string): Promise<FullReview> => {
  if (id) {
    const res = await fetch(`/api/user?id=${id}`)
    const data = await res.json()
    return data
  } else {
    const res = await fetch(`/api/user`)
    const data = await res.json()
    return data
  }
}

// methods for getting data by querying the api

export const getTrackList = async (query: string, accessToken: string): Promise<Track[]> => {
  const res = await fetch(`https://api.spotify.com/v1/search?q=track:${query}&type=track`, {
    cache: "force-cache",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const data = await res.json()
  return data.tracks.items
}

export const getArtistList = async (query: string, accessToken: string): Promise<Artist[]> => {
  const res = await fetch(`https://api.spotify.com/v1/search?q=artist:${query}&type=artist`, {
    cache: "force-cache",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const data = await res.json()
  return data.artists.items
}

export const getAlbumList = async (query: string, accessToken: string): Promise<SimplifiedAlbum[]> => {
  const res = await fetch(`https://api.spotify.com/v1/search?q=album:${query}&type=album`, {
    cache: "force-cache",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const data = await res.json()
  return data.albums.items
}

// methods for getting data by id

export const getAlbum = async (accessToken: string, id: string): Promise<Album> => {
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

export const getArtist = async (accessToken: string, id: string): Promise<Artist> => {
  const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    cache: "force-cache",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const data = await res.json()
  return data 
}

export const getTrack = async (accessToken: string, id: string): Promise<Track> => {
  const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    cache: "force-cache",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const data = await res.json()
  return data
}