import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const multiFormatDateString = (timestamp = "") => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date = new Date(timestampNum * 1000);
  const now = new Date();

  const diff = now.getTime() - date.getTime();
  const diffInSeconds = diff / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;
  const diffInMonths = diffInDays / 30;
  const diffInYears = diffInDays / 365;

  switch (true) {
    case Math.floor(diffInYears) >= 2:
      return `${Math.floor(diffInYears)} years ago`;
    case Math.floor(diffInYears) === 1:
      return "Last year";
    case Math.floor(diffInMonths) >= 1:
      return `${Math.floor(diffInMonths)} months ago`;
    case Math.floor(diffInDays) >= 30:
      return "Last month";
    case Math.floor(diffInDays) === 1:
      return "Yesterday";
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} days ago`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return "Just now";
  }
};

export const commentmultiFormatDateString = (timestamp = "") => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date = new Date(timestampNum * 1000);
  const now = new Date();

  const diff = now.getTime() - date.getTime();
  const diffInSeconds = diff / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;
  const diffInMonths = diffInDays / 30;
  const diffInYears = diffInDays / 365;

  switch (true) {
    case Math.floor(diffInDays) >= 8:
      return `${Math.floor(diffInYears)}w`
    case Math.floor(diffInDays) === 1:
      return "1d";
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)}d`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)}h`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)}m`;
    case Math.floor(diffInSeconds) < 60:
      return `${Math.floor(diffInMinutes)}s`;  
      
    default:
      return "1s";
  }
};
export const storymultiFormatDateString = (timestamp = "") => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date = new Date(timestampNum * 1000);
  const now = new Date();

  const diff = now.getTime() - date.getTime();
  const diffInSeconds = diff / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;
 

  switch (true) {
    case Math.floor(diffInDays) === 1:
      return "1d";
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)}d`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)}h`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)}m`;
    case Math.floor(diffInSeconds) < 60:
      return `${Math.floor(diffInMinutes)}s`;  
      
    default:
      return "1s";
  }
};


export const checkIsLiked = (likeList, userId) => {
  return likeList.includes(userId);
};