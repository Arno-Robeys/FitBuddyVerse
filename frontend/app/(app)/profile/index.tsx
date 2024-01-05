"use client";
import Workout from "@/components/workout/Workout";
import profileService from "@/lib/profileService";
import { TProfile, TProfileAll } from "@/types/profile.type";
import { EvilIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";

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

	const handleFollowers = () => {
		navigation.navigate('Follow', { type: "followers", profileId: profile?.id })
	};

	const handleFollowing = () => {
		navigation.navigate("Follow", { type: "following", profileId: profile?.id });
	};

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
						<View className="mb-5">
							<View className="items-center">
								<Text className="p-1">
									<EvilIcons name="user" size={100}/>
								</Text>
								<Text className="font-bold text-xl text-gray-800">
									{profile?.username ?? "unknown"}
								</Text>
								<Text className="text-sm">
									{profile?.email ?? "unknown email"}
								</Text>
							</View>

							<View className="flex flex-row justify-between w-8/12 mx-auto my-2 divide-x-2 divide-gray-100 py-2">
								<View className="w-6/12">
									<TouchableOpacity
									onPress={handleFollowing}>
										<Text className="text-center font-bold text-lg">
											{profile?.following?.length ?? 0}
										</Text>
										<Text className="text-center text-sm">
											Following
										</Text>
										</TouchableOpacity>
								</View>

								<View className="w-6/12">
									<TouchableOpacity
									onPress={handleFollowers}>
										<Text className="text-center font-bold text-lg">
											{profile?.followedBy?.length ?? 0}
										</Text>
										<Text className="text-center text-sm">
											Followers
										</Text>
									</TouchableOpacity>
								</View>
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

				// Add a margin-bottom under the last rendered item
				ListFooterComponent={() => <View className="mb-10" />}
			/>
		</>
	);
}
