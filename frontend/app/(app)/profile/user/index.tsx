"use client";
import Workout from "@/components/workout/Workout";
import WorkoutExercises from "@/components/workout/WorkoutExercises";
import WorkoutInfo from "@/components/workout/WorkoutInfo";
import WorkoutLikes from "@/components/workout/WorkoutLikes";
import profileService from "@/lib/profileService";
import { TProfileAll } from "@/types/profile.type";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native";

export default function ProfileUserPage({route, navigation}: {route: any, navigation: any}) {
	const [profile, setProfile] = useState<TProfileAll>();

	const fetchData = async() => {
		try {
			var res = await profileService.getProfileByIdEmbedAll(route.params.id ?? 0);
            navigation.setOptions({ title: "Profile "+ res?.profile.username ?? "Profile" });
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
				data={profile?.workouts}
				nestedScrollEnabled={true}
				keyExtractor={(item) => (item.id as number).toString()}
				ListHeaderComponent={() => (
					<View>
						<Text className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							{profile?.username}
						</Text>
						<Text className="mt-2 text-lg text-gray-600 mb-4">
							Information and workouts of {profile?.username} are listed below.
						</Text>
						<Text>Username: {profile?.username}</Text>
						<Text>Email: {profile?.email}</Text>
						<Text>Followers: {profile?.followedBy?.length ?? 0}</Text>
						<Text>Following: {profile?.following?.length ?? 0}</Text>
					</View>)}
                ListEmptyComponent={() => (
                    <View>
                        <Text className="mt-12 text-lg text-center text-gray-600 mb-4">
							This user hasn't worked out yet
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
