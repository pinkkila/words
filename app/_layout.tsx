import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerTitle: "Home Page"}} />
      <Stack.Screen name="settings" options={{headerTitle: "Settings"}} />
    </Stack>
  );
}
