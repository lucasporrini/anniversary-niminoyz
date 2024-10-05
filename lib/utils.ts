import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TimeLeft } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateTimeLeft = (targetDate: string): TimeLeft | null => {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const difference = target - now;

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    return null;
  }
};

export const convertDate = (date: string): TimeLeft => {
  const target = new Date(date).getTime();
  const now = new Date().getTime();
  const difference = target - now;

  return {
    days:
      Math.floor(difference / (1000 * 60 * 60 * 24)) > 0
        ? Math.floor(difference / (1000 * 60 * 60 * 24))
        : 0,
    hours:
      Math.floor((difference / (1000 * 60 * 60)) % 24) > 0
        ? Math.floor((difference / (1000 * 60 * 60)) % 24)
        : 0,
    minutes:
      Math.floor((difference / 1000 / 60) % 60) > 0
        ? Math.floor((difference / 1000 / 60) % 60)
        : 0,
    seconds:
      Math.floor((difference / 1000) % 60) > 0
        ? Math.floor((difference / 1000) % 60)
        : 0,
  };
};

export const haveAllValuesToZero = (
  timeLeft: TimeLeft | null,
  except?: keyof TimeLeft
): boolean => {
  if (!timeLeft) {
    return false;
  }

  if (except) {
    if (except === "days" && timeLeft.days > 0) {
      return false;
    }

    if (except === "hours" && timeLeft.hours > 0) {
      return false;
    }

    if (except === "minutes" && timeLeft.minutes > 0) {
      return false;
    }

    if (except === "seconds" && timeLeft.seconds > 0) {
      return false;
    }
  }

  if (
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0
  ) {
    return false;
  }

  return true;
};
