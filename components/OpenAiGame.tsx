import { useWords } from "@/hooks/useWords";
import { generateWordOptions } from "@/lib/openai-service";
import { TGptWordsPlay, TWord } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";

export default function OpenAiGame() {
  const { words, handleCorrectOrWrong } = useWords();
  const [wordForPlay, setWordForPlay] = useState<TWord | null>(null);
  const [correctId, setCorrectId] = useState<number | null>(null);
  const [gptWordsPlay, setGptWordsPlay] = useState<TGptWordsPlay[] | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    prepareOneRound();
  }, []);

  const prepareOneRound = async () => {
    setIsLoading(true);
    if (!words) return;
    setShowFeedback(false);
    setSelectedWordId(null);

    const randomlySelectedWord =
      words[Math.floor(Math.random() * words.length)];
    setWordForPlay(randomlySelectedWord);
    const gptResponse = await generateWordOptions(randomlySelectedWord.english);

    const gptWords = gptResponse
      .split(",")
      .map((w, index) => ({ id: index, finnish: w }));
    setCorrectId(gptWords[0].id);

    const shuffle = gptWords.sort(() => Math.random() - 0.5);
    setGptWordsPlay(shuffle);
    setIsLoading(false);
  };

  const checkIfCorrect = (id: number) => {
    if (!wordForPlay) return;
    setShowFeedback(true);
    setSelectedWordId(id);
    if (id === correctId) {
      handleCorrectOrWrong(wordForPlay.id, 1);
    } else {
      handleCorrectOrWrong(wordForPlay.id, -1);
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
      {isLoading ? (
        <ActivityIndicator size="large" color="#00f7ff" />
      ) : (
        <>
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
    fontSize: 45,
    fontWeight: "600",
    color: "white",
    marginBottom: 40,
  },
  text: {
    fontSize: 25,
    fontWeight: "600",
    color: "white",
  },
  basicBtn: {
    borderRadius: 20,
    margin: 30,
    padding: 20,
    height: 80,
    width: 220,
    backgroundColor: "#1e1e1e",
    borderWidth: 2,
    borderColor: "#00f7ff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#00f7ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  correct: {
    borderRadius: 20,
    margin: 30,
    padding: 20,
    height: 80,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3bd13b",
    shadowColor: "#00ff00",
    shadowRadius: 3,
    shadowOpacity: 1,
  },
  wrong: {
    borderRadius: 20,
    margin: 30,
    padding: 20,
    height: 80,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f00",
    shadowColor: "#ff0000",
    shadowRadius: 3,
    shadowOpacity: 1,
  },
});
