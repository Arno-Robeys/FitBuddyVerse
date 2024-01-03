import { format } from "date-fns";
import React from "react";
import { Button, ScrollView, Text, View } from "react-native";

export default function History({ workouts }: any) {
	if (!workouts || workouts.length === 0) {
		return (
			<View className="flex h-full justify-center items-center mx-10">
				<View className="bg-slate-400/20 p-4 rounded-md">
					<Text className="text-lg">
						You don't have any workouts with this exercise
					</Text>
				</View>
			</View>
		);
	}
	return (
		<>
			<ScrollView>
				{workouts?.map((workout: any) => (
					<View
						key={workout.workoutId}
						className="bg-white px-4 pt-4 rounded-lg shadow-md"
					>
						<View className="mb-4">
							<Text className="text-lg font-semibold">
								{workout.workoutName}
							</Text>
							<Text className="text-sm text-gray-500 block">
								{format(
									new Date(workout.workoutCreatedAt),
									"dd MMMM yyyy, kk:mm"
								)}
							</Text>
						</View>
						<View className="mb-4">
							<View className="flex flex-row items-center justify-between mb-2 bg-slate-400/20 p-2 rounded-md">
								<View>
									<Text className="text-md font-semibold">
										{workout.exerciseName}
									</Text>
									{workout.exerciseNote ? (
										<Text className="text-md">{workout.exerciseNote}</Text>
									) : null}
								</View>
								<Text className="text-sm">{`${workout.sets.length} sets`}</Text>
							</View>

							<View className="flex flex-row items-center justify-between p-2">
								<Text className="text-sm">SET</Text>
								<Text className="text-sm">WEIGHT & REPS</Text>
							</View>
							<View className="space-y-2 p-2">
								{workout.sets.map((set: any) => (
									<View
										key={set.setId}
										className="flex flex-row justify-between"
									>
										<Text>{set.setNr}</Text>
										<Text>{`${set.weightKG}kg x ${set.repetitions} reps`}</Text>
									</View>
								))}
							</View>
						</View>
					</View>
				))}
			</ScrollView>
		</>
	);
}
