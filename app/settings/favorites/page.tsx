"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAccessToken,
  getAlbum,
  getAlbumList,
  getArtist,
  getArtistList,
  getTrack,
  getTrackList,
  getUser,
  updateFavorites,
} from "@/app/apiMethods";
import { useSession } from "next-auth/react";
import { Album, Artist, FullUser, SimplifiedAlbum, Track } from "@/app/types";
import { Dispatch, SetStateAction, useState } from "react";
import { redirect } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import FavoriteCard from "@/components/FavoriteCard";
import { TbPlus, TbSearch, TbX } from "react-icons/tb";
import Image from "next/image";
import { useDetectClickOutside } from "react-detect-click-outside";

export default function Settings() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  const userId = session?.user.id;

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId || ""),
    enabled: !!userId,
  });

  return (
    <div className="flex flex-col space-y-5 md:w-3/5">
      <div className="flex flex-col border-b border-zinc-800 pb-5 w-full">
        <h3 className="font-medium text-lg">Favorites</h3>
        <p className="text-sm text-zinc-400">
          Your favorite track, album, and artist.
        </p>
      </div>
      {user && !isLoading ? <Favorites user={user} /> : <LoadingSpinner />}
    </div>
  );
}

function Favorites({ user }: { user: FullUser }) {
  const accessTokenQuery = useQuery({
    queryKey: ["access-token"],
    queryFn: getAccessToken,
  });

  const accessToken = accessTokenQuery?.data;

  const favAlbumQuery = useQuery({
    queryKey: ["album", user.favAlbum],
    queryFn: () => getAlbum(user.favAlbum || "", accessToken),
    enabled: !!accessToken,
  });

  const favTrackQuery = useQuery({
    queryKey: ["track", user.favTrack],
    queryFn: () => getTrack(user.favTrack || "", accessToken),
    enabled: !!accessToken,
  });

  const favArtistQuery = useQuery({
    queryKey: ["artist", user.favArtist],
    queryFn: () => getArtist(user.favArtist || "", accessToken),
    enabled: !!accessToken,
  });

  if (
    !favAlbumQuery.isLoading &&
    !favTrackQuery.isLoading &&
    !favArtistQuery.isLoading
  ) {
    return (
      <FavoritesForm
        initAlbum={favAlbumQuery.data}
        initArtist={favArtistQuery.data}
        initTrack={favTrackQuery.data}
        userId={user.id}
      />
    );
  } else {
    return <LoadingSpinner />;
  }
}

function FavoritesForm({
  initAlbum,
  initTrack,
  initArtist,
  userId,
}: {
  initAlbum?: Album;
  initTrack?: Track;
  initArtist?: Artist;
  userId: string;
}) {
  const [favAlbum, setFavAlbum] = useState<Album | undefined>(initAlbum);
  const [favTrack, setFavTrack] = useState<Track | undefined>(initTrack);
  const [favArtist, setFavArtist] = useState<Artist | undefined>(initArtist);

  const [albumModal, setAlbumModal] = useState<boolean>(false)
  const [trackModal, setTrackModal] = useState<boolean>(false)
  const [artistModal, setArtistModal] = useState<boolean>(false)

  const queryClient = useQueryClient();

  const favoritesMutation = useMutation({
    mutationFn: () =>
      updateFavorites({
        favAlbum: favAlbum?.id || "",
        favArtist: favArtist?.id || "",
        favTrack: favTrack?.id || "",
      }),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
  });

  return (
    <>
      <div className="flex space-y-10 flex-col w-full">
        <div className="w-full flex flex-col space-y-8 text-sm">
          <div className="flex flex-col space-y-2">
            <p className="font-medium">Favorite Track</p>
            <div className="relative">
              {favTrack ? (
                <>
                  <FavoriteCard type="track" id={favTrack.id} />
                  <button
                    className="absolute -top-2 -right-2 bg-zinc-950 p-1 rounded-full border border-zinc-800 hover:opacity-80 duration-300"
                    onClick={() => setFavTrack(undefined)}
                  >
                    <TbX />
                  </button>
                </>
              ) : (
                <button 
                  className="p-5 w-full border border-zinc-800 rounded-md hover:opacity-50 duration-300"
                  onClick={() => setTrackModal(true)}
                >
                  <div className="h-16 w-full flex items-center justify-center">
                    <TbPlus className="text-3xl" />
                  </div>
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="font-medium">Favorite Album</p>
            <div className="relative">
              {favAlbum ? (
                <>
                  <FavoriteCard type="album" id={favAlbum.id} />
                  <button
                    className="absolute -top-2 -right-2 bg-zinc-950 p-1 rounded-full border border-zinc-800 hover:opacity-80 duration-300"
                    onClick={() => setFavAlbum(undefined)}
                  >
                    <TbX />
                  </button>
                </>
              ) : (
                <button 
                  className="p-5 w-full border border-zinc-800 rounded-md hover:opacity-50 duration-300"
                  onClick={() => setAlbumModal(true)}
                >
                  <div className="h-16 w-full flex items-center justify-center">
                    <TbPlus className="text-3xl" />
                  </div>
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="font-medium">Favorite Artist</p>
            <div className="relative">
              {favArtist ? (
                <>
                  <FavoriteCard type="artist" id={favArtist.id} />
                  <button
                    className="absolute -top-2 -right-2 bg-zinc-950 p-1 rounded-full border border-zinc-800 hover:opacity-80 duration-300"
                    onClick={() => setFavArtist(undefined)}
                  >
                    <TbX />
                  </button>
                </>
              ) : (
                <button 
                  className="p-5 w-full border border-zinc-800 rounded-md hover:opacity-50 duration-300"
                  onClick={() => setArtistModal(true)}
                >
                  <div className="h-16 w-full flex items-center justify-center">
                    <TbPlus className="text-3xl" />
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
        <button
          className="flex space-x-2 items-center text-xs md:text-sm w-fit self-end px-4 py-2 rounded-md font-medium bg-white text-zinc-950 hover:opacity-80 duration-300"
          onClick={() => favoritesMutation.mutate()}
        >
          <p>Save Changes</p>
          {favoritesMutation.isLoading && (
            <svg
              aria-hidden="true"
              className="w-54 h-5 mr-2 text-zinc-400 animate-spin fill-zinc-950"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
        </button>
      </div>    
      { albumModal && <AlbumSearch setModal={setAlbumModal} setTarget={setFavAlbum}/> }
      { trackModal && <TrackSearch setModal={setTrackModal} setTarget={setFavTrack}/> }
      { artistModal && <ArtistSearch setModal={setArtistModal} setTarget={setFavArtist}/> }
    </>
  );
}

function AlbumSearch({
  setTarget,
  setModal
}: {
  setModal: Dispatch<SetStateAction<boolean>>
  setTarget: Dispatch<SetStateAction<Album | undefined>>;
}) {
  const [results, setResults] = useState<SimplifiedAlbum[]>([])

  const { data: accessToken } = useQuery({
    queryKey: ['access-token'],
    queryFn: getAccessToken
  })

  const getResults = async (query: string) => {
    if (!query) {
      setResults([])
    } else {
      const arr = await getAlbumList(query, accessToken)
      setResults(arr)
    }
  }

  const modalRef = useDetectClickOutside({ onTriggered: () => closeModal() })

  const closeModal = () => {
    setResults([])
    setModal(false)
  }

  const getFullAlbum = async (id: string) => {
    const album = await getAlbum(id, accessToken)
    setTarget(album)
    setModal(false)
  }

  return (
    <div className="z-50 !mt-0 fixed w-full h-full left-0 top-0 bottom-0 backdrop-blur-md flex justify-center items-center">
      <div ref={modalRef} className="flex flex-col space-y-5 p-6 w-full m-6 md:w-3/5 lg:w-2/5 rounded-md border border-zinc-800 bg-zinc-950">
        <button 
          className="hover:text-white duration-300 text-zinc-400 self-end absolute"
          onClick={closeModal}
        >
          <TbX className="text-lg"/>
        </button>
        <p className="font-medium">Search for an album</p>
        <div className="w-full relative text-sm">
          <div className="flex space-x-2 items-center text-zinc-400 border-zinc-800 border rounded-md px-4 py-3 focus-within:ring-1 ring-zinc-800">
            <TbSearch className="text-xl"/>
            <input
              onChange={(e) => {
                getResults(e.target.value)
              }}
              className="bg-zinc-950 border-none outline-none placeholder:text-zinc-400 w-full"
              placeholder="Name of album or track..."
            />
          </div>
          {
            results.length != 0 &&
            <div className="rounded-md w-full max-h-40 flex flex-col overflow-y-auto bg-zinc-950 absolute top-14 border border-zinc-800">
              {
                results.map((result: SimplifiedAlbum) => {
                  return (
                    <button 
                      onClick={() => {
                        console.log(result)
                        setResults([])
                        getFullAlbum(result.id)
                      }}
                      key={result.id} 
                      className="flex space-x-4 items-center rounded-md text-start text-zinc-400 hover:text-white p-2 m-2 hover:bg-zinc-800 duration-300"
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
  )
}

function TrackSearch({
  setTarget,
  setModal
}: {
  setModal: Dispatch<SetStateAction<boolean>>
  setTarget: Dispatch<SetStateAction<Track | undefined>>;
}) {
  const [results, setResults] = useState<Track[]>([])

  const { data: accessToken } = useQuery({
    queryKey: ['access-token'],
    queryFn: getAccessToken
  })

  const getResults = async (query: string) => {
    if (!query) {
      setResults([])
    } else {
      const arr = await getTrackList(query, accessToken)
      setResults(arr)
    }
  }

  const modalRef = useDetectClickOutside({ onTriggered: () => closeModal() })

  const closeModal = () => {
    setResults([])
    setModal(false)
  }

  return (
    <div className="z-50 !mt-0 fixed w-full h-full left-0 top-0 bottom-0 backdrop-blur-md flex justify-center items-center">
      <div ref={modalRef} className="flex flex-col space-y-5 p-6 w-full m-6 md:w-3/5 lg:w-2/5 rounded-md border border-zinc-800 bg-zinc-950">
        <button 
          className="hover:text-white duration-300 text-zinc-400 self-end absolute"
          onClick={closeModal}
        >
          <TbX className="text-lg"/>
        </button>
        <p className="font-medium">Search for a track</p>
        <div className="w-full relative text-sm">
          <div className="flex space-x-2 items-center text-zinc-400 border-zinc-800 border rounded-md px-4 py-3 focus-within:ring-1 ring-zinc-800">
            <TbSearch className="text-xl"/>
            <input
              onChange={(e) => {
                getResults(e.target.value)
              }}
              className="bg-zinc-950 border-none outline-none placeholder:text-zinc-400 w-full"
              placeholder="Name of album or track..."
            />
          </div>
          {
            results.length != 0 &&
            <div className="rounded-md w-full max-h-40 flex flex-col overflow-y-auto bg-zinc-950 absolute top-14 border border-zinc-800">
              {
                results.map((result: Track) => {
                  return (
                    <button 
                      onClick={() => {
                        console.log(result)
                        setResults([])
                        setTarget(result)
                        setModal(false)
                      }}
                      key={result.id} 
                      className="flex space-x-4 items-center rounded-md text-start text-zinc-400 hover:text-white p-2 m-2 hover:bg-zinc-800 duration-300"
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
        </div>
      </div>
    </div>
  )
}

function ArtistSearch({
  setTarget,
  setModal
}: {
  setModal: Dispatch<SetStateAction<boolean>>
  setTarget: Dispatch<SetStateAction<Artist | undefined>>;
}) {
  const [results, setResults] = useState<Artist[]>([])

  const { data: accessToken } = useQuery({
    queryKey: ['access-token'],
    queryFn: getAccessToken
  })

  const getResults = async (query: string) => {
    if (!query) {
      setResults([])
    } else {
      const arr = await getArtistList(query, accessToken)
      setResults(arr)
    }
  }

  const modalRef = useDetectClickOutside({ onTriggered: () => closeModal() })

  const closeModal = () => {
    setResults([])
    setModal(false)
  }

  return (
    <div className="z-50 !mt-0 fixed w-full h-full left-0 top-0 bottom-0 backdrop-blur-md flex justify-center items-center">
      <div ref={modalRef} className="flex flex-col space-y-5 p-6 w-full m-6 md:w-3/5 lg:w-2/5 rounded-md border border-zinc-800 bg-zinc-950">
        <button 
          className="hover:text-white duration-300 text-zinc-400 self-end absolute"
          onClick={closeModal}
        >
          <TbX className="text-lg"/>
        </button>
        <p className="font-medium">Search for an artist</p>
        <div className="w-full relative text-sm">
          <div className="flex space-x-2 items-center text-zinc-400 border-zinc-800 border rounded-md px-4 py-3 focus-within:ring-1 ring-zinc-800">
            <TbSearch className="text-xl"/>
            <input
              onChange={(e) => {
                getResults(e.target.value)
              }}
              className="bg-zinc-950 border-none outline-none placeholder:text-zinc-400 w-full"
              placeholder="Name of album or track..."
            />
          </div>
          {
            results.length != 0 &&
            <div className="rounded-md w-full max-h-40 flex flex-col overflow-y-auto bg-zinc-950 absolute top-14 border border-zinc-800">
              {
                results.map((result: Artist) => {
                  return (
                    <button 
                      onClick={() => {
                        console.log(result)
                        setResults([])
                        setTarget(result)
                        setModal(false)
                      }}
                      key={result.id} 
                      className="flex space-x-4 items-center rounded-md text-start text-zinc-400 hover:text-white p-2 m-2 hover:bg-zinc-800 duration-300"
                    >
                      {
                        result.images && result.images[0] &&
                        <Image
                          src={result.images[0].url}
                          height={40}
                          width={40}
                          alt={result.name}
                          className="rounded-md"
                        />
                      }
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
  )
}
