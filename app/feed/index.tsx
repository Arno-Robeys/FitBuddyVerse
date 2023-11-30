import Workout from "@/components/workout/Workout";
import WorkoutExercises from "@/components/workout/WorkoutExercises";
import WorkoutInfo from "@/components/workout/WorkoutInfo";
import WorkoutLikes from "@/components/workout/WorkoutLikes";
import WorkoutsContext from "@/components/workout/context/WorkoutsContext";
import { TWorkout } from "@/types/workout.type";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function FeedPage() {
	const [stateChanged, setStateChanged] = useState<boolean>(false);
	const [workouts, setWorkouts] = useState<any[]>([]);

	useEffect(() => {
		const workout: TWorkout = {
			id: 1,
			name: "Dummy Workout",
			createdAt: new Date().toISOString(),
			durationSec: 0,
			likeCount: 0,
			volumeKG: 0,
			profileId: 1,
			workoutComments: [],
			exerciseSets: [],
		};
		setWorkouts([workout]);
	}, []);

	return (
		<>
			<View className="bg-white py-24 sm:py-32">
				<View className="mx-auto max-w-7xl px-6 lg:px-8">
					<View className="mx-auto max-w-2xl lg:mx-0">
						<Text className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Your Feed
						</Text>
						<Text className="mt-2 text-lg text-gray-600">
							Workouts of all your following will appear here.
						</Text>
					</View>
					<View className="mx-auto mt-10 grid max-w-2xl grid-cols-1 md:grid-cols-3 md:gap-x-8 border-t border-gray-200 pt-10 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none">
						<WorkoutsContext.Provider value={{ stateChanged, setStateChanged }}>
							{/* <Search /> */}
							{workouts.map((workout) => (
								<Workout
									key={workout.id}
									workout={workout}
									workoutInfo={<WorkoutInfo />}
									exercises={<WorkoutExercises />}
									likes={<WorkoutLikes />}
									show={workout.show}
								/>
							))}
						</WorkoutsContext.Provider>
					</View>
				</View>
			</View>
		</>
	);
}
