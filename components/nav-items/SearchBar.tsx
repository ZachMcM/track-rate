"use client";

import { formatName, getAccessToken } from "@/app/apiMethods";
import { Artist, SimplifiedAlbum, Track } from "@/app/types";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { TbSearch, TbUser, TbX } from "react-icons/tb";
import { uid } from "uid";

export default function SearchBar({
  setModal,
}: {
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [input, setInput] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<string>("music");

  const { data: accessToken } = useQuery({
    queryKey: ["access-token"],
    queryFn: getAccessToken,
  });

  const { data: musicResults, refetch } = useQuery({
    queryKey: ["music-search"],
    queryFn: async () => {
      if (!input || searchType != "music") {
        return {
          albums: [],
          tracks: [],
          artists: [],
        };
      }
      const query = await fetch(
        `https://api.spotify.com/v1/search?q=${input.replace(
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
      console.log(data);
      console.log(
        musicResults &&
          musicResults.albums.length != 0 &&
          musicResults.tracks.length != 0 &&
          musicResults.artists.length != 0
      );

      const res = {
        albums: data.albums.items,
        tracks: data.tracks.items,
        artists: data.artists.items,
      };
      return res;
    },
    enabled: !!accessToken,
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  const { data: userResults, refetch: refetchUsers } = useQuery({
    queryKey: ['user-search'],
    queryFn: async (): Promise<User[]> => {
      if (!input || searchType != "users") {
        return []
      } 
      const res = await fetch(`/api/users?query=${input}`)
      const data = await res.json()
      return data
    }
  })

  const userRequest = debounce(async () => {
    refetchUsers()
  }, 300)

  const userDebounceRequest = useCallback(() => {
    userRequest()
  }, [])

  const closeSearch = () => {
    setDropdown(false);
    setInput("");
    setSearchType("music");
    setModal(false);
  };

  const modalRef = useDetectClickOutside({
    onTriggered: closeSearch,
  });

  return (
    <div className="bg-black/70 z-50 inset-0 fixed justify-center flex items-center">
      <div
        ref={modalRef}
        className="drop-shadow-lg rounded-md bg-white flex flex-col w-full  md:w-2/5 items-center border p-8"
      >
        <button
          className="p-2 rounded-full hover:bg-zinc-200 duration-300 absolute right-0 top-0 m-2"
          onClick={closeSearch}
        >
          <TbX className="text-xl" />
        </button>
        <div className="mt-8 items-center drop-shadow-lg bg-zinc-100 border border-zinc-200 rounded-lg py-3 px-5 w-full focus-within:ring-2 ring-sky-200">
          <input
            value={input}
            onFocus={() => setDropdown(true)}
            onChange={(e) => {
              setInput(e.target.value);
              debounceRequest();
              userDebounceRequest()
            }}
            className="transparent placeholder:text-zinc-500 bg-transparent w-full border-none outline-none"
            placeholder="Search trackrate..."
          />
          {dropdown && (
            <div className="absolute left-0 top-14 bg-white border w-full border-zinc-200 drop-shadow-lg rounded-lg">
              <div className="flex items-center py-3 px-5 space-x-7 border-b border-zinc-200">
                <button
                  onClick={() => {
                    setInput("")
                    setSearchType("music")
                  }}
                  className={`font-medium hover:text-sky-400 duration-300 ${
                    searchType == "music" && "text-sky-400"
                  }`}
                >
                  Music
                </button>
                <button
                  onClick={() => {
                    setInput("")
                    setSearchType("users")
                  }}
                  className={`font-medium hover:text-sky-400 duration-300 ${
                    searchType == "users" && "text-sky-400"
                  }`}
                >
                  Users
                </button>
              </div>
              <div
                className={`h-64 w-full ${
                  searchType == "music" ? "flex" : "hidden"
                } overflow-y-auto`}
              >
                {musicResults &&
                  musicResults.albums.length != 0 &&
                  musicResults.tracks.length != 0 &&
                  musicResults.artists.length != 0 && (
                    <div className="flex flex-col space-y-4 py-4 w-full">
                      <div className="flex flex-col w-full">
                        <p className="font-semibold text-lg px-5">Albums</p>
                        <div className="flex flex-col w-full">
                          {musicResults.albums.map((album: SimplifiedAlbum) => {
                            return (
                              <Link
                                key={uid()}
                                className="flex space-x-4 items-center py-2 px-3 mx-2 hover:bg-zinc-200 duration-300 rounded-md"
                                href={`/album/${album.id}`}
                                onClick={closeSearch}
                              >
                                <div className="h-16 w-16 relative rounded-md drop-shadow-lg">
                                  {album.images && album.images[0]?.url ? (
                                    <Image
                                      src={album.images[0].url}
                                      fill
                                      alt={album.name}
                                      className="rounded-md bg-zinc-100"
                                    />
                                  ) : (
                                    <div className="bg-zinc-200 absolute inset-0"></div>
                                  )}
                                </div>
                                <div className="flex flex-col space-y-1">
                                  <p className="font-medium text-start">
                                    {formatName(album.name, 25)}
                                  </p>
                                  <p className="text-sm text-zinc-400 text-start">
                                    {album.artists.map(
                                      (artist: Artist, i: number) => {
                                        return (
                                          <span key={uid()}>
                                            {formatName(artist.name, 25)}
                                            {i != album.artists.length - 1 &&
                                              ","}{" "}
                                          </span>
                                        );
                                      }
                                    )}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold text-lg px-5">Tracks</p>
                        <div className="flex flex-col">
                          {musicResults.tracks.map((track: Track) => {
                            return (
                              <Link
                                href={`/track/${track.id}`}
                                key={uid()}
                                onClick={closeSearch}
                                className="flex space-x-4 items-center py-2 px-3 mx-2 hover:bg-zinc-200 duration-300 rounded-md"
                              >
                                <div className="h-16 w-16 relative rounded-md drop-shadow-lg">
                                  {track.album.images &&
                                  track.album.images[0]?.url ? (
                                    <Image
                                      src={track.album.images[0].url}
                                      fill
                                      alt={track.name}
                                      className="rounded-md bg-zinc-100"
                                    />
                                  ) : (
                                    <div className="bg-zinc-200 absolute inset-0"></div>
                                  )}
                                </div>
                                <div className="flex flex-col space-y-1">
                                  <p className="font-medium text-start">
                                    {formatName(track.name, 25)}
                                  </p>
                                  <p className="text-sm text-start text-zinc-400">
                                    {track.artists.map(
                                      (artist: Artist, i: number) => {
                                        return (
                                          <span key={uid()}>
                                            {" "}
                                            {formatName(artist.name, 25)}
                                            {i != track.artists.length - 1 &&
                                              ","}{" "}
                                          </span>
                                        );
                                      }
                                    )}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold text-lg px-5">Artists</p>
                        <div className="flex flex-col">
                          {musicResults.artists.map((artist: Artist) => {
                            return (
                              <Link
                                onClick={closeSearch}
                                href={`/artist/${artist.id}`}
                                key={uid()}
                                className="flex space-x-4 items-center py-2 px-3 mx-2 hover:bg-zinc-200 duration-300 rounded-md"
                              >
                                <div className="h-16 w-16 relative rounded-full drop-shadow-lg">
                                  {artist.images && artist.images[0]?.url ? (
                                    <Image
                                      src={artist.images[0].url}
                                      fill
                                      alt={artist.name}
                                      className="bg-zinc-100 rounded-full"
                                    />
                                  ) : (
                                    <div className="bg-zinc-100 absolute inset-0 flex justify-center items-center rounded-full">
                                      <TbUser className="text-3xl text-zinc-400" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex flex-col space-y-1">
                                  <p className="font-medium text-start">
                                    {formatName(artist.name, 25)}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
              </div>
              <div
                className={`h-64 w-full ${
                  searchType == "users" ? "flex" : "hidden"
                } overflow-y-auto`}
              >
                {
                  userResults && 
                  <div className="flex flex-col space-y-4 py-4 w-full">
                    {
                      userResults.map((user: User) => {
                        return (
                          <Link href={`/user/${user.id}`} className="flex space-x-4 items-center py-2 px-3 mx-2 hover:bg-zinc-200 duration-300 rounded-md">
                            <div className="relative h-10 w-10 drop-shadow-lg rounded-full">
                              <Image
                                src={user.image || ""}
                                fill
                                alt="avatar"
                                className="rounded-full drop-shadow-lg"
                              />
                            </div>
                            <p className="font-medium">{user.name}</p>
                          </Link>
                        )
                      })
                    }
                  </div>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
