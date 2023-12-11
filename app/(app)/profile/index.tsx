"use client";

import { useSession } from "@/app/ctx";
import Workout from "@/components/workout/Workout";
import WorkoutExercises from "@/components/workout/WorkoutExercises";
import WorkoutInfo from "@/components/workout/WorkoutInfo";
import WorkoutLikes from "@/components/workout/WorkoutLikes";
import profileService from "@/lib/profileService";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProfilePage() {
	const session = useSession();
	if (session?.isLoading) return <Text>Loading...</Text>;
	if (!session) return <Text>Not logged in</Text>;
	const sessionJSON = JSON.parse(session.session!);

	const {
		data: profile,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const response = await profileService.getProfileEmbedAll({
				id: sessionJSON.id,
				accessToken: sessionJSON.accessToken,
			});
			if (response.code === "error") {
				throw new Error(response.error.message);
			}
			return response.data;
		},
	});
	return (
		<>
			<Stack.Screen
				options={{
					title: "Profile",
					headerStyle: { backgroundColor: "#374151" },
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
					headerRight: () => (
						<TouchableOpacity
							onPress={() => {
								session?.signOut();
								session!.session = null;
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
							Profile
						</Text>
						<Text className="mt-2 text-lg text-gray-600 mb-4">
							Your profile information is listed below.
						</Text>
					</View>
					<View
						style={{
							marginTop: 2,
							marginBottom: 8,
							padding: 4,
							backgroundColor: "rgba(112,128,144,0.2)",
							borderRadius: 8,
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.25,
							shadowRadius: 3.84,
							elevation: 5,
						}}
					>
						<View>
							<Text style={{ fontSize: 16, color: "#374151" }}>
								Username: {profile?.username}
							</Text>
						</View>
						<View>
							<Text style={{ fontSize: 16, color: "#374151" }}>
								Email: {profile?.email}
							</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								padding: 2,
								borderWidth: 2,
								borderRadius: 8,
								borderColor: "#fff",
								shadowColor: "#000",
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.25,
								shadowRadius: 3.84,
								elevation: 5,
								backgroundColor: "rgba(112,128,144,0.1)",
							}}
						>
							<Text>Followers: {profile?.followedBy?.length}</Text>
							<Text>Following: {profile?.following?.length}</Text>
						</View>
					</View>
					<View className="h-[700px]">
						{/* <Search /> */}
						{isLoading && <Text>Loading...</Text>}
						{isError && <Text>Error: {error.message}</Text>}
						{!isLoading && (
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
						)}
					</View>
				</View>
			</View>
		</>
	);
}
