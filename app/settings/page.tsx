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
  updateUser,
} from "../apiMethods";
import { useSession } from "next-auth/react";
import { Album, Artist, FullUser, SimplifiedAlbum, Track } from "../types";
import { useState } from "react";
import Image from "next/image";
import { TbSearch } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { BsSpotify } from "react-icons/bs";

export default function Settings() {
  const { data: session } = useSession();

  const userId = session?.user.id;

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId || ""),
    enabled: !!userId,
  });

  const favAlbumId = user?.favAlbum || "";
  const favTrackId = user?.favTrack || "";
  const favArtistId = user?.favArtist || "";

  const acccesTokenQuery = useQuery({
    queryKey: ["access-token"],
    queryFn: getAccessToken,
    enabled: !!favAlbumId,
  });

  const accessToken = acccesTokenQuery.data;

  const { data: favAlbum, isLoading: favAlbumLoading } = useQuery({
    queryKey: ["album", favAlbumId],
    queryFn: () => getAlbum(favAlbumId, accessToken),
    enabled: !!accessToken,
  });

  const { data: favArtist, isLoading: favArtistLoading } = useQuery({
    queryKey: ["artist", favArtistId],
    queryFn: () => getArtist(favArtistId, accessToken),
    enabled: !!accessToken,
  });

  const { data: favTrack, isLoading: favTrackLoading } = useQuery({
    queryKey: ["track", favTrackId],
    queryFn: () => getTrack(favTrackId, accessToken),
    enabled: !!accessToken,
  });

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-col space-y-2 border-b border-zinc-700 pb-5 w-full">
        <h1 className="text-2xl font-bold w-full">Settings</h1>
        <p className="font-medium text-zinc-400">
          Manage your profile info including your name, bio, and favorites.
        </p>
      </div>
      {user && !favAlbumLoading && !favTrackLoading && !favArtistLoading ?
        <ProfileForm
          user={user}
          initFavAlbum={favAlbum}
          initFavArtist={favArtist}
          initFavTrack={favTrack}
        /> : 
        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-zinc-800 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      }
    </div>
  );
}

function ProfileForm({
  user,
  initFavAlbum,
  initFavTrack,
  initFavArtist,
}: {
  user: FullUser;
  initFavAlbum?: Album;
  initFavTrack?: Track;
  initFavArtist?: Artist;
}) {
  const acccesTokenQuery = useQuery({
    queryKey: ["access-token"],
    queryFn: getAccessToken,
  });

  const accessToken = acccesTokenQuery.data;

  const [username, setUsername] = useState<string>(user.name || "");
  const [bio, setBio] = useState<string>(user.bio || "");
  const [spotify, setSpotify] = useState<string>(user.spotifyUsername || "")
  const [favAlbum, setFavAlbum] = useState<Album | undefined>(initFavAlbum);
  const [favTrack, setFavTrack] = useState<Track | undefined>(initFavTrack);
  const [favArtist, setFavArist] = useState<Artist | undefined>(initFavArtist);

  const [trackResults, setTrackResults] = useState<Track[]>([]);
  const [albumResults, setAlbumResults] = useState<SimplifiedAlbum[]>([]);
  const [artistResults, setArtistResults] = useState<Artist[]>([]);

  const [usernameError, setUsernameError] = useState<boolean>(false)

  const router = useRouter()

  const getResults = async (query: string, type: string) => {
    if (!query || query == "") {
      setAlbumResults([]);
      setTrackResults([]);
    }
    if (type && query) {
      if (type == "album") {
        const arr = await getAlbumList(query, accessToken);
        setAlbumResults(arr);
      } else if (type == "track") {
        const arr = await getTrackList(query, accessToken);
        setTrackResults(arr);
      } else {
        const arr = await getArtistList(query, accessToken)
        setArtistResults(arr)
      }
    }
  };

  const getFullAlbum = async (id: string) => {
    const fullAlbum = await getAlbum(id, accessToken);
    setFavAlbum(fullAlbum);
  };
  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: () => updateUser({
      bio: bio,
      name: username,
      favoriteAlbum: favAlbum?.id || "",
      favoriteArtist: favArtist?.id || "",
      favoriteTrack: favTrack?.id || "",
      spotifyUsername: spotify
    }),
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['user', user.id]})
      router.push(`/profile/${user.id}`)
    }
  })

  const submitChanges = () => {
    if (!username) {
      setUsernameError(true)
      return
    }
    updateMutation.mutate()
  }

  return (
    <div className="flex space-y-10 flex-col">
      <div className="flex flex-col space-y-10 md:space-x-10 md:flex-row md:space-y-0">
        <div className="flex flex-col space-y-8 text-sm w-full">
          <div className="flex flex-col space-y-3">
            <p className="font-medium">Username</p>
            <div className="flex flex-col space-y-1.5">
              <input
                value={username}
                onChange={(e) => {
                  setUsernameError(false)
                  setUsername(e.target.value)
                }}
                className={`placeholder:text-zinc-400 text-xs md:text-sm bg-transparent border border-zinc-700 rounded-md px-4 py-3 outline-none ring-zinc-700 ring-offset-2 ring-offset-zinc-950 ${
                  usernameError
                    ? "border-red-500 focus:ring-0"
                    : "border-zinc-700 focus:ring-2"
                }`}
                placeholder="Your username"
              />
              { usernameError && <p className="text-xs text-red-500">Username is required</p>} 
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <p className="font-medium">Bio</p>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="h-40 py-2 px-4 placeholder:text-zinc-400 rounded-md border border-zinc-700 outline-none bg-transparent focus:ring-2 ring-offset-2 ring-offset-zinc-950 ring-zinc-700"
              placeholder="Your bio"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <p className="flex items-center font-medium">Spotify Username <BsSpotify className="text-green-400 text-xl ml-2"/></p>
            <input
              value={spotify}
              onChange={(e) => setSpotify(e.target.value)}
              className="py-2 px-4 placeholder:text-zinc-400 rounded-md border border-zinc-700 outline-none bg-transparent focus:ring-2 ring-offset-2 ring-offset-zinc-950 ring-zinc-700"
              placeholder="Your spotify username"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-8 w-full text-sm">
          <div className="flex flex-col space-y-3">
            <p className="font-medium">Favorite Track</p>
            {favTrack && (
              <div className="flex space-x-5 items-center">
                <Image
                  src={favTrack.album.images[0].url}
                  height={70}
                  width={70}
                  alt={favTrack.name}
                  className="rounded-md"
                />
                <div className="flex flex-col space-y-1">
                  <p className="font-medium">{favTrack.name}</p>
                  <p className="text-xs text-zinc-400 font-medium">
                    {favTrack.artists.map((artist: Artist) => {
                      return <span key={artist.id}> {artist.name} </span>;
                    })}
                  </p>
                </div>
              </div>
            )}
            <div className="flex space-x-2 items-center text-zinc-300 border-zinc-700 border rounded-md px-4 py-2 focus-within:ring-2 ring-offset-2 ring-zinc-700 ring-offset-zinc-950">
              <TbSearch className="text-xl" />
              <input
                onChange={(e) => {
                  getResults(e.target.value, "track");
                }}
                className="bg-zinc-950 border-none outline-none placeholder:text-zinc-400 w-full"
                placeholder="Name of track..."
              />
            </div>
            {trackResults.length != 0 && (
              <div className="rounded-md w-full max-h-40 flex flex-col overflow-y-auto bg-zinc-950 mt-2 border border-zinc-700">
                {trackResults.map((result: Track) => {
                  return (
                    <button
                      onClick={() => {
                        setTrackResults([]);
                        setFavTrack(result);
                      }}
                      key={result.id}
                      className="flex space-x-4 items-center rounded-md text-start text-zinc-400 hover:text-white p-2 m-2 hover:bg-zinc-700 duration-300"
                    >
                      <Image
                        src={result.album.images[0].url}
                        height={50}
                        width={50}
                        alt={result.name}
                        className="rounded-md"
                      />
                      <p className="font-medium">{result.name}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-3">
            <p className="font-medium">Favorite Album</p>
            {favAlbum && (
              <div className="flex space-x-5 items-center">
                <Image
                  src={favAlbum.images[0].url}
                  height={70}
                  width={70}
                  alt={favAlbum.name}
                  className="rounded-md"
                />
                <div className="flex flex-col space-y-1">
                  <p className="font-medium">{favAlbum.name}</p>
                  <p className="text-xs text-zinc-400 font-medium">
                    {favAlbum.artists.map((artist: Artist) => {
                      return <span key={artist.id}> {artist.name} </span>;
                    })}
                  </p>
                </div>
              </div>
            )}
            <div className="flex space-x-2 items-center text-zinc-300 border-zinc-700 border rounded-md px-4 py-2 focus-within:ring-2 ring-offset-2 ring-zinc-700 ring-offset-zinc-950">
              <TbSearch className="text-xl" />
              <input
                onChange={(e) => {
                  getResults(e.target.value, "album");
                }}
                className="bg-zinc-950 border-none outline-none placeholder:text-zinc-400 w-full"
                placeholder="Name of album..."
              />
            </div>
            {albumResults.length != 0 && (
              <div className="rounded-md w-full max-h-40 flex flex-col overflow-y-auto bg-zinc-950 mt-2 border border-zinc-700">
                {albumResults.map((result: SimplifiedAlbum) => {
                  return (
                    <button
                      onClick={() => {
                        setAlbumResults([]);
                        getFullAlbum(result.id);
                      }}
                      key={result.id}
                      className="flex space-x-4 items-center rounded-md text-start text-zinc-400 hover:text-white p-2 m-2 hover:bg-zinc-700 duration-300"
                    >
                      <Image
                        src={result.images[0].url}
                        height={50}
                        width={50}
                        alt={result.name}
                        className="rounded-md"
                      />
                      <p className="font-medium">{result.name}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-3">
            <p className="font-medium">Favorite Artist</p>
            {favArtist && (
              <div className="flex space-x-5 items-center">
                <Image
                  src={favArtist.images[0].url}
                  height={60}
                  width={60}
                  alt={favArtist.name}
                  className="rounded-md"
                />
                <div className="flex flex-col space-y-1">
                  <p className="font-medium">{favArtist.name}</p>
                </div>
              </div>
            )}
            <div className="flex space-x-2 items-center text-zinc-300 border-zinc-700 border rounded-md px-4 py-2 focus-within:ring-2 ring-offset-2 ring-zinc-700 ring-offset-zinc-950">
              <TbSearch className="text-xl" />
              <input
                onChange={(e) => {
                  getResults(e.target.value, "artist");
                }}
                className="bg-zinc-950 border-none outline-none placeholder:text-zinc-400 w-full"
                placeholder="Name of album..."
              />
            </div>
            {artistResults.length != 0 && (
              <div className="rounded-md w-full max-h-40 flex flex-col overflow-y-auto bg-zinc-950 mt-2 border border-zinc-700">
                {artistResults.map((result: Artist) => {
                  return (
                    <button
                      onClick={() => {
                        setArtistResults([]);
                        setFavArist(result)
                      }}
                      key={result.id}
                      className="flex space-x-4 items-center rounded-md text-start text-zinc-400 hover:text-white p-2 m-2 hover:bg-zinc-700 duration-300"
                    >
                      {
                        result.images && result.images[0] &&
                        <Image
                          src={result.images[0].url}
                          height={50}
                          width={50}
                          alt={result.name}
                          className="rounded-md"
                        />
                      }
                      <p className="font-medium">{result.name}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        className="flex space-x-2 items-center text-xs md:text-sm w-fit self-end px-4 py-3 rounded-md font-medium bg-white text-zinc-950 hover:opacity-80 duration-300"
        onClick={submitChanges}
      > 
        <p>Save Changes</p>
        { updateMutation.isLoading &&               
          <svg aria-hidden="true" className="w-5 h-5 mr-2 text-zinc-300 animate-spin fill-zinc-950" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg> 
        }
      </button>
    </div>

  );
}
