import {
  UserExtended,
  UserExtendedReviews,
} from "./types";

export const formatCompactNumber = (num: number) => {
  if (num < 1000) {
    return num;
  } else if (num >= 1000 && num < 1_000_000) {
    return (num / 1000).toFixed(1) + "K";
  } else if (num >= 1_000_000 && num < 1_000_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  } else if (num >= 1_000_000_000 && num < 1_000_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + "B";
  } else if (num >= 1_000_000_000_000 && num < 1_000_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(1) + "T";
  }
};

export const formatName = (name: string, max: number) => {
  if (name.length > max) {
    return `${name.substring(0, max)}...`;
  } else {
    return name;
  }
};

export const getUser = async (id: string): Promise<UserExtended> => {
  const res = await fetch(`/api/user?id=${id}`);
  const data = await res.json();
  return data;
};

export const getUserReviews = async (id: string): Promise<UserExtendedReviews> => {
  const res = await fetch(`/api/user/reviews?id=${id}`)
  const data = await res.json()
  return data
}

export const getAccessToken = async () => {
  const res = await fetch("/api/access-token", {
    method: "POST",
  });
  const data = await res.json();
  return data.access_token;
};