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

	const ProfileInfo = ({ label, value }: { label: string, value: string | number }) => (
		<View className="flex flex-col">
		  <Text className="text-sm text-gray-700 font-bold">{label}:</Text>
		  <Text className="text-base">{value}</Text>
		</View>
	  );

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
					<>
						<View className="p-6 bg-gray-100 rounded-md mb-5">
							<View className="mb-4">
								<Text className="text-2xl font-bold text-gray-800 mb-2">Your Profile</Text>
								<Text className="text-base text-gray-600">
								Your information and workouts are listed below.
								</Text>
							</View>
							<View className="space-y-2">
								<ProfileInfo label="Username" value={profile?.username ?? ""} />
								<ProfileInfo label="Email" value={profile?.email ?? ""} />
								<ProfileInfo label="Followers" value={profile?.followedBy?.length ?? 0} />
								<ProfileInfo label="Following" value={profile?.following?.length ?? 0} />
							</View>
						</View>
					</>
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
