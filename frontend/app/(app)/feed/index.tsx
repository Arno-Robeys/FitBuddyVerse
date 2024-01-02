import Workout from "@/components/workout/Workout";
import profileService from "@/lib/profileService";
import { TProfile, TProfileAll } from "@/types/profile.type";
import { TWorkout } from "@/types/workout.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

export default function FeedPage() {

	const [profile, setProfile] = useState<TProfileAll>();

	var fetchData = async() => {
		try {
			const p = JSON.parse(await AsyncStorage.getItem("profile") ?? "{}") as TProfile;
			var res = await profileService.getProfilesFollowing(p?.id ?? 0);
			setProfile(res.profile);
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
					<Workout key={item.id} workout={item}/>
				)}
			/>
		</>
	);
}
