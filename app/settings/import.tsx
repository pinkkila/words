import { Text, View, StyleSheet } from "react-native";

export default function Import() {
  return (
    <View style={styles.mainView}>
      <Text style={styles.test}>Import</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  test: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: "white",
  },
});
