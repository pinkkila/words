import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import { useWords } from "@/hooks/useWords";
import { SymbolView } from "expo-symbols";

export default function Words() {
  const { words, handleDelete } = useWords();

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.wordText}>{item.english}</Text>
              <Text style={styles.wordText}>{item.finnish}</Text>
            </View>

            <View style={styles.itemBottom}>
              <View style={styles.itemDetails}>
                <Text style={styles.text}>Correct: {item.correct}</Text>
                <Text style={styles.text}>Wrong: {item.wrong}</Text>
              </View>

              <Text
                style={styles.updateText}
                onPress={() => handleDelete(item.id)}
              >
                Update
              </Text>

              <Pressable style={styles.deleteSymbolPosition} onPress={() => handleDelete(item.id)}>
                <SymbolView
                  name="trash"
                  style={styles.deleteSymbol}
                  type="multicolor"
                />
              </Pressable>
            </View>
          </View>
        )}
        data={words}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  itemContainer: {
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
  },

  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  itemBottom: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  itemDetails: {
    marginTop: 5,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  deleteSymbolPosition: {
    alignSelf: "flex-end",
  },

  wordText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  updateText: {
    color: "#ff4d4d",
    fontWeight: "bold",
    marginTop: 10,
    alignSelf: "flex-end",
  },
  deleteSymbol: {
    width: 33,
    height: 33,
  }
});
