"use client";

import { useContext } from "react";
import { TbArrowLeft, TbCheck } from "react-icons/tb";
import { Artist } from "@/app/types";
import Image from "next/image";
import Stars from "./Stars";
import { useDetectClickOutside } from "react-detect-click-outside";
import { ReviewFormContext, ReviewFormProviderType } from "./ReviewFormProvider";

export default function TrackReviewForm() {
  const { 
    setReviewForm,
    setTrackTarget,
    trackTarget,
    setType,
    setReviewContent,
    setTitle,
    setRating,
    setTitleError,
    setContentError,
    titleError,
    contentError,
    title,
    reviewContent,
    rating,
    addReviewMutation,
    submitReview
  } = useContext(ReviewFormContext) as ReviewFormProviderType


  const modalRef = useDetectClickOutside({
    onTriggered(e) {
      e.preventDefault();
      setReviewForm(false);
    },
  });

  if (trackTarget) {
    return (
      <div className="z-40 fixed w-full h-full left-0 top-0 bottom-0 backdrop-blur-md flex justify-center items-center">
        <div
          ref={modalRef}
          className="flex flex-col space-y-8 p-10 w-full m-10 md:w-3/5 rounded-md border border-gray-700 bg-gray-950"
        >
          <div className="flex space-x-10">
            <div className="flex flex-col space-y-5">
              <button
                className="w-fit flex items-center space-x-1 px-4 py-2 border border-gray-700 rounded-md hover:opacity-80 duration-300"
                onClick={() => {
                  setTrackTarget(undefined);
                  setType("");
                  setReviewContent("");
                  setTitle("")
                  setRating(0);
                  setTitleError(false)
                  setContentError(false)
                }}
              >
                <TbArrowLeft />
                <p className="text-xs">Back</p>
              </button>
              <Image
                src={trackTarget.album.images[0].url}
                height={200}
                width={200}
                alt={trackTarget.name}
                className="rounded-md w-fit md:w-full"
              />
            </div>
            <div className="flex flex-col space-y-5 w-full">
              <h3 className="font-medium text-gray-400">I listened to...</h3>
              <div className="flex flex-col space-y-1">
                <h1 className="font-bold text-lg md:text-xl">
                  {trackTarget.name}
                </h1>
                <p className="text-sky-400 text-sm">
                  {trackTarget.artists.map((artist: Artist) => {
                    return <span key={artist.id}> {artist.name} </span>;
                  })}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <input
                  value={title}
                  onChange={(e) => {
                    setTitleError(false)
                    setTitle(e.target.value)
                  }}
                  placeholder="Review title"
                  className={`placeholder:text-gray-400 text-sm bg-transparent border border-gray-700 rounded-md px-4 py-3 outline-none ring-gray-700 ring-offset-2 ring-offset-gray-950 ${titleError ? "border-red-500 focus:ring-0" : "border-gray-700 focus:ring-2"}`}
                />
                { titleError && <p className="text-xs text-red-500">Title is required</p>}
              </div>
              <div className="flex flex-col space-y-2">
                <textarea
                  value={reviewContent}
                  onChange={(e) => {
                    setContentError(false)
                    setReviewContent(e.target.value)
                  }}
                  className={`min-h-max overflow-y-auto placeholder:text-gray-400 text-sm bg-transparent border rounded-md p-4 outline-none ring-gray-700 ring-offset-2 ring-offset-gray-950 ${contentError ? "border-red-500 focring-0" : "border-gray-700 focus:ring-2"}`}
                  placeholder="Review content"
                />
                { contentError && <p className="text-xs text-red-500">Review content is required</p>}
              </div>
              <Stars rating={rating} setRating={setRating} />
              <button
                className="flex space-x-2 items-center text-xs md:text-sm w-fit self-end px-4 py-3 rounded-md font-medium bg-sky-500 hover:bg-sky-400 duration-300"
                onClick={submitReview}
              >
                <p>Save Review</p>
                { addReviewMutation.isLoading &&                 
                  <svg aria-hidden="true" className="w-5 h-5 mr-2 text-sky-300 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}