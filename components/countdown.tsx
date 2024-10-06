"use client";
import { TimeLeft } from "@/lib/types";
import { calculateTimeLeft } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src="/cat.png" width={200} height={200} alt="cat" />
      {timeLeft.days > 1 && (
        <span className="text-center">Encore quelques jours</span>
      )}
      {timeLeft.days === 1 && (
        <span className="text-center">Plus qu&apos;un jour</span>
      )}
      {timeLeft.days <= 0 && (
        <div className="text-lg font-bold">
          {timeLeft.hours > 0 ? (
            timeLeft.hours < 10 ? (
              <span>0{timeLeft.hours}:</span>
            ) : (
              <span>{timeLeft.hours}:</span>
            )
          ) : (
            ""
          )}
          {timeLeft.minutes > 0 ? (
            timeLeft.minutes < 10 ? (
              <span>0{timeLeft.minutes}:</span>
            ) : (
              <span>{timeLeft.minutes}:</span>
            )
          ) : (
            <span>00:</span>
          )}
          <span>
            {timeLeft.seconds < 10 && timeLeft.seconds >= 0
              ? `0${timeLeft.seconds}`
              : timeLeft.seconds}
          </span>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
