import profileService from "@/lib/profileService";
import workoutService from "@/lib/workoutService";
import { format } from "date-fns";
import moment from "moment";
import React, { useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

interface ExerciseSet {
	setId: number;
	setNr: number;
	repetitions: number;
	weightKG: number;
}

interface Exercise {
	exerciseId: number;
	exerciseDescription: string;
	exerciseEquipment: string;
	exerciseName: string;
	exerciseNote: string;
	exerciseType: string;
	sets: ExerciseSet[];
}

interface Workout {
	exercises: Exercise[];
	workoutCreatedAt: string;
	workoutDurationSec: number;
	workoutId: number;
	workoutName: string;
	workoutProfileId: number;
	workoutVolumeKG: number;
}

interface Profile {
	email: string;
	id: number;
	password: number;
	username: string;
}

const formatDuration = (durationSec: number) => {
	const duration = moment.duration(durationSec, "seconds");
	return `${duration.hours()}h ${duration.minutes()}m`;
};

export default function WorkoutPage({
	route,
	navigation,
}: {
	route: any;
	navigation: any;
}) {
	const { id } = route.params;
	const [workout, setWorkout] = React.useState<Workout>();
	const [exercises, setExercises] = React.useState<Exercise[]>();
	const [profile, setProfile] = React.useState<Profile>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch exercise details using the exerciseService
				const workout: Workout = await workoutService.getWorkoutById(id);
				setWorkout(workout);
				const profile: Profile = await profileService.getProfileById(
					workout.workoutProfileId
				);
				const arrayUniqueByKey = (array: any, key: any) => [
					...new Map(array.map((item: any) => [item[key], item])).values(),
				];
				setExercises(
					arrayUniqueByKey(workout.exercises, "exerciseId") as Exercise[]
				);
				setProfile(profile);

				// Now you can use exerciseDetails to update the component state or perform other actions
			} catch (error) {
				console.error("Error fetching workout:", error);
			}
		};
		fetchData();
	}, []);

	return (
		<ScrollView className="bg-white">
			<View className="h-full bg-white flex justify-center items-center m-2">
				<View className="px-4 py-2 flex items-center justify-between rounded-md  shadow-sm shadow-gray-200 w-10/12">
					<View className="w-full">
						<View>
							<View>
								<Text className="text-lg">{profile?.username}</Text>
								<Text className="text-sm">
									{workout?.workoutCreatedAt
										? format(
												new Date(workout.workoutCreatedAt),
												"dd MMMM yyyy, kk:mm"
										  )
										: null}
								</Text>
							</View>
						</View>
					</View>

					<View className="my-2 w-full">
						<Text className="text-xl font-bold">{workout?.workoutName}</Text>
						<View className="flex flex-row justify-between border-t-2 border-b-2 border-gray-200 py-2">
							<View>
								<Text>Time</Text>
								<Text>{formatDuration(workout?.workoutDurationSec ?? 0)}</Text>
							</View>
							<View>
								<Text>Volume</Text>
								<Text>{workout?.workoutVolumeKG} kg</Text>
							</View>
							<View>
								<Text>Sets</Text>
								<Text>
									{exercises?.map((exercise) => exercise.sets).flat().length}
								</Text>
							</View>
						</View>
					</View>

					<View className="w-full">
						<Text>Workout</Text>
						<View className="my-2">
							{exercises?.map((exercise) => (
								<View className="mb-2" key={exercise.exerciseId}>
									<View className="mb-2">
										<Text className="text-lg font-extrabold">
											{exercise.exerciseName}
										</Text>
										{exercise.exerciseNote ? (
											<Text>{exercise.exerciseNote}</Text>
										) : null}
									</View>
									<View className="flex flex-row justify-between">
										<Text>SET</Text>
										<Text>WEIGHT & REPS</Text>
									</View>

									{exercise.sets.map((set) => (
										<View
											className="flex flex-row justify-between"
											key={set.setId}
										>
											<Text>{set.setNr}</Text>
											<Text>
												{set.weightKG} kg x {set.repetitions} reps
											</Text>
										</View>
									))}
								</View>
							))}
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
