"use client";
import { Clue, TimeLeft } from "@/lib/types";
import { convertDate, haveAllValuesToZero } from "@/lib/utils";
import { useEffect, useState } from "react";
import CountdownTimer from "../countdown";
import ClueDescription from "../description";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { RainbowButton } from "./rainbow-button";

const ClueCard = ({ title, description, clue, releaseDate }: Clue) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(convertDate(releaseDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [releaseDate]);

  // console.log("timeLeft: ", timeLeft);
  // console.log("haveAllValuesToZero: ", haveAllValuesToZero(timeLeft));

  return (
    <Card
      className={`min-w-48 border ${
        timeLeft && timeLeft.hours < 1 && haveAllValuesToZero(timeLeft, "hours")
          ? "border-red-500 animate-pulse"
          : ""
      }`}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="h-32">
        {timeLeft?.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0 ? (
          <ClueDescription text={description} />
        ) : (
          <CountdownTimer targetDate={releaseDate} />
        )}
      </CardContent>

      <CardFooter className="justify-center">
        <RainbowButton disabled={haveAllValuesToZero(timeLeft)}>
          Découvrir l'indice
        </RainbowButton>
      </CardFooter>
    </Card>
  );
};

export default ClueCard;
