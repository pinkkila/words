import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="m-auto">
      <Link href="/settings" className="text-2xl border-2 border-black p-4 rounded-md"  >Got to Settings</Link>
    </View>
  );
}
