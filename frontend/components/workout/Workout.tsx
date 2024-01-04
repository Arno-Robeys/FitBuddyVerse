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
		<View className="mt-3">
			{/* clickable username to go to profile */}
			<TouchableOpacity
				onPress={() => navigation.navigate("Profile", { id: workout.profileId })}
			>
				<Text className="text-center text-lg">{username}</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => navigation.navigate("Workout", { id: workout.id })}
			>
				<View className="border-y-2">
					<Text className="flex text-left">{workout.name}</Text>
					<Text>{formateDate(workout.createdAt)}</Text>
					<Text>Volume: {workout.volumeKG} kg</Text>
					<Text>Duration: {formatDuration(workout.durationSec)}</Text>
					<Text>{workout.likedBy?.length ?? 0} likes</Text>
					<EvilIcons name="like" size={24} />
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default Workout;
