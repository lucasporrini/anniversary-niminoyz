"use client";
import Quiz from "@/components/quiz";
import ClueCard from "@/components/ui/clue-card";
import data from "@/lib/data/clues.json";
import { useState } from "react";

export default function Home() {
  const [quizCompleted, setQuizCompleted] = useState(
    localStorage.getItem("quizCompleted") === "true"
  );

  return (
    <div className="relative">
      {!quizCompleted && <Quiz />}
      <div className="container mx-auto grid grid-cols-1 gap-4 p-4">
        {data.map((clue, index) => (
          <ClueCard key={index} {...clue} />
        ))}
      </div>
    </div>
  );
}
