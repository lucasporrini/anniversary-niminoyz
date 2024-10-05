"use client";
import { TimeLeft } from "@/lib/types";
import { calculateTimeLeft } from "@/lib/utils";
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
      {timeLeft.days > 0 && <div>{timeLeft.days} jours</div>}
      {timeLeft.hours > 0 && <div>{timeLeft.hours} heures</div>}
      {timeLeft.minutes > 0 && <div>{timeLeft.minutes} minutes</div>}
      <div>
        {timeLeft.seconds} {timeLeft.seconds > 0 ? "secondes" : "seconde"}
      </div>
    </div>
  );
};

export default CountdownTimer;
