import { Clue } from "@/lib/types";

const ClueDescription = ({ description }: Pick<Clue, "description">) => {
  return <span>{description}</span>;
};

export default ClueDescription;
