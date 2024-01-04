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

	const formateDate = (createdAt: String) => {
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
			{/* clickable username to go to profile */}
			<TouchableOpacity
				onPress={() => navigation.navigate("Profile", { id: workout.profileId })}
			>
				<Text className="text-center text-lg text-white">{username}</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => navigation.navigate("Workout", { id: workout.id })}
			>
				<View className="border-y-2 border-gray-500">
					<Text className="text-center text-xs text-white">{formateDate(workout.createdAt)}</Text>
					<Text className="text-base text-white">{workout.name}</Text>
					<Text className="text-base text-white">Volume: {workout.volumeKG} kg</Text>
					<Text className="text-base text-white">Duration: {formatDuration(workout.durationSec)}</Text>
					<Text className="text-base text-white">
						<EvilIcons name="like" size={24} /> 
						{workout.likedBy?.length ?? 0} likes
					</Text>
					
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default Workout;
