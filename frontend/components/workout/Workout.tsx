import { TWorkout } from "@/types/workout.type";
import { EvilIcons } from "@expo/vector-icons";
import moment from "moment";
import React, { FC, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { format, isYesterday } from "date-fns";
import profileService from "@/lib/profileService";

const Workout: FC<{ workout: TWorkout; navigation: any }> = ({
	workout,
	navigation,
}) => {
	const [username, setUsername] = React.useState<string>("");

	const formatDuration = (durationSec: number) => {
		const duration = moment.duration(durationSec, "seconds");
		return `${duration.hours()}h ${duration.minutes()}m`;
	};

	const formatDate = (createdAt: String) => {
		if (isYesterday(new Date(String(createdAt)))) {
			return "Yesterday";
		} else {
			return format(new Date(String(createdAt)), "dd MMMM yyyy 'at' HH:mm");
		}
	}
	
	useEffect(() => {
		const fetchData = async () => {
			try {
				var profile = await profileService.getProfileById(workout.profileId);
				setUsername(profile.username);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);


	return (
		<View className="mb-5 bg-gray-800 p-5 rounded-xl">
			{/* TODO: let navigation go to the profile of the perticular user! */}
			{/* clickable username to go to profile */}
			<TouchableOpacity
				onPress={() => navigation.navigate("Profile", { id: workout.profileId })}
			>
				<Text className="text-lg text-white">{username}</Text>
			</TouchableOpacity>

			{/* clickable workout to go to workout details */}
			<TouchableOpacity
				onPress={() => navigation.navigate("Workout", { id: workout.id })}
			>
				<Text className="text-xs text-white">{formatDate(workout.createdAt)}</Text>

				<View className="border-y-2 border-gray-500 py-2 px-1">
					<Text className="text-base text-white">
						{workout.name}
					</Text>
					<Text className="text-base text-white">Volume: {workout.volumeKG} kg</Text>
					<Text className="text-base text-white">Duration: {formatDuration(workout.durationSec)}</Text>
					<Text className="text-base text-white">{workout.likedBy?.length ?? 0} likes</Text>
				</View>
				
				<Text className="text-base text-white">
					<EvilIcons name="like" size={24} /> 
				</Text>
					
			</TouchableOpacity>
		</View>
	);
};

export default Workout;
