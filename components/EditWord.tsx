import { useWords } from "@/hooks/useWords";
import { TWord } from "@/lib/types";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

type EditWordProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  word: TWord | null;
};

export default function EditWord({ setModalOpen, word }: EditWordProps) {
  const {handleEditWord} = useWords();
  const [editedWord, setEditedWord] = useState<TWord | null>(word);

  const handleChangeEnglish = (e: string) => {
    if (editedWord) {
      setEditedWord({ ...editedWord, english: e });
    } else {
      console.error("Word is null.");
    }
  };

  const handleChangeFinnish = (e: string) => {
    if (editedWord) {
      setEditedWord({ ...editedWord, finnish: e });
    } else {
      console.error("Word is null.");
    }
  };

  const handleResetCorrectAndWrong = () => {
    if (editedWord) {
      setEditedWord({ ...editedWord, correct: 0, wrong: 0});
    } else {
      console.error("Word is null.");
    }
  }

  const handleSaveChanges = () => {
    if (editedWord) {
      handleEditWord(editedWord);
    } else {
      console.error("Fail when saving edited word.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Word</Text>
      <Text>English</Text>
      <TextInput
        style={styles.input}
        value={editedWord?.english}
        onChangeText={handleChangeEnglish}
      />
      <Text>Finnish</Text>
      <TextInput
        style={styles.input}
        value={editedWord?.finnish}
        onChangeText={handleChangeFinnish}
      />
      <Pressable onPress={handleResetCorrectAndWrong}>
        <Text>Reset correct and wrong</Text>
      </Pressable>
      <Pressable onPress={handleSaveChanges}>
        <Text>Save Changes</Text>
      </Pressable>
      <Pressable onPress={() => setModalOpen(false)}>
        <Text>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    position: "absolute",
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginBottom: 12,
    fontSize: 16,
  },
});
