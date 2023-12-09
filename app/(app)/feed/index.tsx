import { useSession } from "@/app/ctx";
import Workout from "@/components/workout/Workout";
import WorkoutExercises from "@/components/workout/WorkoutExercises";
import WorkoutInfo from "@/components/workout/WorkoutInfo";
import WorkoutLikes from "@/components/workout/WorkoutLikes";
import profileService from "@/lib/profileService";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function FeedPage() {
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
		queryKey: ["profile", sessionJSON.id],
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
					headerShown: true,
					title: "Workout Feed",
					headerStyle: { backgroundColor: "#374151" },
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
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
