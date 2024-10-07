"use client";
import { Clue, TimeLeft } from "@/lib/types";
import { convertDate, haveAllValuesToZero } from "@/lib/utils";
import { useEffect, useState } from "react";
import CountdownTimer from "../countdown";
import ClueDescription from "../description";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

const ClueCard = ({ title, description, type, releaseDate }: Clue) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(convertDate(releaseDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [releaseDate]);

  return (
    <Card
      className={`min-w-48 h-60 border ${
        timeLeft &&
        timeLeft.days < 1 &&
        timeLeft.hours < 1 &&
        haveAllValuesToZero(timeLeft, "hours")
          ? "border-red-500 animate-pulse"
          : ""
      }
      `}
    >
      {timeLeft?.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0 && (
          <CardHeader>
            <CardTitle className="text-lg">{title}</CardTitle>
          </CardHeader>
        )}

      <CardContent className="flex items-center justify-center text-center">
        {timeLeft?.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0 ? (
          <ClueDescription description={description} type={type} />
        ) : (
          <CountdownTimer targetDate={releaseDate} />
        )}
      </CardContent>
    </Card>
  );
};

export default ClueCard;
