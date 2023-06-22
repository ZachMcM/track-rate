'use client'

import { Album, SimplifiedAlbum, SimplifiedTrack, Track } from "@/app/apiTypes";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export type ReviewFormProviderType = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>
  reviewContent: string;
  setReviewContent: Dispatch<SetStateAction<string>>;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  reviewForm: boolean
  setReviewForm: Dispatch<SetStateAction<boolean>>;
  albumTarget: Album | undefined
  setAlbumTarget: Dispatch<SetStateAction<Album | undefined>>
  trackTarget: Track | undefined
  setTrackTarget: Dispatch<SetStateAction<Track | undefined>>
  favTrack: SimplifiedTrack | undefined,
  setFavTrack: Dispatch<SetStateAction<SimplifiedTrack | undefined>>
  titleError: boolean
  setTitleError: Dispatch<SetStateAction<boolean>>
  favTrackError: boolean
  setFavTrackError: Dispatch<SetStateAction<boolean>>
  contentError: boolean
  setContentError: Dispatch<SetStateAction<boolean>>
  saveReview: Function
  type: string,
  setType: Dispatch<SetStateAction<string>>
  trackResults: Track[]
  setTrackResults: Dispatch<SetStateAction<Track[]>>
  albumResults: SimplifiedAlbum[]
  setAlbumResults: Dispatch<SetStateAction<SimplifiedAlbum[]>>
};

export const ReviewFormContext = createContext<ReviewFormProviderType | null>(null)

export const ReviewFormProvider = ({ children } : { children: React.ReactNode }) => {
  // form variables
  const [title, setTitle] = useState<string>("")
  const [reviewContent, setReviewContent] = useState<string>("")
  const [favTrack, setFavTrack] = useState<SimplifiedTrack>()
  const [rating, setRating] = useState<number>(0)
  const [type, setType] = useState<string>('')

  // variables for searching
  const [trackResults, setTrackResults] = useState<Track[]>([])
  const [albumResults, setAlbumResults] = useState<SimplifiedAlbum[]>([])

  // when the user chooses the item they want to review
  const [albumTarget, setAlbumTarget] = useState<Album>()
  const [trackTarget, setTrackTarget] = useState<Track>()

  const [reviewForm, setReviewForm] = useState<boolean>(false)

  // error state
  const [titleError, setTitleError] = useState<boolean>(false)
  const [favTrackError, setFavTrackError] = useState<boolean>(false)
  const [contentError, setContentError] = useState<boolean>(false)

  const saveReview = async () => {
    if (!title) {
      setTitleError(true)
    }  
    if (!reviewContent) {
      setContentError(true)
    } 
    if (type == "album" && !favTrack) {
      setFavTrackError(true)
    }  
    if (title && reviewContent && (type != "album" || (type == "album" && favTrack))) {
      let reqBody
      if (trackTarget) {
        reqBody = { 
          title: title,
          itemId: trackTarget.id, 
          rating: rating, 
          type: type, 
          content: reviewContent 
        }
      } else if (albumTarget) {
        reqBody = { 
          title: title,
          itemId: albumTarget.id, 
          rating: rating, 
          type: type, 
          content: reviewContent 
        }
      } else {
        return
      }
      const res = await fetch("/api/review", {
        method: "POST",
        body: JSON.stringify(reqBody)
      })
      const data = await res.json()
      console.log(data)
    }
  }


  return (
    <ReviewFormContext.Provider value={{
      title,
      setTitle,
      reviewContent,
      setReviewContent,
      favTrack,
      setFavTrack,
      rating,
      setRating,
      type,
      setType,
      trackResults,
      setTrackResults,
      albumResults,
      setAlbumResults,
      albumTarget,
      setAlbumTarget,
      trackTarget,
      setTrackTarget,
      reviewForm,
      setReviewForm,
      titleError,
      setTitleError,
      favTrackError,
      setFavTrackError,
      contentError,
      setContentError,
      saveReview
    }}>
      {children}
    </ReviewFormContext.Provider>
  )

}