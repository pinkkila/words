import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

type EditWordProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function EditWord({setModalOpen}: EditWordProps) {
  const [text, setText] = useState("");

  return (
    <View style={styles.modal}>
      <Text>Modal</Text>
      <TextInput
        placeholder="Enter some text"
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <Pressable onPress={() => setModalOpen(false)}>
        <Text>Save changes</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    width: "100%",
    position: "absolute",
    padding: 16,
  },
});
