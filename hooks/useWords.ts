import { WordsContext } from "@/contexts/WordsContexProvider";
import { useContext } from "react";

export function useWords() {
  const contexts = useContext(WordsContext);

  if (!contexts) {
    throw new Error(
      "useWordsContext must be used within a WordsContextProvider"
    );
  }

  return contexts;
}
