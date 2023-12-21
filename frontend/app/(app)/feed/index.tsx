import Workout from "@/components/workout/Workout";
import WorkoutExercises from "@/components/workout/WorkoutExercises";
import WorkoutInfo from "@/components/workout/WorkoutInfo";
import WorkoutLikes from "@/components/workout/WorkoutLikes";
import profileService from "@/lib/profileService";
import { TProfile } from "@/types/profile.type";
import { TWorkout } from "@/types/workout.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function FeedPage() {

	const [profile, setProfile] = useState<TProfile>();

	useEffect(() => {
		var fetchData = async() => {
			try {
				var profile = await AsyncStorage.getItem("profile");
				profile = JSON.parse(profile!);
				//@ts-ignore
				var res = await profileService.getProfileWithFollowingEmbedAll({ id: profile.id, accessToken: profile.accessToken });
				//@ts-ignore
				setProfile(res.data);
			}catch(err) {
				console.log(err);
			}
		}
		fetchData();
	}, []);
	


	return (
		<>
			<Stack.Screen
				options={{
					title: "Workout Feed",
					headerStyle: { backgroundColor: "#374151" },
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
					headerRight: () => (
						<TouchableOpacity
							onPress={() => {
								AsyncStorage.removeItem("profile");
								router.push("/");
							}}
							className="bg-blue-500 rounded py-2 px-4"
						>
							<Text className="text-white font-bold">Logout</Text>
						</TouchableOpacity>
					),
				}}
			/>
			<View className="bg-white py-24 sm:py-32">
				<View className="mx-auto max-w-7xl px-6 lg:px-8">
					<View className="mx-auto max-w-2xl lg:mx-0">
						<Text className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Your Feed
						</Text>
						<Text className="mt-2 text-lg text-gray-600 mb-4">
							Workouts of all your following will appear here.
						</Text>
					</View>
					<View className="h-[400px]">
						{/* <Search /> */}
							<FlashList
								renderItem={({ item }) => {
									return (
										<Workout
											key={item.id}
											workout={item}
											workoutInfo={<WorkoutInfo />}
											exercises={<WorkoutExercises />}
											likes={<WorkoutLikes />}
										/>
									);
								}}
								data={profile?.following?.map((profile) => profile.workouts).flat() as TWorkout[]}
								estimatedItemSize={100}
							/>
					</View>
				</View>
			</View>
		</>
	);
}
