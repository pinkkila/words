import { View, StyleSheet, Pressable, Text, Switch } from "react-native";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useWords } from "@/hooks/useWords";
import { useState } from "react";

export default function Index() {
  const { words } = useWords();
  const [gptEnabled, setGptEnabled] = useState(false);

  const toggleSwitch = () => setGptEnabled((previousState) => !previousState);

  const navigateGame = () => {
    router.push("/games");
  };

  const navigateSettings = () => {
    router.push("/settings");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressSymbol} onPress={navigateSettings}>
        <SymbolView name="gear" style={styles.symbol} type="multicolor" />
      </Pressable>
      {!words || words.length < 4 ? (
        <Text style={styles.text}>
          You don't have enough words. Please import some words.
        </Text>
      ) : (
        <Pressable
          style={({ pressed }) => [
            styles.btn,
            pressed && { opacity: 0.9, backgroundColor: "#009cb3" },
          ]}
          onPress={navigateGame}
          disabled={!words}
        >
          <Text style={styles.text}>Start</Text>
        </Pressable>
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
  pressSymbol: {
    position: "absolute",
    top: 10,
    right: 13,
  },
  symbol: {
    width: 60,
    height: 60,
    margin: 5,
  },
  btn: {
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
  text: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700",
    color: "white",
  },
});
