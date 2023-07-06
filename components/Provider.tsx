'use client'

import { DarkModeProviderType, ReviewFormParams, ReviewFormProviderType } from "@/app/types";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useMediaQuery } from "react-responsive";

const queryClient = new QueryClient()

export const ReviewFormContext = createContext<ReviewFormProviderType | null>(
  null
);

export const DarkModeContext = createContext<DarkModeProviderType | null>(null)

const Provider = ({ children } : { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ReviewFormProvider>
            <DarkModeProvider>
              {children}
            </DarkModeProvider>
        </ReviewFormProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

const DarkModeProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(true)

  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (isSystemDark) => setDarkMode(isSystemDark)
  );

  const value = useMemo(
    () => (darkMode === undefined ? !!systemPrefersDark : darkMode),
    [darkMode, systemPrefersDark]
  );

  useEffect(() => {
    if (value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [value]);

  return (
    <DarkModeContext.Provider value={{
      setDarkMode: setDarkMode,
      darkMode: darkMode,
    }}>
      {children}
    </DarkModeContext.Provider>
  )
}

const ReviewFormProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [reviewContent, setReviewContent] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [pinned, setPinned] = useState<boolean>(false)

  const [itemData, setItemData] = useState<ReviewFormParams>() 

  const [searchModal, setSearchModal] = useState<boolean>(false);
  const [reviewForm, setReviewForm] = useState<boolean>(false);

  const [contentError, setContentError] = useState<boolean>(false);

  const { data: session } = useSession()

  const queryClient = useQueryClient()

  const addReviewMutation = useMutation({
    mutationFn: async () => {
      if (itemData) {
        const bodyParams = {
          content: reviewContent,
          rating: rating,
  
          trackName: itemData.trackName,
          trackId: itemData.trackId,
  
          albumId: itemData.albumId,
          albumImage: itemData.albumImage,
          albumName: itemData.albumName,
  
          artistIds: itemData.artistIds,
          artistImages: itemData.artistImages,
          artistNames: itemData.artistNames,
          type: itemData?.type,

          pinned: pinned,          
        }

        const res = await fetch(`/api/review`, {
          method: "POST",
          body: JSON.stringify(bodyParams),
        });
        const data = await res.json();
        return data;
      }
    },
      onSuccess: (data) => {
        console.log(data)
        setItemData(undefined)

        let idKey
        if (itemData?.type == "album") {
          idKey = data?.albumId
        } else if (itemData?.type == "track") {
          idKey = data?.trackId
        } else {
          idKey = data?.artistIds[0]
        }
        const musicId = itemData?.type == "track" ? itemData.trackId : itemData?.type == "album" ? itemData.albumId : itemData?.artistIds[0]

        queryClient.invalidateQueries({ queryKey: ["music-reviews", { id: musicId }]})
        queryClient.invalidateQueries({ queryKey: ["music-rating", { id: musicId }]})
        queryClient.invalidateQueries({ queryKey: ['user-reviews', { id: session?.user.id }]})

        setReviewForm(false)
        setItemData(undefined)
        setContentError(false)
        setRating(0)
        setReviewContent("")
        setPinned(false)
      }
  });

  const submitReview = async () => {
    if (!reviewContent) {
      setContentError(true);
    } else {
      addReviewMutation.mutate()
    }
  };

  return (
    <ReviewFormContext.Provider
      value={{
        reviewContent,
        setReviewContent,

        rating,
        setRating,

        reviewForm,
        setReviewForm,

        contentError,
        setContentError,

        addReviewMutation,
        submitReview,

        setItemData,
        itemData,

        searchModal,
        setSearchModal,

        pinned,
        setPinned
      }}
    >
      {children}
    </ReviewFormContext.Provider>
  );
};

export default Provider