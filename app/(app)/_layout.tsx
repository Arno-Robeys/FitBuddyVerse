import { Redirect, Tabs } from "expo-router";
import { useSession } from "../ctx";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AppLayout() {
	const session = useSession();

	// You can keep the splash screen open, or render a loading screen like we do here.
	if (session?.isLoading) {
		return <Text>Loading...</Text>;
	}
	// Only require authentication within the (app) group's layout as users
	// need to be able to access the (auth) group and sign in again.
	if (!session) {
		// On web, static rendering will stop here as the user is not authenticated
		// in the headless Node process that the pages are rendered in.
		return <Redirect href="/" />;
	}

	// This layout can be deferred because it's not the root layout.
	return (
		<Tabs
			screenOptions={{ headerShown: false, tabBarLabelStyle: { fontSize: 18 } }}
		>
			<Tabs.Screen
				name="feed"
				options={{
					title: "Feed",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="ios-home" size={size} color={color} />
					),
				}}
			></Tabs.Screen>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="ios-person" size={size} color={color} />
					),
					href: `/profile`,
				}}
			></Tabs.Screen>
			<Tabs.Screen
				name="workouts"
				options={{
					title: "Workouts",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="ios-barbell" size={size} color={color} />
					),
				}}
			></Tabs.Screen>
		</Tabs>
	);
}
