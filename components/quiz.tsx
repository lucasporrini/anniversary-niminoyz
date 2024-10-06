import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import questions from "@/lib/data/quiz.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showIndice, setShowIndice] = useState(false);
  const [showError, setShowError] = useState(false);

  const formSchema = z.object({
    answer: z
      .string()
      .nonempty("Avant de valider ta réponse il faut la remplir 😅"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem("quizCompleted");
    if (saved) {
      setCompleted(true);
    } else {
      const savedProgress = localStorage.getItem("quizProgress");
      if (savedProgress) {
        setCurrentQuestion(parseInt(savedProgress, 10));
      }
    }
  }, [
    form.setValue,
    form.reset,
    form.getValues,
    form.setValue,
    form.clearErrors,
    form,
  ]);

  const handleSubmit = (data: { answer: string }) => {
    const correctAnswer = questions[currentQuestion].answer.toLowerCase();
    const userAnswer = data.answer.toLowerCase();

    if (userAnswer === correctAnswer) {
      setAttempts(0); // Réinitialiser le compteur des tentatives
      setShowIndice(false); // Masquer l'indice pour la prochaine question

      if (currentQuestion === questions.length - 1) {
        // Toutes les questions ont été répondues
        localStorage.setItem("quizCompleted", "true");
        setCompleted(true);
      } else {
        // Passer à la question suivante et sauvegarder la progression
        const nextQuestion = currentQuestion + 1;
        setCurrentQuestion(nextQuestion);
        localStorage.setItem("quizProgress", nextQuestion.toString());
        form.reset(); // Réinitialiser l'input pour la prochaine question
      }
    } else {
      setShowError(true); // Afficher un message d'erreur
      setTimeout(() => setShowError(false), 3000); // Masquer le message d'erreur après 3 secondes
      form.reset(); // Réinitialiser l'input
      setAttempts(attempts + 1); // Incrémenter le nombre de tentatives incorrectes
      if (attempts + 1 >= 5) {
        setShowIndice(true); // Afficher l'indice après 5 tentatives
      }
    }
  };

  if (completed) return null;

  return (
    <div className="fixed top-0 left-0 h-screen w-screen z-50 bg-white flex flex-col items-center justify-center space-y-8">
      <p className="text-xl font-bold w-[calc(100%-2rem)] max-w-md">
        {questions[currentQuestion].question}
      </p>

      {showIndice && (
        <p className="text-md text-gray-500">
          Indice: {questions[currentQuestion].indice}
        </p>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 w-[calc(100%-2rem)] max-w-md"
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Ici tu dois mettre ta réponse si tu n'avais pas compris 🤪"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {showError && (
                  <span className="text-sm font-medium text-destructive">
                    Mauvaise réponse, réessaye !
                  </span>
                )}
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-auto">
            Valider ma réponse
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Quiz;
