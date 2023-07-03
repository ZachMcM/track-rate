import { Like, Review, ReviewComment, User } from "@prisma/client";
import {
  Album,
  Artist,
  FullComment,
  FullReview,
  FullUser,
  NewReviewParams,
  Rating,
  SearchResults,
  Track,
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

export const getRating = async (itemId: string): Promise<Rating> => {
  const res = await fetch(`/api/rating?itemId=${itemId}`);
  const data = await res.json();
  return data;
};

export const getUser = async (id: string): Promise<FullUser> => {
  const res = await fetch(`/api/user?id=${id}`);
  const data = await res.json();
  return data;
};

export const updateProfile = async ({bio, name, spotifyUsername, pfp}: {
  bio: string;
  name: string;
  spotifyUsername: string;
  pfp?: File
}) => {
  const formData = new FormData()

  if (pfp) {
    formData.append("avatar", pfp)
  }
  formData.append("bio", bio)
  formData.append("name", name)
  formData.append("spotifyUsername", spotifyUsername)

  const res = await fetch(`/api/user/profile`, {
    method: "PUT",
    body: formData,
  });
  const data = await res.json();
  return data;
};

export const getReview = async (id: string): Promise<FullReview> => {
  const res = await fetch(`/api/review?id=${id}`, { next: { tags: [id] } });
  const data = await res.json();
  return data;
};

export const updateFollow = async (userId: string): Promise<User> => {
  const res = await fetch(`/api/follower?userId=${userId}`, {
    method: "PATCH",
  });
  const data = await res.json();
  return data;
};

export const addReview = async (newReviewParams: NewReviewParams): Promise<Review> => {
  const res = await fetch(`/api/review`, {
    method: "POST",
    body: JSON.stringify(newReviewParams),
  });
  const data = await res.json();
  return data;
};

export const updateLike = async (reviewId: string): Promise<Like> => {
  const res = await fetch(`/api/likes?reviewId=${reviewId}`, {
    method: "PATCH",
  });
  const data = await res.json();
  return data;
};

export const addComment = async (
  reviewId: string,
  content: string
): Promise<ReviewComment> => {
  const res = await fetch(
    `/api/comment?reviewId=${reviewId}&content=${content}`,
    {
      method: "POST",
    }
  );
  const data = await res.json();
  return data;
};

export const deleteComment = async (id: string): Promise<ReviewComment> => {
  const res = await fetch(`/api/comment?id=${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};

export const getComment = async (commentId: string): Promise<FullComment> => {
  const res = await fetch(`/api/comment?id=${commentId}`);
  const data = await res.json();
  return data;
};

export const getAccessToken = async () => {
  const res = await fetch("/api/access-token", {
    method: "POST",
  });
  const data = await res.json();
  return data.access_token;
};

export const getSearchResults = async (
  input: string,
  accessToken: string
): Promise<SearchResults> => {
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

  const res = {
    albums: data.albums.items,
    tracks: data.tracks.items,
    artists: data.artists.items,
  };
  return res;
};

export const getAlbum = async (
  id: string,
  accessToken: string
): Promise<Album> => {
  const res = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  return data;
};

export const getTrack = async (
  id: string,
  accessToken: string
): Promise<Track> => {
  const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  return data;
};

export const getArtist = async (
  id: string,
  accessToken: string
): Promise<Artist> => {
  const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  return data;
};
