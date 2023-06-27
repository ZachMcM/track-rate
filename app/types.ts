import { Prisma } from "@prisma/client"

export type FullUser = Prisma.UserGetPayload<{
  include: { reviews: true, acivities: true, likes: true, followers: true, follows: true }
}>

export type FullReview = Prisma.ReviewGetPayload<{
  include: { user: true, likes: true, comments: true }
}>

export type FullComment = Prisma.ReviewCommentGetPayload<{
  include: { user: true }
}>

export type NewReviewParams = {
  title: string,
  itemId: string,
  itemName: string
  rating: number,
  type: string,
  content: string,
  favTrackName?: string
  favTrackId?: string
}

export type Track = {
  album: Album,
  artists: Artist[],
  available_markets: string[],
  disc_number: number,
  duration_ms: number,
  explicit: boolean,
  external_ids: ExternalIds,
  external_urls: ExternalUrls,
  href: string,
  id: string,
  is_playable: boolean,
  linked_from: object
  restrictions: Restrictions,
  name: string,
  popularity: number,
  preview_url: string,
  track_number: number,
  type: string,
  uri: string,
  is_local: boolean
}

export type SimplifiedTrack = {
  artists: [],
  available_markets: string[],
  disc_number: number,
  duration_ms: number,
  explicit: boolean,
  external_urls: ExternalUrls,
  href: string,
  id: string,
  is_playable: boolean,
  linked_from: object,
  restrictions: Restrictions,
  name: string,
  preview_url: string,
  track_number: number,
  type: string,
  uri: string,
  is_local: boolean
}

export type Album = {
  album_type: string,
  total_tracks: number,
  available_markets: string[],
  external_urls: ExternalUrls,
  href: string,
  id: string,
  images: Image[],
  name: string,
  release_date: string,
  release_date_precision: string,
  restrictions: Restrictions,
  type: string,
  uri: string
  copyrights: Copyright[]
  external_ids: ExternalIds,
  genres: string[],
  label: string,
  popularity: string,
  artists: Artist[]
  tracks: Tracks
}

export type SimplifiedAlbum = {
  album_type: string,
  total_tracks: number,
  available_markets: string[],
  external_urls: ExternalUrls,
  href: string,
  id: string,
  images: Image[],
  name: string,
  release_date: string,
  release_date_precision: string,
  restrictions: Restrictions,
  type: string,
  uri: string
  copyrights: Copyright[]
  external_ids: ExternalIds,
  genres: string[],
  label: string,
  popularity: string,
  album_group: string,
  artists: Artist[]
}

export type Artist = {
  external_urls: ExternalUrls,
  followers: Followers,
  genres: string[],
  href: string,
  id: string,
  images: Image[],
  name: string,
  popularity: number,
  type: string,
  uri: string
}

export type Tracks = {
  href: string,
  limit: number,
  next: string,
  offset: number,
  previous: string,
  total: number,
  items: SimplifiedTrack[]
}

export type Restrictions = {
  reason: string
}

export type Copyright = {
  text: string,
  type: string
}

export type ExternalIds = {
  isrc: string,
  ean: string,
  upc: string
}

export type ExternalUrls = {
  spotify: string
}

export type Image = {
  url: string,
  height: number,
  width: number
}

export type Followers = {
  href: string | null,
  total: number
}

