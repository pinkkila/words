import { Text, View, StyleSheet, Button } from "react-native";
import { router } from 'expo-router';

export default function Index() {

  const navigateGame = () => {
    router.push("/game")
  }
  
  return (
    <View style={styles.mainView}>
      <Text style={styles.text}>dark mode is on</Text>
      <Button title="Strart learning" onPress={navigateGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
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
});
