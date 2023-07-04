'use client'

import { ReviewFormParams, ReviewFormProviderType } from "@/app/types";
import { useMutation } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export const ReviewFormContext = createContext<ReviewFormProviderType | null>(
  null
);

const Provider = ({ children } : { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ReviewFormProvider>
            {children}
        </ReviewFormProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}


const ReviewFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [reviewContent, setReviewContent] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [pinned, setPinned] = useState<boolean>(false)

  const [itemData, setItemData] = useState<ReviewFormParams>() 

  const [searchModal, setSearchModal] = useState<boolean>(false);
  const [reviewForm, setReviewForm] = useState<boolean>(false);

  const [contentError, setContentError] = useState<boolean>(false);

  const router = useRouter()
  const { data: session } = useSession()

  const queryClient = useQueryClient()

  const addReviewMutation = useMutation({
    mutationFn: async () => {
      if (itemData) {
        const res = await fetch(`/api/review`, {
          method: "POST",
          body: JSON.stringify(itemData),
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

        queryClient.invalidateQueries({ queryKey: ['user-reviews', { id: session?.user.id }]})
        queryClient.invalidateQueries({ queryKey: ['score', { id: idKey }]})
        router.push(`/profile/${data?.userId}`)
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