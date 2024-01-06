import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./index";
import RegisterPage from "./signUp/index";
import AppLayout from "./(app)/_layout";
import { NavigationContainer } from "@react-navigation/native";
import ExerciseInfoPage from "./exercise";
import SettingsPage from "./settings";
import SearchPage from "./search";
import ProfileUserPage from "./(app)/profile/user";
import ExerciseHistoryPage from "./exercise/history";
import WorkoutDetailsPage from "./workout";
import FollowPage from "./follow";

const Stack = createNativeStackNavigator();

export default function Root() {
	// Set up the auth context and render our layout inside of it.
	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator initialRouteName="Login">
				<Stack.Screen name="Login" component={LoginPage} options={{headerShown: false}}/>
				<Stack.Screen name="Register" component={RegisterPage} />
				<Stack.Screen name="FitBuddyVerse" component={AppLayout} options={{headerShown: false}}/>
				<Stack.Screen name="ExerciseInfo" component={ExerciseInfoPage} options={{title: 'Exercise Info'}}/>
				<Stack.Screen name="Settings" component={SettingsPage}/>
				<Stack.Screen name="Search" component={SearchPage}/>
				<Stack.Screen name="ProfileUser" component={ProfileUserPage}/>
				<Stack.Screen name="ExerciseHistory" component={ExerciseHistoryPage} options={{title: 'History'}}/>
				<Stack.Screen name="Workout" component={WorkoutDetailsPage} options={{title: 'Workout'}}/>
				<Stack.Screen name="Follow" component={FollowPage}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
