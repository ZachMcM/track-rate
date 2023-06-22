"use client";

import { useContext } from "react";
import { TbArrowLeft, TbCheck, TbChevronDown } from "react-icons/tb";
import { Artist, SimplifiedTrack } from "@/app/apiTypes";
import Image from "next/image";
import Stars from "./Stars";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useState } from "react";
import { ReviewFormContext, ReviewFormProviderType } from "./ReviewFormProvider";

export default function AlbumReviewForm() {
  const { 
    setReviewForm ,
    setAlbumTarget,
    albumTarget,
    setType,
    setReviewContent,
    setTitle,
    setRating,
    setFavTrack,
    setTitleError,
    setContentError,
    setFavTrackError,
    titleError,
    contentError,
    favTrackError,
    title,
    reviewContent,
    rating,
    favTrack,
    saveReview
  } = useContext(ReviewFormContext) as ReviewFormProviderType

  const modalRef = useDetectClickOutside({
    onTriggered(e) {
      e.preventDefault();
      setReviewForm(false);
    },
  });

  const [dropdown, setDropdown] = useState<boolean>(false)

  if (albumTarget) {
    return (
      <div className="z-40 fixed w-full h-full left-0 top-0 bottom-0 backdrop-blur-md flex justify-center items-center">
        <div
          ref={modalRef}
          className="flex flex-col space-y-8 p-10 w-full m-10 md:w-3/5 rounded-md border border-gray-700 bg-gray-950"
        >
          <div className="flex space-x-10">
            <div className="flex flex-col space-y-5">
              <button
                className="w-fit flex items-center space-x-1 px-4 py-2 border border-gray-700 rounded-md hover:bg-gray-700 duration-300"
                onClick={() => {
                  setAlbumTarget(undefined);
                  setType("");
                  setReviewContent("");
                  setTitle("")
                  setRating(0)
                  setFavTrack(undefined)
                  setTitleError(false)
                  setContentError(false)
                  setFavTrackError(false)
                }}
              >
                <TbArrowLeft />
                <p className="text-xs">Back</p>
              </button>
              <Image
                src={albumTarget.images[0].url}
                height={200}
                width={200}
                alt={albumTarget.name}
                className="rounded-md w-fit md:w-full"
              />
            </div>
            <div className="flex flex-col space-y-5 w-full">
              <h3 className="font-medium text-gray-400">I listened to...</h3>
              <div className="flex flex-col space-y-1">
                <h1 className="font-bold text-lg md:text-xl">
                  {albumTarget.name}
                </h1>
                <p className="text-sky-400 text-sm">
                  {albumTarget.artists.map((artist: Artist) => {
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
              <div className="relative w-full text-sm">
                <div className="flex flex-col space-y-2">
                  <button 
                    className={`w-full border rounded-md flex items-center justify-between px-4 py-3 ${favTrackError ? "border-red-500" : "border-gray-700"}`}
                    onClick={() => {
                      setFavTrackError(false)
                      setDropdown(true)
                    }}
                  >
                    <p>{favTrack?.name || "Select favorite song"}</p>
                    <TbChevronDown className="text-xl"/>
                  </button>
                  { favTrackError && <p className="text-xs text-red-500">Favorite track is required</p>}
                </div>
                {
                  dropdown &&
                  <div className="max-h-40 overflow-y-auto absolute w-full top-14 border border-gray-700 rounded-md flex flex-col bg-gray-950">
                    {
                      albumTarget.tracks.items.map((track: SimplifiedTrack) => {
                        return (
                          <button
                            key={track.id}
                            className={`text-gray-400 hover:text-white flex items-center space-x-2 capitalize p-2 hover:bg-gray-700 duration-300 m-2 rounded-md text-start ${favTrack?.id == track.id && "bg-gray-700 text-white"}`}
                            onClick={() => {
                              setFavTrack(track)
                              setDropdown(false)
                            }}
                          >
                            <TbCheck className={`${favTrack?.id == track.id ? "visible" : "invisible"} text-xl`}/>
                            <p>{track.name}</p>
                          </button>
                        )
                      })
                    }
                  </div>
                }
              </div>
              <Stars rating={rating} setRating={setRating} />
              <button
                className="w-fit flex space-x-2 items-center text-sm self-end bg-sky-500 hover:bg-sky-400 duration-300 px-4 py-2 font-semibold rounded-md"
                onClick={() => saveReview()}
              >
                <p>Save</p>
                <TbCheck className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
