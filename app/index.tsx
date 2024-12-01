import { View, StyleSheet, Pressable, Text } from "react-native";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useWords } from "@/hooks/useWords";

export default function Index() {
  const { words } = useWords();

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
        <Text style={styles.text}>You don't have enough words. Please import some words.</Text>
      ) : (
        <Pressable
          style={({pressed}) => [styles.pressBtn, pressed && {opacity: 0.8, backgroundColor: "lightskyblue"}]}
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
    right: 10,
  },
  pressBtn: {
    borderRadius: 20,
    padding: 20,
    height: 80,
    width: 200,
    backgroundColor: "grey",
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700",
    color: "white",
  },
  symbol: {
    width: 60,
    height: 60,
    margin: 5,
  },
});
