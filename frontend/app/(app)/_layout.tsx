import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AppLayout() {

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
