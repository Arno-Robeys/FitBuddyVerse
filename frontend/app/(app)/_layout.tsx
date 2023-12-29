import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkoutPage from "./workouts";
import FeedPage from "./feed";
import ProfilePage from "./profile";
import { Text, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

export default function AppLayout({navigation}: {navigation: any}) {
	// This layout can be deferred because it's not the root layout.
	return (

		<Tab.Navigator screenOptions={{tabBarStyle: {height: 60}, tabBarLabelStyle: {fontSize: 18, fontWeight: "bold"}, headerTitleAlign: 'center'}}>
			<Tab.Screen name="Feed" component={FeedPage} options={{tabBarIcon: ({ size, color }) => (<Ionicons name="ios-home" size={size} color={color} />),
					headerRight: () => (
						<TouchableOpacity className="mr-2 p-2" onPress={() => navigation.navigate('Search')}>
							<Ionicons name="ios-search" size={30} color={'black'} />
						</TouchableOpacity>
					)}} />
			<Tab.Screen name="Workouts" component={WorkoutPage} options={{tabBarIcon: ({ size, color }) => (<Ionicons name="ios-barbell" size={size} color={color} />),
					headerLeft: () => (
						<TouchableOpacity className="ml-2 p-2 bg-red-400 rounded" onPress={() => {navigation.reset({routes: [{name: "Feed"}]})}}>
							<Text className="text-center font-bold">Cancel</Text>
						</TouchableOpacity>
					),
					headerRight: () => (
						<TouchableOpacity className="mr-2 p-2 bg-blue-400 rounded" onPress={() => {navigation.reset({routes: [{name: "Profile"}]})}}>
							<Text className="text-center font-bold">Finish</Text>
						</TouchableOpacity>
					)}}/>
			<Tab.Screen name="Profile" component={ProfilePage} options={{tabBarIcon: ({ size, color }) => (<Ionicons name="ios-person" size={size} color={color} />), 
					headerRight: () => (
						<TouchableOpacity className="mr-2 p-2"
							onPress={() => {
								navigation.navigate("Settings");
							}}>
							<Ionicons name="ios-settings" size={30} color={'black'} />
						</TouchableOpacity>
					)}}/>
		</Tab.Navigator>
	);
}