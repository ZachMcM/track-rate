import { Prisma } from "@prisma/client"
import { UseMutationResult } from "@tanstack/react-query"
import { Dispatch, SetStateAction } from "react"

export type UserExtended = Prisma.UserGetPayload<{
  include: {
    reviews: {
      include: {
        _count: true
      }
    },
    followers: {
      include: {
        followers: true
      }
    },
    follows: {
      include: {
        followers: true
      }
    }
  }
}>

export type UserExtendedReviews = Prisma.UserGetPayload<{
  include: { 
    reviews: {
      include: {
        comments: {
          include: {
            user: true
          }
        },
        likes: true,
        user: true
      }
    }, 
  }
}>

export type UserExtendedLikes = Prisma.UserGetPayload<{
  include: { 
    likes: {
      include: {
        review: {
          include: {
            comments: true,
            likes: true,
            user: true
          }
        }
      }
    }
  }
}>

export type UserExtendedFollowers = Prisma.UserGetPayload<{
  include: { 
    followers: true
  }
}>

export type ExtendedLike = Prisma.LikeGetPayload<{
  include: {
    review: {
      include: {
        comments: {
          include: {
            user: true
          }
        },
        likes: true,
        user: true
      }
    }
  }
}>

export type ExtendedReview = Prisma.ReviewGetPayload<{
  include: { 
    user: true, 
    likes: true, 
    comments: {
      include: {
        user: true
      }
    } 
  }
}>

export type ExtendedComment = Prisma.ReviewCommentGetPayload<{
  include: { user: true }
}>

export type Rating = {
  involvedReviews: {
    _avg: {
      rating: number
    },
    _count: number
  },
  yourRating: number
}

export type SearchResults = {
  albums: SimplifiedAlbum[],
  tracks: Track[],
  artists: Artist[]
}

export type ReviewFormProviderType = {
  reviewContent: string;
  setReviewContent: Dispatch<SetStateAction<string>>;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  pinned: boolean,
  setPinned: Dispatch<SetStateAction<boolean>>

  searchModal: boolean;
  setSearchModal: Dispatch<SetStateAction<boolean>>;
  reviewForm: boolean,
  setReviewForm: Dispatch<SetStateAction<boolean>>

  contentError: boolean;
  setContentError: Dispatch<SetStateAction<boolean>>;

  itemData: ReviewFormParams | undefined,
  setItemData: Dispatch<SetStateAction<ReviewFormParams | undefined>>

  addReviewMutation: UseMutationResult<any, unknown, void, unknown>,
  submitReview: () => Promise<void>
};

export type ReviewFormParams = {
  type: "artist" | "album" | "track",

  trackName?: string,
  trackId?: string,

  artistNames: string[],
  artistIds: string[],
  artistImages: string[]

  albumName?: string,
  albumId?: string
  albumImage?: string
}

export type NewReviewParams = {
  trackName?: string,
  trackId?: string,

  artistNames: string[],
  artistIds: string[],
  artistImages: string[]

  albumName?: string,
  albumId?: string
  albumImage?: string
  
  rating: number,
  type: "artist" | "album" | "track",
  content: string,
  pinned: boolean
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

