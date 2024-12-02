import { View, StyleSheet, Pressable, Text, Switch } from "react-native";
import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useWords } from "@/hooks/useWords";
import { useState } from "react";

export default function Index() {
  const { saveToDb } = useWords();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const navigateWords = () => {
    router.push("/settings/words");
  };

  const importCsv = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync();
      if (docRes.canceled) {
        console.log("File import was cancelled");
        return;
      }
      const fileUri = docRes.assets[0].uri;
      const fileData = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      const rows = fileData.split("\n").map((row) => row.split(",").slice(-2));
      rows.forEach((row) => saveToDb(row[0], row[1]));
    } catch (error) {
      console.error("Error while selecting file: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.gptContainer}>
        <Text style={styles.textGpt}>ChatGPT</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Pressable style={styles.pressBtn} onPress={navigateWords}>
        <Text style={styles.text}>Your Words</Text>
      </Pressable>
      <Pressable style={styles.pressBtn} onPress={importCsv}>
        <Text style={styles.text}>Import</Text>
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
  gptContainer: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  pressBtn: {
    borderRadius: 20,
    margin: 30,
    padding: 20,
    height: 80,
    width: 220,
    backgroundColor: "#1e1e1e",
    borderWidth: 2,
    borderColor: "#00f7ff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#00f7ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700",
    color: "white",
  },
  textGpt: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700",
    color: "white",
    marginRight: 30
  },
});
