import { useWords } from "@/hooks/useWords";
import { generateWordOptions } from "@/lib/openai-service";
import { TGptWordsPlay, TWord } from "@/lib/types";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function OpenAiGame() {
  const { words, handleCorrectOrWrong } = useWords();
  const [wordForPlay, setWordForPlay] = useState<TWord | null>(null);
  const [correctId, setCorrectId] = useState<number | null>(null);
  const [gptWordsPlay, setGptWordsPlay] = useState<TGptWordsPlay[] | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);

  useEffect(() => {
    prepareOneRound();
  }, []);

  const prepareOneRound = async () => {
    if (!words) return;
    setShowFeedback(false);
    setSelectedWordId(null);

    const randomlySelectedWord = words[Math.floor(Math.random() * words.length)]
    setWordForPlay(randomlySelectedWord);
    const gptResponse = await generateWordOptions(randomlySelectedWord.english);

    const gptWords = gptResponse.split(",").map((w, index) => ({id: index, finnish: w}))
    setCorrectId(gptWords[0].id);

    const shuffle = gptWords.sort(() => Math.random() - 0.5);
    setGptWordsPlay(shuffle);

  };

  const checkIfCorrect = (id: number) => {
    setShowFeedback(true);
    setSelectedWordId(id);
    if (id === correctId) {
      handleCorrectOrWrong(id, 1);
    } else {
      handleCorrectOrWrong(id, -1);
    }
    setTimeout(() => {
      prepareOneRound();
    }, 1000);
  };

  const getBtnStyle = (id: number) => {
    if (!showFeedback) return styles.basicBtn;

    if (id === correctId) return styles.correct;

    if (id === selectedWordId && selectedWordId !== correctId)
      return styles.wrong;

    return styles.basicBtn;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textBig}>{wordForPlay?.english}</Text>
      {gptWordsPlay?.map((word) => (
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

  pressBtn: {
    borderRadius: 20,
    padding: 20,
    height: 80,
    width: 200,
    backgroundColor: "grey",
  },
});
