"use client";

import { SimplifiedTrack } from "@/app/types";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { TbCheck, TbChevronDown } from "react-icons/tb";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { addReview } from "@/app/apiMethods";
import Stars from "./Stars";

export default function ReviewForm({
  albumTracks,
  itemId,
  itemName,
}: {
  albumTracks?: SimplifiedTrack[];
  itemId: string;
  itemName: string;
}) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [favTrack, setFavTrack] = useState<SimplifiedTrack>();
  const [rating, setRating] = useState<number>(0);

  const [titleError, setTitleError] = useState<boolean>(false);
  const [contentError, setContentError] = useState<boolean>(false);
  const [favTrackError, setFavTrackError] = useState<boolean>(false);

  const [dropdown, setDropdown] = useState<boolean>(false);

  const router = useRouter()

  const closeDropdown = () => {
    setDropdown(false);
    setFavTrack(undefined);
  };

  const getFavTrack = (): undefined | string[] => {
    if (favTrack) {
      return [favTrack.name, favTrack.id]
    } else {
      return undefined
    }
  }

  const addReviewMutation = useMutation({
    mutationFn: () =>
      addReview({
        title: title,
        content: content,
        type: albumTracks ? "album" : "track",
        rating: rating,
        item: [itemName, itemId],
        favTrack: getFavTrack()
      }),
      onSuccess: (data) => {
        console.log(data)
        router.push(`/review/${data.id}`)
      }
  });

  const submitReview = async () => {
    if (title && content && (!albumTracks || (albumTracks && favTrack))) {
      addReviewMutation.mutate()
    } else {
      if (!title) {
        setTitleError(true);
      }
      if (!content) {
        setContentError(true);
      }
      if (albumTracks && !favTrack) {
        setFavTrackError(true);
      }
    }
  };

  const dropdownRef = useDetectClickOutside({ onTriggered: closeDropdown });

  return (
    <div className="flex flex-col space-y-5">
      <h1 className="font-bold text-3xl text-white">New Review</h1>
      <Stars rating={rating} setRating={setRating} />
      <div className="flex flex-col space-y-2">
        <p className="font-medium">Title</p>
        <input
          value={title}
          onChange={(e) => {
            setTitleError(false);
            setTitle(e.target.value);
          }}
          placeholder="Give your review a title"
          className={`placeholder:text-gray-400 text-xs md:text-sm bg-transparent border border-gray-700 rounded-md px-4 py-3 outline-none ring-gray-700 ring-offset-2 ring-offset-gray-950 ${
            titleError
              ? "border-red-500 focus:ring-0"
              : "border-gray-700 focus:ring-2"
          }`}
        />
        {titleError && (
          <p className="text-xs text-red-500">A title is required</p>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <p className="font-medium">Content</p>
        <textarea
          value={content}
          onChange={(e) => {
            setContentError(false);
            setContent(e.target.value);
          }}
          className={`h-40 overflow-y-auto placeholder:text-gray-400 text-xs md:text-sm bg-transparent border rounded-md p-4 outline-none ring-gray-700 ring-offset-2 ring-offset-gray-950 ${
            contentError
              ? "border-red-500 focring-0"
              : "border-gray-700 focus:ring-2"
          }`}
          placeholder="What did you think..."
        />
        {contentError && (
          <p className="text-xs text-red-500">Content is required</p>
        )}
      </div>
      {albumTracks && (
        <div className="relative w-full text-xs md:text-sm">
          <div className="flex flex-col space-y-2">
            <p className="font-medium">Favorite Track</p>
            <button
              className={`w-full border rounded-md flex items-center justify-between px-4 py-3 ${
                favTrackError ? "border-red-500" : "border-gray-700"
              }`}
              onClick={() => {
                setFavTrackError(false);
                setDropdown(true);
              }}
            >
              <p className="text-start">
                {favTrack?.name || "Select your favorite track"}
              </p>
              <TbChevronDown className="text-xl" />
            </button>
            {favTrackError && (
              <p className="text-xs text-red-500">Favorite track is required</p>
            )}
          </div>
          {dropdown && (
            <div
              ref={dropdownRef}
              className="max-h-40 z-50 overflow-y-auto absolute w-full top-20 border border-gray-700 rounded-md flex flex-col bg-gray-950"
            >
              {albumTracks.map((track: SimplifiedTrack) => {
                return (
                  <button
                    key={track.id}
                    className={`text-gray-400 hover:text-white flex items-center capitalize space-x-3 p-2 hover:bg-gray-700 duration-300 m-2 rounded-md justify-start text-start ${
                      favTrack?.id == track.id && "bg-gray-700 text-white"
                    }`}
                    onClick={() => {
                      setFavTrack(track);
                      setDropdown(false);
                    }}
                  >
                    <TbCheck
                      className={`${
                        favTrack?.id == track.id ? "visible" : "invisible"
                      } text-xl`}
                    />
                    <p className="max-w-sm">{track.name}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
      <button
        className="flex space-x-2 items-center text-xs md:text-sm w-fit self-end px-4 py-3 rounded-md font-semibold bg-sky-500 hover:bg-sky-400 duration-300"
        onClick={submitReview}
      >
        <p>Add Comment</p>
        { addReviewMutation.isLoading &&                 
          <svg aria-hidden="true" className="w-5 h-5 mr-2 text-sky-300 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
        }
      </button>
    </div>
  );
}
