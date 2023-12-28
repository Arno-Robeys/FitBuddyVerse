import { Stack } from "expo-router";

export default function Root() {
	// Set up the auth context and render our layout inside of it.
	return (
		<Stack screenOptions={{ headerStyle: { backgroundColor: "#374151" }, headerTintColor: "#fff", headerTitleStyle: { fontWeight: "bold" }, }}>
			<Stack.Screen name="(app)" options={{ title: "FitBuddyVerse" }} />
			<Stack.Screen name="index" options={{ title: "Sign in" }} />
			<Stack.Screen name="signUp/index" options={{ title: 'Sign Up' }} />
		</Stack>
	);
}
