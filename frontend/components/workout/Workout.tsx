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

	const publishDate: Date = new Date(workout.createdAt);
	const createdAtDateString = isYesterday(publishDate)
		? `Yesterday at ${format(publishDate, "h:mmaaa")}`
		: format(publishDate, "dd MMM yyyy HH:mm");

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("Workout", { id: workout.id })}
		>
			<View className="mt-3">
				<Text className="text-lg">{username}</Text>
				<View className="border-y-2">
					<Text>{workout.name}</Text>
					<Text>Volume: {workout.volumeKG} kg</Text>
					<Text>Duration: {formatDuration(workout.durationSec)}</Text>
					<Text>{createdAtDateString}</Text>
					<Text>{workout.likedBy?.length ?? 0} likes</Text>
					<EvilIcons name="like" size={24} />
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Workout;
