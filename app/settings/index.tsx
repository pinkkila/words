import { View, StyleSheet, Pressable, Text } from "react-native";
import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

export default function Index() {
  const navigateWords = () => {
    router.push("/settings/words");
  };

  const pickCsv = async () => {
    // router.push("/settings/import");

    try {
      const docRes = await DocumentPicker.getDocumentAsync();

      if (docRes.canceled) {
        console.log("File import failed");
        return;
      }

      const fileUri = docRes.assets[0].uri;

      const fileData = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      console.log(fileData);

    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };

  return (
    <View style={styles.mainView}>
      <Pressable style={styles.pressBtn} onPress={navigateWords}>
        <Text style={styles.text}>Your Words</Text>
      </Pressable>
      <Pressable style={styles.pressBtn} onPress={pickCsv}>
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
  },
});
