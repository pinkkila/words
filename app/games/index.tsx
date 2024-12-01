import { Text, StyleSheet } from "react-native";

export default function Index() {
  return(
    <Text style={styles.text} >valitse game</Text>
  )
}

const styles = StyleSheet.create({
text: {
  textAlign: "center",
  fontSize: 30,
  fontWeight: "700",
  color: "white",
},
})