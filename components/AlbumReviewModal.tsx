"use client";

import { Dispatch, SetStateAction } from "react";
import { TbArrowLeft, TbCheck } from "react-icons/tb";
import { Album, Artist } from "@/app/apiTypes";
import Image from "next/image";
import Stars from "./Stars";
import { useDetectClickOutside } from "react-detect-click-outside";

type FnParams = {
  album: Album;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  reviewContent: string;
  setReviewContent: Dispatch<SetStateAction<string>>;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  saveReview: Function;
  setNewReviewModal: Dispatch<SetStateAction<boolean>>;
  setType: Dispatch<SetStateAction<string>>
  setAlbumTarget: Dispatch<SetStateAction<Album | undefined>>
};

export default function AlbumReviewModal({
  album,
  title,
  setTitle,
  reviewContent,
  setReviewContent,
  rating,
  setRating,
  saveReview,
  setNewReviewModal,
  setType,
  setAlbumTarget
}: FnParams) {
  const modalRef = useDetectClickOutside({
    onTriggered(e) {
      e.preventDefault();
      setNewReviewModal(false);
    },
  });

  return (
    <div className="z-50 fixed w-full h-full left-0 top-0 bottom-0 backdrop-blur-md flex justify-center items-center">
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
                setRating(0);
              }}
            >
              <TbArrowLeft />
              <p className="text-xs">Back</p>
            </button>
            <Image
              src={album.images[0].url}
              height={200}
              width={200}
              alt={album.name}
              className="rounded-md w-fit md:w-full"
            />
          </div>
          <div className="flex flex-col space-y-5 w-full">
            <h3 className="font-medium text-gray-400">I listened to...</h3>
            <div className="flex flex-col space-y-1">
              <h1 className="font-bold text-lg md:text-xl">
                {album.name}
              </h1>
              <p className="text-sky-400 text-sm">
                {album.artists.map((artist: Artist) => {
                  return <span key={artist.id}> {artist.name} </span>;
                })}
              </p>
            </div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Review title"
              className="placeholder:text-gray-400 text-sm bg-transparent border border-gray-700 rounded-md px-4 py-3 outline-none focus:ring-2 ring-gray-700 ring-offset-2 ring-offset-gray-950"
            />
            <textarea
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              className="min-h-max overflow-y-auto placeholder:text-gray-400 text-sm bg-transparent border border-gray-700 rounded-md p-4 outline-none focus:ring-2 ring-gray-700 ring-offset-2 ring-offset-gray-950"
              placeholder="Review content"
            />
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
