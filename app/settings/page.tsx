"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUser,
  updateProfile,
} from "../apiMethods";
import { useSession } from "next-auth/react";
import { FullUser} from "../types";
import { useState } from "react";
import { redirect } from "next/navigation";
import { BsSpotify } from "react-icons/bs";
import LoadingSpinner from "@/components/LoadingSpinner";
import Toast from "@/components/Toast";

export default function Settings() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect("/")
    },
  });

  const userId = session?.user.id;

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId || ""),
    enabled: !!userId,
  });

  return (
    <div className="flex flex-col space-y-5 md:w-4/5 lg:w-3/5">
      <div className="flex flex-col border-b border-zinc-800 pb-5 w-full">
        <h3 className="font-medium text-lg">Profile</h3>
        <p className="text-sm text-zinc-400">This is how others will see you on the site.</p>
      </div>
      {
        user && !isLoading ?
        <ProfileForm user={user}/> :
        <LoadingSpinner/>
      }
    </div>
  )
}

function ProfileForm({
  user,
}: {
  user: FullUser;
}) {
const queryClient = useQueryClient()
  const [username, setUsername] = useState<string>(user.name || "");
  const [bio, setBio] = useState<string>(user.bio || "");
  const [spotify, setSpotify] = useState<string>(user.spotifyUsername || "")

  const [usernameError, setUsernameError] = useState<boolean>(false)

  const { update } = useSession()

  const updateMutation = useMutation({
    mutationFn: () => updateProfile({
      bio: bio,
      name: username,
      spotifyUsername: spotify
    }),
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['user', user.id]})
      update()
      setToast(true)
    }
  })

  const submitChanges = () => {
    if (!username) {
      setUsernameError(true)
      return
    }
    updateMutation.mutate()
  }

  const [toast, setToast] = useState<boolean>(false)

  return (
    <div className="flex space-y-10 flex-col w-full">
      <div className="flex flex-col space-y-8 text-sm w-full">
        <div className="flex flex-col space-y-2">
          <p className="font-medium">Username</p>
          <div className="flex flex-col space-y-2">
            <input
              value={username}
              onChange={(e) => {
                setUsernameError(false)
                setUsername(e.target.value)
              }}
              className={`placeholder:text-zinc-400 text-xs md:text-sm bg-transparent border border-zinc-800 rounded-md px-4 py-2 outline-none ring-zinc-800 ${
                usernameError
                  ? "border-red-500 focus:ring-0"
                  : "border-zinc-800 focus:ring-1"
              }`}
              placeholder="Your username"
            />
            { usernameError ?
              <p className="text-xs text-red-500">Username is required</p> :
              <p className="text-zinc-400 text-xs">This is your public display name. It can be your real name or a pseudonym. You can change it whenever.</p>
            } 
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="font-medium">Bio</p>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="h-32 py-2 px-4 placeholder:text-zinc-400 rounded-md border border-zinc-800 outline-none bg-transparent focus:ring-1 ring-zinc-800"
            placeholder="Your bio"
          />
          <p className="text-zinc-400 text-xs">This is your public bio. </p>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="flex items-center font-medium"><BsSpotify className="text-xl mr-2 text-green-400"/>Spotify Username</p>
          <input
            value={spotify}
            onChange={(e) => setSpotify(e.target.value)}
            className="py-2 px-4 placeholder:text-zinc-400 rounded-md border border-zinc-800 outline-none bg-transparent focus:ring-1 ring-zinc-800"
            placeholder="Your spotify username"
          />
          <p className="text-zinc-400 text-xs">This adds a link to your spotify on your profile.</p>
        </div>
      </div>
      <button
        className="flex space-x-2 items-center text-xs md:text-sm w-fit self-end px-4 py-2 rounded-md font-medium bg-white text-zinc-950 hover:opacity-80 duration-300"
        onClick={submitChanges}
      > 
        <p>Save Changes</p>
        { updateMutation.isLoading &&               
          <svg aria-hidden="true" className="w-54 h-5 mr-2 text-zinc-300 animate-spin fill-zinc-950" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg> 
        }
      </button>
      <Toast setToast={setToast} toast={toast}/>
    </div>
  );
}