import Workout from "@/components/workout/Workout";
import WorkoutExercises from "@/components/workout/WorkoutExercises";
import WorkoutInfo from "@/components/workout/WorkoutInfo";
import WorkoutLikes from "@/components/workout/WorkoutLikes";
import { TProfileAll } from "@/types/profile.type";
import { TWorkout } from "@/types/workout.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native";

export default function FeedPage() {

	const [profile, setProfile] = useState<TProfileAll>();

	var fetchData = async() => {
		try {
			var profile = await AsyncStorage.getItem("profile");
			profile = JSON.parse(profile!);
			//@ts-ignore
			//var res = await profileService.getProfileWithFollowingEmbedAll({ id: profile.id, accessToken: profile.accessToken });
			//@ts-ignore
			//setProfile(res.data);
		}catch(err) {
			console.log(err);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);
	


	return (
		<>
			<FlatList 
				className="bg-white p-6"
				refreshControl={<RefreshControl refreshing={false} onRefresh={() => fetchData()}/>}
				data={profile?.following?.map((profile) => profile.workouts).flat() as TWorkout[]}
				nestedScrollEnabled={true}
				keyExtractor={(item) => (item.id as number).toString()}
				ListHeaderComponent={() => (
					<View>
						<Text className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Your Feed
						</Text>
						<Text className="mt-2 text-lg text-gray-600 mb-4">
							Workouts of all your following will appear here.
						</Text>
					</View>)}
                ListEmptyComponent={() => (
                    <View>
                        <Text className="mt-12 text-lg text-center text-gray-600 mb-4">
							All the people that you follow haven't worked out yet so you can't see anything here.
						</Text>
                    </View>
				)}
				renderItem={({ item }) => (
					<Workout
						key={item.id}
						workout={item}
						workoutInfo={<WorkoutInfo />}
						exercises={<WorkoutExercises />}
						likes={<WorkoutLikes />}
					/>
				)}
			/>
		</>
	);
}
