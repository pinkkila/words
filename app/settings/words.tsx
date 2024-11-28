import { Text, View, StyleSheet, FlatList } from "react-native";
import { useWords } from "@/hooks/useWords";

export default function Words() {
  const {words, handleDelete } = useWords();

  return (
    <View style={styles.mainView}>
      <Text style={styles.text}>Words</Text>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.text}>{item.english}</Text>
            <Text style={styles.text}>{item.finnish} </Text>
            <Text
              style={{ color: "#0000ff" }}
              onPress={() => handleDelete(item.id)}
            >
              Delete
            </Text>
          </View>
        )}
        data={words}
      />
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
  itemContainer: {
    flexDirection: "row",
    margin: 5,
  },
});
