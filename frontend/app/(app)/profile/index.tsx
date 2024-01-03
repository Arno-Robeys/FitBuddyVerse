"use client";
import Workout from "@/components/workout/Workout";
import profileService from "@/lib/profileService";
import { TProfile, TProfileAll } from "@/types/profile.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native";

export default function ProfilePage({ navigation }: { navigation: any }) {
	const [profile, setProfile] = useState<TProfileAll>();

	const fetchData = async () => {
		try {
			const p = JSON.parse(
				(await AsyncStorage.getItem("profile")) ?? "{}"
			) as TProfile;
			var res = await profileService.getProfileByIdEmbedAll(p?.id ?? 0);
			setProfile(res.profile);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<FlatList
				className="bg-white p-6"
				refreshControl={
					<RefreshControl refreshing={false} onRefresh={() => fetchData()} />
				}
				data={profile?.workouts}
				nestedScrollEnabled={true}
				keyExtractor={(item) => (item.id as number).toString()}
				ListHeaderComponent={() => (
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
				)}
				ListEmptyComponent={() => (
					<View>
						<Text className="mt-12 text-lg text-center text-gray-600 mb-4">
							You didn't work out yet! What are you waiting for?
						</Text>
					</View>
				)}
				renderItem={({ item }) => (
					<Workout key={item.id} workout={item} navigation={navigation} />
				)}
			/>
		</>
	);
}
