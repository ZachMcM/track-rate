"use client";

import { addReview } from "@/app/apiMethods";
import { Album, SimplifiedAlbum, SimplifiedTrack, Track } from "@/app/types";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react"

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
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  trackResults: Track[];
  setTrackResults: Dispatch<SetStateAction<Track[]>>;
  albumResults: SimplifiedAlbum[];
  setAlbumResults: Dispatch<SetStateAction<SimplifiedAlbum[]>>;
  addReviewMutation: UseMutationResult<any, unknown, void, unknown>,
  submitReview: () => Promise<void>
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

  const router = useRouter()
  const { data: session } = useSession()

  const queryClient = useQueryClient()

  const addReviewMutation = useMutation({
    mutationFn: () =>
      addReview({
        title: title,
        content: reviewContent,
        type: type,
        rating: rating,
        itemId: albumTarget ? albumTarget.id : trackTarget?.id || "",
        itemName: albumTarget ? albumTarget.name : trackTarget?.name || "",
        favTrackName: favTrack?.name,
        favTrackId: favTrack?.id
      }),
      onSuccess: (data) => {
        console.log(data)
        setReviewForm(false)
        queryClient.invalidateQueries({ queryKey: ['user', session?.user.id]})
        router.push(`/review/${data.id}`)
      }
  });

  const submitReview = async () => {
    if (title && reviewContent && (type == "album" && favTrack || type == "track")) {
      addReviewMutation.mutate()
    } else {
      if (!title) {
        setTitleError(true);
      }
      if (!reviewContent) {
        setContentError(true);
      }
      if (type == "album" && !favTrack) {
        setFavTrackError(true);
      }
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
        addReviewMutation,
        submitReview
      }}
    >
      {children}
    </ReviewFormContext.Provider>
  );
};