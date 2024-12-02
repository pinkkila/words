import { useWords } from "@/hooks/useWords";
import { TWord } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";

export default function Game() {
  const { words, handleCorrectOrWrong } = useWords();
  const [ownWordsPlay, setOwnWordsPlay] = useState<TWord[] | null>([]);
  const [correctWord, setCorrectWord] = useState<TWord | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);

  useEffect(() => {
    prepareOneRound();
  }, []);

  const getRandomIndexes = (howMany: number) => {
    if (!words || words.length < howMany) {
      throw new Error(`The words must have at least ${howMany} words`);
    }
    const indexes: Set<number> = new Set();
    while (indexes.size < howMany) {
      const randomIndex = Math.floor(Math.random() * words.length);
      indexes.add(randomIndex);
    }
    return Array.from(indexes);
  };

  const prepareOneRound = () => {
    if (!words) return;
    setShowFeedback(false);
    setSelectedWordId(null);
    const randomIndexes = getRandomIndexes(3);
    setCorrectWord(
      words[randomIndexes[Math.floor(Math.random() * randomIndexes.length)]]
    );
    setOwnWordsPlay(randomIndexes.map((r) => words[r]));
  };

  const checkIfCorrect = (id: number) => {
    if (!correctWord) return;
    setShowFeedback(true);
    setSelectedWordId(id);
    if (id === correctWord?.id) {
      handleCorrectOrWrong(correctWord.id, 1);
    } else {
      handleCorrectOrWrong(correctWord?.id, -1);
    }
    setTimeout(() => {
      prepareOneRound();
    }, 1000);
  };

  const getBtnStyle = (id: number) => {
    if (!showFeedback) 
      return styles.basicBtn;

    if (id === correctWord?.id) 
      return styles.correct;

    if (id === selectedWordId && selectedWordId !== correctWord?.id)
      return styles.wrong;

    return styles.basicBtn;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textBig}>{correctWord?.english}</Text>
      {ownWordsPlay?.map((word) => (
        <Pressable
          key={word.id}
          style={() => getBtnStyle(word.id)}
          onPress={() => checkIfCorrect(word.id)}
          disabled={showFeedback}
        >
          <Text style={styles.text}>{word.finnish}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textBig: {
    fontSize: 40,
    fontWeight: "600",
    color: "white",
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  basicBtn: {
    borderRadius: 20,
    margin: 30,
    padding: 20,
    height: 80,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  correct: {
    borderRadius: 20,
    margin: 30,
    padding: 20,
    height: 80,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  wrong: {
    borderRadius: 20,
    margin: 30,
    padding: 20,
    height: 80,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});
