import { WordsContext } from "@/contexts/words-context";
import { useContext } from "react";

export function useItemsContext() {
  const contexts = useContext(WordsContext);

  if (!contexts) {
    throw new Error(
      "useWordsContext must be used within a WordsContextProvider"
    );
  }

  return contexts;
}
