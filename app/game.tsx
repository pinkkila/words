import { useWords } from "@/hooks/useWords";
import { TWord } from "@/lib/types";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function Game() {
  const { words, handleCorrectOrWrong } = useWords();
  const [ownWordsPlay, setOwnWordsPlay] = useState<TWord[] | null>([]);
  const [correctWord, setCorrectWord] = useState<TWord | null>(null);

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

    const randomIndexes = getRandomIndexes(3);

    setCorrectWord(
      words[randomIndexes[Math.floor(Math.random() * randomIndexes.length)]]
    );
    setOwnWordsPlay(randomIndexes.map((r) => words[r]));
  };

  const checkIfCorrect = (pressedWord: TWord) => {
    if (pressedWord.english === correctWord?.english) {
      console.log("correct");
      handleCorrectOrWrong(pressedWord.id, 1);
    } else {
      console.log("wrong");
      handleCorrectOrWrong(pressedWord.id, -1);
    }

    prepareOneRound()
  };

  return (
    <View style={styles.container}>
      {!ownWordsPlay || ownWordsPlay.length === 0 ? (<Text>Loading...</Text>) : (
        <>
          <Text style={styles.text}>{correctWord?.english}</Text>
          <Pressable style={styles.pressBtn} onPress={() => checkIfCorrect(ownWordsPlay[0])}>
            <Text style={styles.text}>{ownWordsPlay[0].finnish}</Text>
          </Pressable>
          <Pressable style={styles.pressBtn} onPress={() => checkIfCorrect(ownWordsPlay[1])}>
            <Text style={styles.text}>{ownWordsPlay[1].finnish}</Text>
          </Pressable>
          <Pressable style={styles.pressBtn} onPress={() => checkIfCorrect(ownWordsPlay[2])}>
            <Text style={styles.text}>{ownWordsPlay[2].finnish}</Text>
          </Pressable>
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
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: "white",
  },
  pressBtn: {
    borderRadius: 20,
    margin: 30,
    padding: 20,
    height: 80,
    width: 200,
    backgroundColor: "grey",
  },
});
