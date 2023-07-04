'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSession } from "next-auth/react"
import Image from "next/image";
import Toast from "../Toast";
import { User } from "@prisma/client";

export default function ProfileForm({
  user,
}: {
  user: User;
}) {
  const queryClient = useQueryClient()

  const [username, setUsername] = useState<string>(user.name || "");
  const [bio, setBio] = useState<string>(user.bio || "");
  const [spotify, setSpotify] = useState<string>(user.spotifyUsername || "")
  const [pfp, setPfp] = useState<File>()

  const [usernameError, setUsernameError] = useState<boolean>(false)

  const { update } = useSession()

  const updateMutation = useMutation({
    mutationFn: async () =>{
      const formData = new FormData()

      if (pfp) {
        formData.append("avatar", pfp)
      }
      formData.append("bio", bio)
      formData.append("name", username)
      formData.append("spotifyUsername", spotify)
    
      const res = await fetch(`/api/user/profile`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['user', { id: user.id }]})
      update()
      setToast(true)
    }
  })

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (!fileList) return
    console.log(fileList[0].name)
    setPfp(fileList[0])
  }

  const submitChanges = () => {
    if (!username) {
      setUsernameError(true)
      return
    }
    updateMutation.mutate()
  }

  const [toast, setToast] = useState<boolean>(false)

  return (
    <div className="flex space-y-10 flex-col w-full md:w-3/4">
      <div className="flex flex-col space-y-5 w-full">
        <div className="flex flex-col space-y-2">
          <p className="font-medium">Username</p>
          <div className="flex flex-col space-y-2">
            <input
              value={username}
              onChange={(e) => {
                setUsernameError(false)
                setUsername(e.target.value)
              }}
              className={`placeholder:text-zinc-500 drop-shadow-md bg-white bg-transparent duration-300 border border-zinc-200 rounded-lg px-4 py-3 outline-none ring-sky-200 ${
                usernameError
                  ? "border-red-500 focus:ring-0"
                  : "border-zinc-200 focus:ring-2"
              }`}
              placeholder="Your username"
            />
            { 
              usernameError &&
              <p className="text-xs text-red-500">Username is required</p> 
            } 
          </div>
        </div>
        <div className="relative hover:opacity-80 duration-300 space-y-2 items-center justify-center border-zinc-200 border drop-shadow-md rounded-lg bg-white py-8">
          <div className="flex space-y-3 flex-col items-center">
            <div className="relative h-16 w-16 rounded-full drop-shadow-lg ">
              {
                !pfp ?
                <Image
                  src={user.image || ""}
                  fill
                  alt="avatar"
                  className="rounded-full drop-shadow-lg "
                /> :
                <Image
                  src={URL.createObjectURL(pfp)}
                  fill
                  alt="avatar"
                  className="rounded-full drop-shadow-lg "
                />
              }
            </div>
            <p className="text-sm">Change Profile Picture</p>
          </div>
          <input 
            onChange={(e) => handleUpload(e)}
            type="file" 
            accept=".png, .jpg, .jpeg" 
            className="cursor-pointer opacity-0 absolute inset-0 w-full h-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <p className="font-medium">Bio</p>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="h-44 py-3 px-4 placeholder:text-zinc-500 rounded-lg border border-zinc-200 bg-white drop-shadow-md outline-none focus:ring-2 ring-sky-200 duration-300"
            placeholder="Your bio"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <p className="flex items-center font-medium">Spotify Username</p>
          <input
            value={spotify}
            onChange={(e) => setSpotify(e.target.value)}
            className="py-3 px-4 placeholder:text-zinc-500 rounded-lg border border-zinc-200 bg-white drop-shadow-md outline-none bg-transparent focus:ring-2 ring-sky-200 duration-300"
            placeholder="Your spotify username"
          />
        </div>
      </div>
      <button
        className="flex px-4 py-3.5 justify-center rounded-lg bg-sky-400 font-medium text-white hover:opacity-80 duration-300"
        onClick={submitChanges}
      > 
        { updateMutation.isLoading ?           
          <svg aria-hidden="true" className="w-6 h-6 text-sky-500 animate-spin fill-zinc-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg> :
          <p>Save Changes</p>
        }
      </button>
      <Toast setToast={setToast} toast={toast}>
        <p className="font-medium">Changes saved</p>
        <p className="text-xs text-zinc-400">Your profile changes have been saved and your profile will reflect these updates.</p>
      </Toast>
    </div>
  );
}