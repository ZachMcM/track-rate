"use client";

import { Album, SimplifiedAlbum, SimplifiedTrack, Track } from "@/app/apiTypes";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getUserData } from "@/app/apiMethods";
import { User } from "@prisma/client";

export type ReviewFormProviderType = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  reviewContent: string;
  setReviewContent: Dispatch<SetStateAction<string>>;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  reviewForm: boolean;
  setReviewForm: Dispatch<SetStateAction<boolean>>;
  albumTarget: Album | undefined;
  setAlbumTarget: Dispatch<SetStateAction<Album | undefined>>;
  trackTarget: Track | undefined;
  setTrackTarget: Dispatch<SetStateAction<Track | undefined>>;
  favTrack: SimplifiedTrack | undefined;
  setFavTrack: Dispatch<SetStateAction<SimplifiedTrack | undefined>>;
  titleError: boolean;
  setTitleError: Dispatch<SetStateAction<boolean>>;
  favTrackError: boolean;
  setFavTrackError: Dispatch<SetStateAction<boolean>>;
  contentError: boolean;
  setContentError: Dispatch<SetStateAction<boolean>>;
  saveReview: Function;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  trackResults: Track[];
  setTrackResults: Dispatch<SetStateAction<Track[]>>;
  albumResults: SimplifiedAlbum[];
  setAlbumResults: Dispatch<SetStateAction<SimplifiedAlbum[]>>;
  successfulSave: boolean,
  setSuccessfulSave: Dispatch<SetStateAction<boolean>>
  loadingSave: boolean,
  setLoadingSave: Dispatch<SetStateAction<boolean>>
  newId: string
};

export const ReviewFormContext = createContext<ReviewFormProviderType | null>(
  null
);

export const ReviewFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // form variables
  const [title, setTitle] = useState<string>("");
  const [reviewContent, setReviewContent] = useState<string>("");
  const [favTrack, setFavTrack] = useState<SimplifiedTrack>();
  const [rating, setRating] = useState<number>(0);
  const [type, setType] = useState<string>("");

  // variables for searching
  const [trackResults, setTrackResults] = useState<Track[]>([]);
  const [albumResults, setAlbumResults] = useState<SimplifiedAlbum[]>([]);

  // when the user chooses the item they want to review
  const [albumTarget, setAlbumTarget] = useState<Album>();
  const [trackTarget, setTrackTarget] = useState<Track>();

  const [reviewForm, setReviewForm] = useState<boolean>(false);

  // error state
  const [titleError, setTitleError] = useState<boolean>(false);
  const [favTrackError, setFavTrackError] = useState<boolean>(false);
  const [contentError, setContentError] = useState<boolean>(false);

  const [successfulSave, setSuccessfulSave] = useState<boolean>(false)
  const [loadingSave, setLoadingSave] = useState<boolean>(false)
  const [newId, setNewId] = useState<string>('')

  const userDataQuery = useQuery({ queryKey: ["user"], queryFn: () => getUserData()})

  const queryClient = useQueryClient()

  const saveReview = async () => {
    if (!title) {
      setTitleError(true);
    }
    if (!reviewContent) {
      setContentError(true);
    }
    if (type == "album" && !favTrack) {
      setFavTrackError(true);
    }
    if (
      title &&
      reviewContent &&
      (type != "album" || (type == "album" && favTrack))
    ) {
      setLoadingSave(true)
      let reqBody;
      if (trackTarget) {
        reqBody = {
          title: title,
          item: [trackTarget.name, trackTarget.id],
          rating: rating,
          type: type,
          content: reviewContent,
        };
      } else if (albumTarget) {
        reqBody = {
          title: title,
          item: [albumTarget.name, albumTarget.id],
          rating: rating,
          type: type,
          content: reviewContent,
          favTrack: [favTrack?.name, favTrack?.id]
        };
      } else {
        return;
      }
      const res = await fetch("/api/review", {
        method: "POST",
        body: JSON.stringify(reqBody),
      });
      const data = await res.json();
      console.log(data)
      setNewId(data.id)
      queryClient.invalidateQueries({ queryKey: ['reviews', userDataQuery.data?.id]})
      setLoadingSave(false)
      setSuccessfulSave(true)
    }
  };

  return (
    <ReviewFormContext.Provider
      value={{
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
        saveReview,
        successfulSave,
        setSuccessfulSave,
        loadingSave,
        setLoadingSave,
        newId
      }}
    >
      {children}
    </ReviewFormContext.Provider>
  );
};