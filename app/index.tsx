import { View, StyleSheet, Pressable, Text } from "react-native";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";

export default function Index() {
  const navigateGame = () => {
    router.push("/game");
  };
  const navigateSettings = () => {
    router.push("/settings");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressSymbol} onPress={navigateSettings}>
        <SymbolView name="gear" style={styles.symbol} type="multicolor" />
      </Pressable>
      <Pressable style={styles.pressBtn} onPress={navigateGame}>
        <Text style={styles.text}>Start</Text>
      </Pressable>
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
