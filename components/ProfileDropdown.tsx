"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TbArrowBarRight, TbHeart, TbSettings, TbUser } from "react-icons/tb";
import { signOut } from "next-auth/react";
import { useDetectClickOutside } from "react-detect-click-outside";

export default function ProfileDropdwon({
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

  return (
    <div className="absolute top-11 drop-shadow-md bg-white right-0 rounded-md">
      <div
        ref={dropdownRef}
        className="px-4 py-3 border-b border-zinc-200 font-normal text-sm flex flex-col"
      >
        <p className="font-medium">{name}</p>
        <p className="text-zinc-400 text-xs">{email}</p>
      </div>
      <div className="border-b border-zinc-200 font-normal text-sm flex flex-col bg-white">
        <Link
          href={`/profile/${userId}`}
          className="flex space-x-2 items-center p-2 m-1 hover:bg-zinc-100 duration-300 rounded-md"
        >
          <TbUser className="text-lg" />
          <p>Profile</p>
        </Link>
        <Link
          href={`/profile/${userId}/likes`}
          className="flex space-x-2 items-center p-2 m-1 hover:bg-zinc-100 duration-300 rounded-md"
        >
          <TbHeart className="text-lg" />
          <p>Likes</p>
        </Link>
        <Link
          href="/settings"
          className="flex space-x-2 items-center p-2 m-1 hover:bg-zinc-100 duration-300 rounded-md"
        >
          <TbSettings className="text-lg" />
          <p>Settings</p>
        </Link>
      </div>
      <div className="font-normal text-sm flex flex-col bg-white rounded-b-md">
        <button
          onClick={() => signOut()}
          className="flex space-x-2 items-center p-2 m-1 hover:bg-zinc-100 duration-300 rounded-md"
        >
          <TbArrowBarRight className="text-lg" />
          <p>Sign Out</p>
        </button>
      </div>
    </div>
  );
}
