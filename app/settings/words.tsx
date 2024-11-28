import { Text, View, StyleSheet, FlatList } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

type TWord = {
  id: number;
  english: string;
  finnish: string;
  correct: number;
  wrong: number;
};

export default function Words() {
  const db = useSQLiteContext();
  const [words, setWords] = useState<null | TWord[]>([]);

  useEffect(() => {
    getWordsFromDb()
  }, []);

  const getWordsFromDb = async () => {
    try {
      const wordsFormDb = await db.getAllAsync<TWord>("SELECT * from word;");
      setWords(wordsFormDb);
    } catch (error) {
      console.error("Fail when getting words from db");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await db.runAsync('DELETE FROM word WHERE id=?', id);
      await getWordsFromDb();
    }
    catch (error) {
      console.error('Fail when deleting word', error);
    }
  }

  return (
    <View style={styles.mainView}>
      <Text style={styles.text}>Words</Text>
      <FlatList
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
          <View style={styles.itemContainer}>
            <Text style={styles.text}>{item.english}</Text>
            <Text style={styles.text} >{item.finnish} </Text>
            <Text style={{ color: '#0000ff' }} onPress={() => handleDelete(item.id)}>Delete</Text>
          </View>}
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
