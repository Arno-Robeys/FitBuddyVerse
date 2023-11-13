import { Button } from "@/components/Button";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
	return (
		<View className="flex bg-white items-center justify-center h-full">
			<Text>Open up App.tsx to start working on your app!!!</Text>
			<StatusBar style="auto" />
			<Button label="Hello"></Button>
		</View>
	); 
}
