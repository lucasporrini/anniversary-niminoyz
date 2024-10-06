"use client";
import Quiz from "@/components/quiz";
import ClueCard from "@/components/ui/clue-card";
import data from "@/lib/data/clues.json";
import { Clue } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  useEffect(() => {
    const storedQuizCompleted =
      window.localStorage.getItem("quizCompleted") === "true";
    console.log(storedQuizCompleted);
    setQuizCompleted(storedQuizCompleted);
  }, []);

  const datas = data as Clue[];

  return (
    <div className="relative">
      {!quizCompleted && <Quiz />}
      <div className="py-6 px-4 space-y-2">
        <h1 className="text-xl font-bold text-center">Page d&apos;indices</h1>
        <p>
          Mon minimoyz, si tu es arrivée ici c&apos;est que tu as réussi à
          passer la première étape, celle des questions.
        </p>
        <p>
          Désormais, tu vas devoir attendre chaques comptes à rebours pour
          découvrir (ou pas) la <strong>destination secrète</strong> de notre
          week-end
        </p>
        <p>
          Prends des notes, réfléchis, prends ton temps et surtout ne cède pas à
          la panique parce que dans tous les cas le voyage n&poas;aura lieu que
          le
          <strong> samedi 7 octobre à 7h00</strong>. Une fois le periple entamé,
          tu pourras et seulement le moment venu, découvrir{" "}
          <strong>l&apos;ultime indice</strong>
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-2 gap-4 p-4">
        {datas.map((clue, index) => (
          <ClueCard key={index} {...clue} />
        ))}
      </div>
    </div>
  );
}
