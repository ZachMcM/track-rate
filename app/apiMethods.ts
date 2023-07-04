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

// Need to move

// export const getRating = async (itemId: string): Promise<Rating> => {
//   const res = await fetch(`/api/rating?itemId=${itemId}`);
//   const data = await res.json();
//   return data;
// };

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

// Move these to component too

// export const addComment = async (
//   reviewId: string,
//   content: string
// ): Promise<ReviewComment> => {
//   const res = await fetch(
//     `/api/comment?reviewId=${reviewId}&content=${content}`,
//     {
//       method: "POST",
//     }
//   );
//   const data = await res.json();
//   return data;
// };

// export const deleteComment = async (id: string): Promise<ReviewComment> => {
//   const res = await fetch(`/api/comment?id=${id}`, {
//     method: "DELETE",
//   });
//   const data = await res.json();
//   return data;
// };

// export const getComment = async (commentId: string): Promise<ExtendedComment> => {
//   const res = await fetch(`/api/comment?id=${commentId}`);
//   const data = await res.json();
//   return data;
// };

export const getAccessToken = async () => {
  const res = await fetch("/api/access-token", {
    method: "POST",
  });
  const data = await res.json();
  return data.access_token;
};

// Don't need these seperate functions move them to the actual components in future

// export const getAlbum = async (
//   id: string,
//   accessToken: string
// ): Promise<Album> => {
//   const res = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
//   const data = await res.json();
//   return data;
// };

// export const getTrack = async (
//   id: string,
//   accessToken: string
// ): Promise<Track> => {
//   const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
//   const data = await res.json();
//   return data;
// };

// export const getArtist = async (
//   id: string,
//   accessToken: string
// ): Promise<Artist> => {
//   const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
//   const data = await res.json();
//   return data;
// };
