"use client";

import Workout from "@/components/workout/Workout";
import WorkoutExercises from "@/components/workout/WorkoutExercises";
import WorkoutInfo from "@/components/workout/WorkoutInfo";
import WorkoutLikes from "@/components/workout/WorkoutLikes";
import { TProfile } from "@/types/profile.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function ProfilePage() {
	const { id } = useLocalSearchParams();
	if (typeof id !== "string") return;

	const [profile, setProfile] = useState<TProfile>();

	useEffect(() => {
		var fetchData = async() => {
			try {
				var profile = await AsyncStorage.getItem("profile");
				profile = JSON.parse(profile!);
				//@ts-ignore
				//var res = await profileService.getProfileEmbedAll({ id: id, accessToken: profile.accessToken });
				//@ts-ignore
				//setProfile(res.data);
			}catch(err) {
				console.log(err);
			}
		}
		fetchData();
	}, []);
	return (
		<>
			<View className="bg-white py-24">
				<View className="mx-auto max-w-5xl px-6 lg:px-8">
					{
						<View>
							<View className="mx-auto max-w-2xl lg:mx-0 space-y-6 lg:max-w-none">
								<Text className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
									{profile?.username}
								</Text>
								<Text className="mt-2 text-lg leading-8 text-gray-600">
									{`Workouts of ${profile?.username} are listed below`}
								</Text>
								<View className="relative mt-2 text-md space-y-2 text-gray-900 bg-slate-400 bg-opacity-20 rounded-md p-4 shadow-md">
									<View>
										<Text>Username: {profile?.username}</Text>
									</View>
									<Text>Email: {profile?.email}</Text>
									<View className="flex gap-1 p-1 border-white border-2 rounded-md shadow-md bg-slate-100">
										<Text>Followers: {profile?.followedBy?.length}</Text>
										<Text>Following: {profile?.following?.length}</Text>
									</View>
								</View>
							</View>
							<View className="h-[700px]">
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
						</View>
					}
				</View>
			</View>
		</>
	);
}
