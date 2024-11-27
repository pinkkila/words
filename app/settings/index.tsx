import { View, StyleSheet, Pressable, Text } from "react-native";
import { router } from "expo-router";

export default function Index() {
  const navigateWords = () => {
    router.push("/settings/words");
  };
  const navigateImport = () => {
    router.push("/settings/import");
  };

  return (
    <View style={styles.mainView}>
      <Pressable style={styles.pressBtn} onPress={navigateWords}>
        <Text style={styles.text}>Your Words</Text>
      </Pressable>
      <Pressable style={styles.pressBtn} onPress={navigateImport}>
        <Text style={styles.text}>Import</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
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
    margin: 30,
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
  }
});
