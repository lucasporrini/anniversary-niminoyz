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
    <div className="flex flex-col items-center justify-center">
      <Image src="/cat.png" width={200} height={200} alt="cat" />
      {timeLeft.days > 1 && <span>En quelques jours</span>}
      {timeLeft.days === 1 && <span>Plus qu&apos;un jour</span>}
      {timeLeft.hours > 0 && <span>{timeLeft.hours} heures</span>}
      <div className="text-lg font-bold">
        {timeLeft.minutes > 0 ? (
          <span>{timeLeft.minutes}:</span>
        ) : (
          <span>00:</span>
        )}
        <span>
          {timeLeft.seconds < 10 && timeLeft.seconds >= 0
            ? `0${timeLeft.seconds}`
            : timeLeft.seconds}
        </span>
      </div>
    </div>
  );
};

export default CountdownTimer;
