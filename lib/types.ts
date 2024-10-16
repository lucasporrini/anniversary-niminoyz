export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type Clue = {
  title: string;
  description: string;
  releaseDate: string;
};

export type Question = {
  question: string;
  answer: string;
  indice: string;
};
