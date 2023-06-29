import { Like, ReviewComment, User } from "@prisma/client";
import {
  Album,
  Artist,
  FullComment,
  FullReview,
  FullUser,
  NewReviewParams,
  SimplifiedAlbum,
  Track,
} from "./types";

export const getScore = async (itemId: string): Promise<number> => {
  const res = await fetch(`/api/score?itemId=${itemId}`) 
  const data = await res.json()
  return data
}

export const getUser = async (id: string): Promise<FullUser> => {
  const res = await fetch(`/api/user?id=${id}`);
  const data = await res.json();
  return data;
};

export const updateProfile = async (
  body: {
    bio: string;
    name: string;
    spotifyUsername: string
  }
) => {
  const res = await fetch(`/api/user/profile`, {
    method: "PUT",
    body: JSON.stringify(body)
  })
  const data = await res.json()
  return data
};

export const updateFavorites = async (
  body: {
    favAlbum: string;
    favArtist: string;
    favTrack: string
  }
) => {
  const res = await fetch(`/api/user/favorites`, {
    method: "PUT",
    body: JSON.stringify(body)
  })
  const data = await res.json()
  return data
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

export const addReview = async (newReviewParams: NewReviewParams) => {
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
  const res = await fetch(`/api/comment?id=${commentId}`)
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

export const getTrackList = async (
  query: string,
  accessToken: string
): Promise<Track[]> => {
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=track:${query.replace(/[^\w\s]/gi, '')}&type=track`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.json();
  return data.tracks.items;
};

export const getArtistList = async (
  query: string,
  accessToken: string
): Promise<Artist[]> => {
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=artist:${query.replace(/[^\w\s]/gi, '')}&type=artist`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.json();
  return data.artists.items;
};

export const getAlbumList = async (
  query: string,
  accessToken: string
): Promise<SimplifiedAlbum[]> => {
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=album:${query.replace(/[^\w\s]/gi, '')}&type=album`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.json();
  return data.albums.items;
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
