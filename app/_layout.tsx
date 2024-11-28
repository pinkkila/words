import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SQLiteProvider } from "expo-sqlite";
import * as SQLite from 'expo-sqlite';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const initialize = async (db: SQLite.SQLiteDatabase) => {
    db.runAsync(`
      CREATE TABLE IF NOT EXISTS word (id INTEGER PRIMARY KEY NOT NULL, english TEXT NOT NULL, finnish TEXT NOT NULL, correct INTEGER NOT NULL, wrong INTEGER NOT NULL);
      `);
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SQLiteProvider
        databaseName="wordgame.db"
        onInit={initialize}
        onError={(error) => console.error("Could not open database", error)}
      >
        <Stack>
          <Stack.Screen name="index" options={{ headerTitle: "" }} />
          <Stack.Screen name="game" options={{ headerTitle: "" }} />
          <Stack.Screen
            name="settings/index"
            options={{ headerTitle: "Settings" }}
          />
          <Stack.Screen
            name="settings/words"
            options={{ headerTitle: "Your Words" }}
          />
        </Stack>
      </SQLiteProvider>
    </ThemeProvider>
  );
}
