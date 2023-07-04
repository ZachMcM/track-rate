"use client";

import { useContext } from "react";
import { TbArrowLeft, TbCheck, TbX } from "react-icons/tb";
import { Artist } from "@/app/types";
import Image from "next/image";
import Stars from "./RatingPick";

import { useDetectClickOutside } from "react-detect-click-outside";

import { ReviewFormContext } from "./Provider";
import { ReviewFormProviderType } from "@/app/types";
import Link from "next/link";
import RatingPick from "./RatingPick";
import { uid } from "uid";

export default function ReviewForm() {
  const {
    itemData,
    setReviewContent,
    setRating,
    setContentError,
    contentError,
    reviewContent,
    rating,
    addReviewMutation,
    submitReview,
    setReviewForm,
    setSearchModal,
    pinned,
    setPinned
  } = useContext(ReviewFormContext) as ReviewFormProviderType;

  const modalRef = useDetectClickOutside({onTriggered: () => setReviewForm(false)});
  
  if (itemData) {
    return (
      <div className="fixed inset-0 h-full w-full z-50 overflow-hidden bg-black/70 flex justify-center items-center p-3">
        <div
          ref={modalRef}
          className="drop-shadow-lg rounded-lg bg-zinc-100 flex flex-col w-full md:w-5/6"
        >
          <div className="p-4 bg-white rounded-t-lg w-full text-center drop-shadow-lg flex items-center">
            <p className="font-semibold text-lg basis-full">Create Review</p>
            <button
              className="p-2 rounded-full hover:bg-zinc-200 duration-300"
              onClick={() => setReviewForm(false)}
            > 
              <TbX className="text-xl"/>
            </button>
          </div>
          <div className="p-8 flex md:space-x-8 items-start">
            <Link 
              href={itemData.type == "track" ? `/track/${itemData.trackId}` : itemData.type == "album" ? `/album/${itemData.albumId}` : `/artist/${itemData.artistIds}`} 
              className={`hidden md:block shrink-0 drop-shadow-lg w-44 h-44 relative ${itemData.type == "artist" ? "rounded-full" : "rounded-lg"} hover:ring-4 ring-sky-200 duration-300`}
            >
              <Image
                src={itemData.type == "artist" ? itemData.artistImages[0] : itemData.albumImage || ""}
                fill
                alt={itemData.type == "artist" ? itemData.artistNames[0] : itemData.albumName || ""}
                className={`${itemData.type == "artist" ? "rounded-full" : "rounded-lg"} drop-shadow-lg`}
              />
            </Link>
            <div className="flex flex-col space-y-5 w-full">
              <div className="flex space-x-5 md:space-x-0 justify-start items-center">
                <Link 
                  href={itemData.type == "track" ? `/track/${itemData.trackId}` : itemData.type == "album" ? `/album/${itemData.albumId}` : `/artist/${itemData.artistIds}`} 
                  className={`text-start md:hidden shrink-0 drop-shadow-lg w-20 h-20 relative ${itemData.type == "artist" ? "rounded-full" : "rounded-lg"} hover:ring-4 ring-sky-200 duration-300`}
                >
                  <Image
                    src={itemData.type == "artist" ? itemData.artistImages[0] : itemData.albumImage || ""}
                    fill
                    alt={itemData.type == "artist" ? itemData.artistNames[0] : itemData.albumName || ""}
                    className={`${itemData.type == "artist" ? "rounded-full" : "rounded-lg"} drop-shadow-lg`}
                    />
                </Link>
                <div className="flex flex-col space-y-1 items-start">
                  <Link 
                    href={(itemData.type == "album" ? itemData.albumId : itemData.type == "track" ? itemData.trackId : itemData.artistIds[0]) || "/"} 
                    className="font-medium text-xl md:text-2xl hover:text-sky-400 duration-300"
                  >
                      {itemData.type == "album" ? itemData.albumName : itemData.type == "track" ? itemData.trackName : itemData.artistNames[0]}
                  </Link>
                  {
                    itemData.type != "artist" &&
                    <p className="text-zinc-400 text-sm md:text-base">
                      {
                        itemData.artistNames.map((name: string, i: number) => {
                          return (
                            <Link key={uid()} className="hover:underline" href={`/artist/${itemData.artistIds[i]}`}>{name}{i != itemData.artistNames.length - 1 && ","} </Link>
                          )
                        })
                      }
                    </p>
                  }
                </div>
              </div>
              <div className="flex space-x-12 items-center">
                <RatingPick rating={rating} setRating={setRating}/>
                <div className="flex flex-col space-y-2">
                  <p className="font-medium">Pinned</p>
                  <button
                    className="h-7 w-7 rounded-lg drop-shadow-lg bg-white"
                    onClick={() => setPinned(!pinned)}
                  >
                    <div className={`${!pinned && "opacity-0"} rounded-lg flex justify-center items-center w-full h-full text-white bg-sky-400 duration-300`}>
                      <TbCheck className={`${!pinned && "opacity-0"} text-xl`}/>
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="font-medium">Review Content</p>
                <textarea
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  className="bg-white p-4 h-48 text-sm rounded-lg border duration-300 border-zinc-200 outline-none focus:ring-4 ring-sky-200"
                />
                { contentError && <p className="text-red-500 text-xs">Content is required</p>}
              </div>
              <button 
                className="bg-sky-400 flex justify-center items-center hover:opacity-80 duration-300 font-medium text-white p-4 rounded-lg"
                onClick={() => submitReview()}
              >
                {
                  addReviewMutation.isLoading ?
                  <svg aria-hidden="true" className="w-6 h-6 text-sky-500 animate-spin fill-zinc-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg> :
                  <p>Save Review</p>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}