import { useWords } from "@/hooks/useWords";
import { TWord } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
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
    setShowFeedback(false)
    setSelectedWordId(null)
    const randomIndexes = getRandomIndexes(3);
    setCorrectWord(
      words[randomIndexes[Math.floor(Math.random() * randomIndexes.length)]]
    );
    setOwnWordsPlay(randomIndexes.map((r) => words[r]));
  };

  const checkIfCorrect = (pressedWord: TWord) => {
    setShowFeedback(true);
    setSelectedWordId(pressedWord.id)
    if (pressedWord.english === correctWord?.english) {
      console.log("correct");
      handleCorrectOrWrong(pressedWord.id, 1);
    } else {
      console.log("wrong");
      handleCorrectOrWrong(pressedWord.id, -1);
    }
    setTimeout(() => {
      prepareOneRound();
    }, 1500);
  };

  const getBtnStyle = (id: number) => {
    if (!showFeedback) return styles.basicBtn;

    if (id === correctWord?.id) 
      return styles.correct

    if (id === selectedWordId && selectedWordId !== correctWord?.id)
      return styles.wrong

    return styles.basicBtn

  }

  return (
    <View style={styles.container}>
      {!ownWordsPlay || ownWordsPlay.length === 0 ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <>
          <Text style={styles.textBig}>{correctWord?.english}</Text>
          {ownWordsPlay.map((word) => (
            <Pressable
              key={word.id}
              style={() => getBtnStyle(word.id)}
              onPress={() => checkIfCorrect(word)}
              disabled={showFeedback}
            >
              <Text style={styles.text}>{word.finnish}</Text>
            </Pressable>
          ))}
        </>
      )}
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
    marginBottom: 40
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
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  correct: {
    borderRadius: 20,
    margin: 30,
    padding: 20,
    height: 80,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  wrong: {
    borderRadius: 20,
    margin: 30,
    padding: 20,
    height: 80,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});
