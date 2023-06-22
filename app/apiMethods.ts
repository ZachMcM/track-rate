import { Album, Artist, Track } from "./apiTypes";

export const getAccessToken = async () => {
  const res = await fetch("/api/access-token", {
    method: "POST"
  })
  const data = await res.json()
  return data.access_token
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

export const getAlbumList = async (query: string, accessToken: string): Promise<Album[]> => {
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
  return data as Album
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
  return data as Artist
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
  return data as Track
}