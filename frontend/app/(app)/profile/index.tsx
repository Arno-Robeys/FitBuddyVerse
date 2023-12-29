"use client";
import Workout from "@/components/workout/Workout";
import WorkoutExercises from "@/components/workout/WorkoutExercises";
import WorkoutInfo from "@/components/workout/WorkoutInfo";
import WorkoutLikes from "@/components/workout/WorkoutLikes";
import profileService from "@/lib/profileService";
import { TProfile, TProfileAll } from "@/types/profile.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function ProfilePage() {
	const [profile, setProfile] = useState<TProfileAll>();

	useEffect(() => {
		var fetchData = async() => {
			try {
				const p = JSON.parse(await AsyncStorage.getItem("profile") ?? "{}") as TProfile;
				var res = await profileService.getProfileByIdEmbedAll(p?.id ?? 0);
				setProfile(res.profile);
			}catch(err) {
				console.log(err);
			}
		}
		fetchData();
	}, []);
	
	return (
		<>
			<ScrollView className="bg-white p-6 h-screen">
				<View>
					<Text className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Your Profile
					</Text>
					<Text className="mt-2 text-lg text-gray-600 mb-4">
						Your information and workouts are listed below.
					</Text>
					<Text>Username: {profile?.username}</Text>
					<Text>Email: {profile?.email}</Text>
					<Text>Followers: {profile?.followedBy?.length ?? 0}</Text>
					<Text>Following: {profile?.following?.length ?? 0}</Text>
				</View>
				<View className="h-[700px] mt-6">
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
						data={profile?.workouts}
						estimatedItemSize={100}
					/>
				</View>
			</ScrollView>
		</>
	);
}
