import { TWorkout } from "@/types/workout.type";
import { EvilIcons } from "@expo/vector-icons";
import moment from "moment";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { format, isToday, isYesterday } from "date-fns";

const Workout: FC<{ workout: TWorkout; navigation: any }> = ({
	workout,
	navigation,
}) => {

	const formatDuration = (durationSec: number) => {
		const duration = moment.duration(durationSec, "seconds");
		return `${duration.hours()}h ${duration.minutes()}m`;
	};

	const formatDate = (createdAt: String) => {
		if (isToday(new Date(String(createdAt)))) {
			return "Today at " + format(new Date(String(createdAt)), "HH:mm");
		} else
		if (isYesterday(new Date(String(createdAt)))) {
			return "Yesterday at " + format(new Date(String(createdAt)), "HH:mm");
		} else {
			return format(new Date(String(createdAt)), "dd MMMM yyyy 'at' HH:mm");
		}
	}


	return (
		<View className="mb-5 bg-gray-800 p-5 rounded-xl">
			{/* TODO: let navigation go to the profile of the perticular user! */}
			{/* clickable username to go to profile */}
			<TouchableOpacity
				onPress={() => navigation.navigate("ProfileUser", { id: workout.profileId })}
			>
				<Text className="text-xl text-white">{workout.profile?.username}</Text>
			</TouchableOpacity>

			{/* clickable workout to go to workout details */}
			<TouchableOpacity
				onPress={() => navigation.navigate("Workout", { id: workout.id })}
			>
				<Text className="text-xs text-white pb-1">
					{formatDate(workout.createdAt)}
				</Text>


				<View className="border-t-2 border-gray-200 py-2">
					<Text className="text-xl text-white text-center text-bold pb-2">
						{workout.name}
					</Text>
					<View className="my-2 w-full">
						<View className="flex flex-row border-gray-500 border-2 rounded-lg justify-between p-3">
							<View>
								<Text className="text-white">Time</Text>
								<Text className="text-white">{formatDuration(workout.durationSec)}</Text>
							</View>
							<View>
								<Text className="text-white">Volume</Text>
								<Text className="text-white">{workout.volumeKG} kg</Text>
							</View>
							<View>
								<Text className="text-white">Sets</Text>
								<Text className="text-white">
									{workout.workoutDetails?.reduce((total, details) => total + (details.exerciseSets ? details.exerciseSets.length : 0), 0) ?? 0}
								</Text>
							</View>
						</View>
					</View>
				</View>
				
				<View className="flex flex-row justify-between w-full border-t-2 border-gray-200 mt-2">
					<View className="py-1 px-4 w-6/12">
						<Text className="text-lg text-white text-left mt-1">
							{workout.likedBy?.length ?? 0} <EvilIcons name="like" size={24} /> 
						</Text>
					</View>

					<View className="py-1 px-4 w-6/12">
						<Text className="text-lg text-white text-right mt-1">
							{workout.workoutComments?.length ?? 0} <EvilIcons name="comment" size={24}/>
						</Text>
					</View>
				</View>
					
			</TouchableOpacity>
		</View>
	);
};

export default Workout;
