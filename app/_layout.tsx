import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import WordsContextProvider from "@/contexts/WordsContexProvider";

export default function RootLayout() {
  const colorScheme = useColorScheme();


  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <WordsContextProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerTitle: "" }} />
          <Stack.Screen name="games/index" options={{ headerTitle: "" }} />
          <Stack.Screen
            name="settings/index"
            options={{ headerTitle: "Settings" }}
          />
          <Stack.Screen
            name="settings/words"
            options={{ headerTitle: "Your Words" }}
          />
        </Stack>
        </WordsContextProvider>
    </ThemeProvider>
  );
}
