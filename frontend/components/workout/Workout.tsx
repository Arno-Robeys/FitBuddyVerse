import { TWorkout } from "@/types/workout.type";
import { EvilIcons } from "@expo/vector-icons";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { format, isToday, isYesterday } from "date-fns";
import workoutService from "@/lib/workoutService";

const Workout: FC<{ workout: TWorkout; navigation: any }> = ({
	workout,
	navigation,
}) => {

	const [isLoading, setIsLoading] = useState(false);

	const formatDuration = (durationSec: number) => {
		const duration = moment.duration(durationSec, "seconds");
		return `${duration.hours()}h ${duration.minutes()}m`;
	};

	const formatDate = (createdAt: String) => {
		if (isToday(new Date(String(createdAt)))) {
			return "Today at " + format(new Date(String(createdAt)), "HH:mm");
		} else if (isYesterday(new Date(String(createdAt)))) {
			return "Yesterday at " + format(new Date(String(createdAt)), "HH:mm");
		} else {
			return format(new Date(String(createdAt)), "dd MMMM yyyy 'at' HH:mm");
		}
	};

	const likeWorkout = async () => {
		try {
			setIsLoading(true); // Set isLoading to true before making the API call
			await workoutService.likeWorkout(String(workout.id), String(workout.profileId));
			setIsLoading(false); // Set isLoading to false after the API call is completed
		} catch (err) {
			console.log(err);
			setIsLoading(false); // Set isLoading to false if there is an error
		}
	};

	return (
		<View className="mb-5 bg-gray-800 p-5 rounded-xl">
			{/* clickable username to go to profile */}
			<TouchableOpacity
				onPress={() => navigation.navigate("ProfileUser", { id: workout.profileId })}
			>
				<Text className="text-xl text-white">{workout.profile?.username}</Text>
			</TouchableOpacity>

			{/* clickable workout to go to workout details */}
			<TouchableOpacity onPress={() => navigation.navigate("Workout", { id: workout.id })}>
				<Text className="text-xs text-white pb-1">{formatDate(workout.createdAt)}</Text>

				<View className="border-t-2 border-gray-200 py-2">
					<Text className="text-xl text-white text-center text-bold pb-2">{workout.name}</Text>
					<View className="my-2 w-full border-gray-500 border-2 rounded-lg divide-y-2 divide-gray-500">
						<View className="flex flex-row justify-between p-3">
							<View>
								<Text className="text-white">Time:</Text>
								<Text className="text-white">{formatDuration(workout.durationSec)}</Text>
							</View>
							<View>
								<Text className="text-white">Volume:</Text>
								<Text className="text-white">{workout.volumeKG} kg</Text>
							</View>
							<View>
								<Text className="text-white">Sets:</Text>
								<Text className="text-white">
									{workout.workoutDetails?.reduce(
										(total, details) => total + (details.exerciseSets ? details.exerciseSets.length : 0),
										0
									) ?? 0}
								</Text>
							</View>
						</View>

						<View>
							<View className="px-3 py-2">
								<View className="flex flex-row justify-between pb-1.5">
									<Text className="text-white font-bold">Excercise:</Text>
									<Text className="text-white font-bold">Sets:</Text>
								</View>
								{workout.workoutDetails?.map((details) => (
									<View key={details.exerciseId} className="flex flex-row justify-between py-0.5">
										<Text className="text-white">{details.exercise?.name}</Text>
										<Text className="text-white">{details.exerciseSets?.length ?? 0} sets</Text>
									</View>
								))}
							</View>
						</View>
					</View>
				</View>
			</TouchableOpacity>
			
			<View className="flex flex-row justify-between w-full border-t-2 border-gray-200 mt-2">
				{/* Clickable Like button */}
				<View className="py-1 px-4 w-6/12">
					{isLoading ? (
						<ActivityIndicator color="white" size="small"/>
					) : (
						<TouchableOpacity onPress={likeWorkout}>
							<Text className="text-lg text-white text-left mt-1">
								{workout.likedBy?.length ?? 0} <EvilIcons name="like" size={24} />
							</Text>
						</TouchableOpacity>
					)}
				</View>

				{/* TODO: Clickable comment button */}
				<View className="py-1 px-4 w-6/12">
					<TouchableOpacity>
						<Text className="text-lg text-white text-right mt-1">
							{workout.workoutComments?.length ?? 0} <EvilIcons name="comment" size={24} />
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default Workout;
