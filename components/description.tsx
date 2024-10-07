import { Clue } from "@/lib/types";
import Image from "next/image";

const ClueDescription = ({
  description,
  type,
}: Pick<Clue, "type" | "description">) => {
  if (type === "text") {
    return <span>{description}</span>;
  }

  if (type === "image") {
    return (
      <Image
        src={description}
        width={200}
        height={200}
        className="w-fit"
        alt="clue"
      />
    );
  }
};

export default ClueDescription;
