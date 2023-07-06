"use client";

import { Dispatch, SetStateAction, useContext } from "react";
import Link from "next/link";
import { TbArrowBarRight, TbMoon, TbRun, TbSettings, TbSun, TbUser } from "react-icons/tb";
import { signOut } from "next-auth/react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { DarkModeContext } from "../Provider"
import { DarkModeProviderType } from "@/app/types"

export default function ProfileDropdown({
  userId,
  name,
  email,
  setDropdown,
}: {
  userId: string;
  name: string;
  email: string;
  setDropdown: Dispatch<SetStateAction<boolean>>;
}) {
  const dropdownRef = useDetectClickOutside({
    onTriggered: () => setDropdown(false),
  });

  const { setDarkMode, darkMode } = useContext(DarkModeContext) as DarkModeProviderType

  return (
    <div ref={dropdownRef} className="absolute top-11 drop-shadow-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 right-0 rounded-lg">
      <div        
        className="px-4 py-3 border-b dark:border-zinc-800 border-zinc-200 font-normal text-sm flex flex-col"
      >
        <p className="font-medium">{name}</p>
        <p className="text-zinc-400 text-xs">{email}</p>
      </div>
      <div className="border-b dark:border-zinc-800 border-zinc-200 font-normal text-sm flex flex-col dark:bg-zinc-900 bg-white">
        <Link
          href={`/profile/${userId}`}
          onClick={() => setDropdown(false)}
          className="flex space-x-2 items-center p-2 m-1 dark:hover:bg-zinc-800 hover:bg-zinc-100 duration-300 rounded-lg"
        >
          <TbUser className="text-lg" />
          <p>Profile</p>
        </Link>
        <Link
          href={`/profile/${userId}/activity`}
          onClick={() => setDropdown(false)}
          className="flex space-x-2 items-center p-2 m-1 dark:hover:bg-zinc-800 hover:bg-zinc-100 duration-300 rounded-lg"
        >
          <TbRun className="text-lg" />
          <p>Activity</p>
        </Link>
        <Link
          href="/settings"
          onClick={() => setDropdown(false)}
          className="flex space-x-2 items-center p-2 m-1 dark:hover:bg-zinc-800 hover:bg-zinc-100 duration-300 rounded-lg"
        >
          <TbSettings className="text-lg" />
          <p>Settings</p>
        </Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex space-x-2 items-center p-2 m-1 dark:hover:bg-zinc-800 hover:bg-zinc-100 duration-300 rounded-lg"
        >
          {
            darkMode ? <TbSun/> : <TbMoon/>
          }
          <p>{ darkMode ? "Light Mode" : "Dark Mode"}</p>
        </button>
      </div>
      <div className="font-normal text-sm flex flex-col bg-white dark:bg-zinc-900 rounded-b-md">
        <button
          onClick={() => signOut()}
          className="flex space-x-2 items-center p-2 m-1 dark:hover:bg-zinc-800 hover:bg-zinc-100 duration-300 rounded-lg"
        >
          <TbArrowBarRight className="text-lg" />
          <p>Sign Out</p>
        </button>
      </div>
    </div>
  );
}
