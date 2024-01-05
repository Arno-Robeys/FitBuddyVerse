import Workout from "@/components/workout/Workout";
import workoutService from "@/lib/workoutService";
import { TProfile } from "@/types/profile.type";
import { TWorkout } from "@/types/workout.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";


export default function FeedPage({ navigation }: { navigation: any }) {
	const [workouts, setWorkouts] = useState<TWorkout[]>();
  
	var fetchData = async () => {
	  try {
		const p = JSON.parse((await AsyncStorage.getItem("profile")) ?? "{}") as TProfile;
  
		// Fetch profiles of users being followed
		var res = await workoutService.getProfileFeed(p?.id ?? 0);
		setWorkouts(res);
	  } catch (err) {
		console.log(err);
	  }
	};
  
	useEffect(() => {
	  fetchData();
	}, []);

	const sortWorkoutsByDate = (data: TWorkout[]) => {
		return data.sort((a, b) => {
			const dateA = new Date(a.createdAt);
			const dateB = new Date(b.createdAt);
			return dateB.getTime() - dateA.getTime();
		});
	};
  

  
	return (
	  <>
		{/* FlatList component for rendering a scrollable list of workouts */}
		<FlatList
		  className="bg-white p-6"
		  refreshControl={
			// Pull-to-refresh functionality with a RefreshControl component
			<RefreshControl refreshing={false} onRefresh={() => fetchData()} />
		  }
		data={sortWorkoutsByDate(workouts ?? [])}
		  nestedScrollEnabled={true}
		  keyExtractor={(item) => (item.id as number).toString()}
  
		  // Header component with introductory text
		  ListHeaderComponent={() => (
			<View>
			  <Text className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
				Your Feed
			  </Text>
			  <Text className="mt-2 text-lg text-gray-600 mb-4">
				Workouts of all your following will appear here.
			  </Text>
			</View>
		  )}
  
		  // When the feed is empty
		  ListEmptyComponent={() => (
			<View>
			  <Text className="mt-12 text-lg text-center text-gray-600 mb-4">
				All the people that you follow haven't worked out yet, so you can't see anything here.
			  </Text>
			</View>
		  )}
  
		  // Render each workout using the Workout component
		  renderItem={({ item }) => (
			<Workout key={item.id} workout={item} navigation={navigation} />
		  )}
  
		  // Add a margin-bottom under the last rendered item
		  ListFooterComponent={() => <View className="mb-10" />}
		/>
	  </>
	);
  }
  