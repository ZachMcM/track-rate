"use client";

import { Album, SimplifiedAlbum, Track } from "@/app/types";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export type ReviewModalProviderType = {
  reviewModal: boolean;
  setReviewModal: Dispatch<SetStateAction<boolean>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  trackResults: Track[];
  setTrackResults: Dispatch<SetStateAction<Track[]>>;
  albumResults: SimplifiedAlbum[];
  setAlbumResults: Dispatch<SetStateAction<SimplifiedAlbum[]>>;
};

export const ReviewModalContext = createContext<ReviewModalProviderType | null>(
  null
);

export const ReviewModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [type, setType] = useState<string>("");

  // variables for searching
  const [trackResults, setTrackResults] = useState<Track[]>([]);
  const [albumResults, setAlbumResults] = useState<SimplifiedAlbum[]>([]);

  const [reviewModal, setReviewModal] = useState<boolean>(false);

  return (
    <ReviewModalContext.Provider
      value={{
        type,
        setType,
        trackResults,
        setTrackResults,
        albumResults,
        setAlbumResults,
        reviewModal,
        setReviewModal,
      }}
    >
      {children}
    </ReviewModalContext.Provider>
  );
};
