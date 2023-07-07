import { ImageResponse } from "next/server";
import { TbPlayerTrackNextFilled } from "react-icons/tb";

export const runtime = "edge"

export const size = {
  width: 32,
  height: 32
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <TbPlayerTrackNextFilled className="text-2xl"/>
  )
}