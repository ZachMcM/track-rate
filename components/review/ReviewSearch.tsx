'use client'

import { useCallback, useContext, useEffect, useState } from "react"
import { ReviewFormContext } from "../Provider"
import { Artist, ReviewFormProviderType, SimplifiedAlbum, Track } from "@/app/types"
import { useQuery } from "@tanstack/react-query"
import { formatName, getAccessToken } from "@/app/apiMethods"
import debounce from "lodash.debounce"
import Image from "next/image"
import { useDetectClickOutside } from "react-detect-click-outside"
import { TbUser, TbX } from "react-icons/tb"
import { uid } from "uid"

export default function ReviewSearch() {
  const {
    setSearchModal,
    setReviewForm,
    setItemData
  } = useContext(ReviewFormContext) as ReviewFormProviderType

  const [search, setSearch] = useState<string>('')

  const { data: accessToken } = useQuery({
    queryKey: ['access-token'],
    queryFn: getAccessToken,
  })

  const request = debounce(async () => {
    refetch()
  }, 300)

  const debounceRequest = useCallback(() => {
    request()
  }, [])

  const modalRef = useDetectClickOutside({ onTriggered: () => setSearchModal(false)})

  const { 
    data: searchResults,
    refetch,
  } = useQuery({
    queryKey: ['music-search'],
    queryFn: async () => {
      if (!search || search == "") {
        return (
          {
            albums: [],
            tracks: [],
            artists: []
          }
        )
      }
      const query = await fetch(
        `https://api.spotify.com/v1/search?q=${search.replace(
          /[^\w\s]/gi,
          ""
        )}&type=album%2Cartist%2Ctrack&market=us&limit=5`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    
      const data = await query.json();
    
      const res = {
        albums: data.albums.items,
        tracks: data.tracks.items,
        artists: data.artists.items,
      };
      return res;
    },
    enabled: !!accessToken
  })

  useEffect(() => {
    setSearch('')
  }, [])
 
  return (
    <div className="fixed inset-0 h-full w-full z-50 overflow-hidden bg-black/70 flex justify-center items-center p-3">
      <div ref={modalRef} className="drop-shadow-md rounded-lg dark:bg-zinc-900 bg-zinc-100 flex flex-col w-full md:w-3/5 lg:w-1/2 xl:w-2/5 items-center">
        <div className="p-4 bg-white dark:bg-zinc-900 dark:border-b border-zinc-800 rounded-t-md w-full text-center drop-shadow-md flex items-center">
          <p className="font-semibold text-lg basis-full">Search Music</p>
          <button
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 duration-300"
            onClick={() => setSearchModal(false)}
          > 
            <TbX className="text-xl"/>
          </button>
        </div>
        <div className="w-full p-4 flex justify-center">
          <div className="relative w-full">
            <input 
              type="text"
              className="bg-white z-50 rounded-lg drop-shadow-md dark:bg-zinc-950 dark:ring-zinc-800 dark:border-zinc-800 border focus:ring-1 outline-none ring-zinc-400 duration-300 border-zinc-300 w-full py-3 px-4 placeholder:text-zinc-400"
              placeholder="Search music..." 
              onChange={(e) => {
                setSearch(e.target.value)
                debounceRequest()
              }}
            />
            {
            searchResults && searchResults.albums.length != 0 && searchResults.tracks.length != 0 && searchResults.artists.length != 0 &&
            <div className="absolute rounded-lg w-full h-96 overflow-y-auto top-14 dark:bg-zinc-900 bg-white drop-shadow-md flex flex-col space-y-4 py-4">
              <div className="flex flex-col">
                <p className="font-semibold text-lg px-5">Albums</p>
                <div className="flex flex-col">
                  {
                    searchResults.albums.map((album: SimplifiedAlbum) => {
                      return (
                        <button 
                          key={uid()} 
                          className="flex space-x-4 items-center py-2 px-3 mx-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 duration-300 rounded-lg"
                          onClick={() => {
                            setItemData({
                              albumName: album.name,
                              albumImage: album.images[0]?.url || "",
                              albumId: album.id,
                              type: "album",
                              artistNames: album.artists.map((artist: Artist) => {return artist.name}),
                              artistIds: album.artists.map((artist: Artist) => {return artist.id}),
                              artistImages: album.artists.map((artist: Artist) => {
                                if (artist.images && artist.images[0]?.url) {
                                  return artist.images[0]?.url
                                } else {
                                  return ""
                                }
                              })
                            })
                            setSearchModal(false)
                            setReviewForm(true)
                          }}
                        >
                          <div className="h-16 w-16 relative rounded-lg drop-shadow-md">
                          {
                              album.images && album.images[0]?.url ?
                              <Image
                                src={album.images[0].url}
                                fill
                                alt={album.name}
                                className="rounded-lg"
                              /> :
                              <div className="absolute bg-zinc-100 dark:bg-zinc-800 inset-0"></div>
                            }
                          </div>
                          <div className="flex flex-col space-y-1">
                            <p className="font-medium text-start">{formatName(album.name, 25)}</p>
                            <p className="text-sm text-zinc-400 text-start">
                              {
                                album.artists.map((artist: Artist, i: number) => {
                                  return (
                                    <span key={uid()} >{formatName(artist.name, 25)}{i != album.artists.length - 1 && ","} </span>
                                  )
                                })
                              }
                            </p>
                          </div>
                        </button>
                      )
                    })
                  }
                </div>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-lg px-5">Tracks</p>
                <div className="flex flex-col">
                  {
                    searchResults.tracks.map((track: Track) => {
                      return (
                        <button 
                          key={uid()} 
                          className="flex space-x-4 items-center py-2 px-3 mx-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 duration-300 rounded-lg"
                          onClick={() => {
                            setItemData({
                              trackName: track.name,
                              albumImage: track.album.images[0]?.url || "",
                              trackId: track.id,
                              albumId: track.album.id,
                              albumName: track.album.name,
                              type: "track",
                              artistNames: track.artists.map((artist: Artist) => {return artist.name}),
                              artistIds: track.artists.map((artist: Artist) => {return artist.id}),
                              artistImages: track.artists.map((artist: Artist) => {
                                if (artist.images && artist.images[0]?.url) {
                                  return artist.images[0]?.url
                                } else {
                                  return ""
                                }
                              })
                            })
                            setReviewForm(true)
                            setSearchModal(false)
                          }}
                        >
                          <div className="h-16 w-16 relative rounded-lg drop-shadow-md">
                          {
                              track.album.images && track.album.images[0]?.url ?
                              <Image
                                src={track.album.images[0].url}
                                fill
                                alt={track.name}
                                className="rounded-lg"
                              /> :
                              <div className="absolute bg-zinc-100 dark:bg-zinc-800 inset-0"></div>
                            }
                          </div>
                          <div className="flex flex-col space-y-1">
                            <p className="font-medium text-start">{formatName(track.name, 25)}</p>
                            <p className="text-sm text-start text-zinc-400">
                              {
                                track.artists.map((artist: Artist, i: number) => {
                                  return (
                                    <span key={uid()} > {formatName(artist.name, 25)}{i != track.artists.length - 1 && ","} </span>
                                  )
                                })
                              }
                            </p>
                          </div>
                        </button>
                      )
                    })
                  }
                </div>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-lg px-5">Artists</p>
                <div className="flex flex-col">
                  {
                    searchResults.artists.map((artist: Artist) => {
                      return (
                        <button
                          key={uid()}  
                          className="flex space-x-4 items-center py-2 px-3 mx-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 duration-300 rounded-lg"
                          onClick={() => {
                            setItemData({
                              artistNames: [artist.name],
                              artistImages: [artist.images[0]?.url || ""],
                              artistIds: [artist.id],
                              type: "artist"
                            })
                            setReviewForm(true)
                            setSearchModal(false)
                          }}
                        >
                          <div className="h-16 w-16 relative rounded-full drop-shadow-md">
                            {
                              artist.images && artist.images[0]?.url ?
                              <Image
                                src={artist.images[0].url}
                                fill
                                alt={artist.name}
                                className=" rounded-full"
                              /> :
                              <div className="absolute bg-zinc-100 dark:bg-zinc-800 inset-0 flex justify-center items-center rounded-full"><TbUser className="text-3xl text-zinc-500"/></div>
                            }
                          </div>
                          <div className="flex flex-col space-y-1">
                            <p className="font-medium text-start">{formatName(artist.name, 25)}</p>
                          </div>
                        </button>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}