"use client";
import CountdownTimer from "@/components/countdown";
import ClueCard from "@/components/ui/clue-card";
import { RainbowButton } from "@/components/ui/rainbow-button";
import data from "@/lib/data/clues.json";

export default function Home() {
  return (
    <div>
      <CountdownTimer targetDate="2024-12-31T00:00:00Z" />
      <RainbowButton>Click me</RainbowButton>
      <div className="container mx-auto grid grid-cols-3 gap-10">
        {data.map((clue, index) => (
          <ClueCard key={index} {...clue} />
        ))}
      </div>
    </div>
  );
}
