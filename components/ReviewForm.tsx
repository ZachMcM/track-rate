'use client'

import { useContext, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAccessToken, getAlbum, getAlbumList, getTrackList } from "@/app/apiMethods"
import { TbCheck, TbChevronDown, TbSearch, TbX } from "react-icons/tb"
import { SimplifiedAlbum, Track } from "@/app/types"
import Image from "next/image"
import { useDetectClickOutside } from 'react-detect-click-outside';
import AlbumReviewForm from "./AlbumReviewForm"
import TrackReviewForm from "./TrackReviewForm"
import { ReviewFormContext, ReviewFormProviderType } from "./ReviewFormProvider";

export default function ReviewForm() {
  // getting our access token
  const tokenQuery = useQuery({ queryKey: ['access-token'], queryFn: getAccessToken })

  const {
    setType,
    type,
    setAlbumResults,
    albumResults,
    trackResults,
    setTrackResults,
    setAlbumTarget,
    albumTarget,
    trackTarget,
    setTrackTarget,
    setReviewForm,
    reviewForm
  } = useContext(ReviewFormContext) as ReviewFormProviderType

  const [dropdown, setDropdown] = useState<boolean>(false)

  const getResults = async (query: string) => {
    if (!query) {
      setAlbumResults([])
      setTrackResults([])
    }
    if (type && query) {
      if (type == "album") {
        const arr = await getAlbumList(query, tokenQuery.data)
        setAlbumResults(arr)
      } else if (type == "track") {
        const arr = await getTrackList(query, tokenQuery.data)
        setTrackResults(arr)
      }
    }
  }

  const getFullAlbum = async (id: string) => {
    const album = await getAlbum(id, tokenQuery.data)
    setAlbumTarget(album)
  }

  const modalRef = useDetectClickOutside({ onTriggered: () => setReviewForm(false)})

  if (reviewForm) {
    if (albumTarget) {
      return (
        <AlbumReviewForm/>
      )
    } else if (trackTarget) {
      return (
        <TrackReviewForm/>
      )
    } else {
      return (
        <div className="z-40 fixed w-full h-full left-0 top-0 bottom-0 backdrop-blur-md flex justify-center items-center">
          <div ref={modalRef} className="flex flex-col space-y-8 p-10 w-full m-10 md:w-3/5 lg:w-2/5 rounded-md border border-gray-700 bg-gray-950">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg md:text-xl">Create a new review...</h3>
              <button 
                className="p-1 rounded-md border border-gray-700"
                onClick={() => setReviewForm(false)}
              >
                <TbX className="text-white"/>
              </button>
            </div>
            <div className="flex flex-col space-y-5">
              <div className="relative w-full text-sm">
                <button 
                  className="w-full border border-gray-700 rounded-md flex items-center justify-between px-4 py-3"
                  onClick={() => setDropdown(true)}
                >
                  <p className={`${type && "capitalize"}`}>{type || "Select music type"}</p>
                  <TbChevronDown className="text-xl"/>
                </button>
                {
                  dropdown &&
                  <div className="z-50 flex flex-col absolute top-14 border rounded-md bg-gray-950 border-gray-700 w-full">
                    <button
                      className={`text-gray-400 hover:text-white flex items-center space-x-2 capitalize p-2 hover:bg-gray-700 duration-300 m-2 rounded-md text-start ${type == "track" && "bg-gray-700 text-white"}`}
                      onClick={() => {
                        setType("track")
                        setDropdown(false)
                        setAlbumResults([])
                        setTrackResults([])
                      }}
                    >
                      <TbCheck className={`${type == "track" ? "visible" : "invisible"} text-xl`}/>
                      <p>track</p>
                    </button>
                    <button
                      className={`text-gray-400 hover:text-white flex items-center space-x-2 capitalize p-2 hover:bg-gray-700 duration-300 m-2 rounded-md text-start ${type == "album" && "bg-gray-700 text-white"}`}
                      onClick={() => {
                        setType("album")
                        setDropdown(false)
                        setAlbumResults([])
                        setTrackResults([])
                      }}
                    >
                      <TbCheck className={`${type == "album" ? "visible" : "invisible" } text-xl`}/>
                      <p>album</p>
                    </button>
                  </div>
                }
              </div>
              <div className="w-full relative text-sm">
                <div className="flex space-x-2 items-center text-gray-300 border-gray-700 border rounded-md px-4 py-3 focus-within:ring-2 ring-offset-2 ring-gray-700 ring-offset-gray-950">
                  <TbSearch className="text-xl"/>
                  <input
                    onChange={(e) => {
                      getResults(e.target.value)
                    }}
                    className="bg-gray-950 border-none outline-none placeholder:text-gray-400 w-full"
                    placeholder="Name of album or track..."
                  />
                </div>
                {
                  trackResults.length != 0 &&
                  <div className="rounded-md w-full max-h-40 flex flex-col overflow-y-auto bg-gray-950 absolute top-14 border border-gray-700">
                    {
                      trackResults.map((result: Track) => {
                        return (
                          <button 
                            onClick={() => {
                              setTrackResults([])
                              setTrackTarget(result)
                            }}
                            key={result.id} 
                            className="flex space-x-4 items-center rounded-md text-start text-gray-400 hover:text-white p-2 m-2 hover:bg-gray-700 duration-300"
                          >
                            <Image
                              src={result.album.images[0].url}
                              height={40}
                              width={40}
                              alt={result.name}
                              className="rounded-md"
                            />
                            <p className="font-medium">{result.name}</p>
                          </button>
                        )
                      })
                    }
                  </div>
                }
                {
                  albumResults.length != 0 &&
                  <div className="rounded-md w-full max-h-40 flex flex-col overflow-y-auto bg-gray-950 absolute top-14 border border-gray-700">
                    {
                      albumResults.map((result: SimplifiedAlbum) => {
                        return (
                          <button 
                            onClick={() => {
                              console.log(result)
                              setAlbumResults([])
                              getFullAlbum(result.id)
                            }}
                            key={result.id} 
                            className="flex space-x-4 items-center rounded-md text-start text-gray-400 hover:text-white p-2 m-2 hover:bg-gray-700 duration-300"
                          >
                            <Image
                              src={result.images[0].url}
                              height={40}
                              width={40}
                              alt={result.name}
                              className="rounded-md"
                            />
                            <p className="font-medium">{result.name}</p>
                          </button>
                        )
                      })
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}