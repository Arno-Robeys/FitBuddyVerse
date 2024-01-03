import { TWorkout } from "@/types/workout.type";
import { EvilIcons } from "@expo/vector-icons";
import moment from "moment";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { format, isYesterday } from "date-fns";

const Workout: FC<{ workout: TWorkout; navigation: any }> = ({
	workout,
	navigation,
}) => {
	const formatDuration = (durationSec: number) => {
		const duration = moment.duration(durationSec, "seconds");
		return `${duration.hours()}h ${duration.minutes()}m`;
	};

	const publishDate: Date = new Date(workout.createdAt);
	const createdAtDateString = isYesterday(publishDate)
		? `Yesterday at ${format(publishDate, "h:mmaaa")}`
		: format(publishDate, "dd MMM yyyy HH:mm");

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("Workout", { id: workout.id })}
		>
			<View className="mt-2 border-y-2">
				<Text>Workout</Text>
				<Text>{workout.name}</Text>
				<Text>Volume: {workout.volumeKG}</Text>
				<Text>Duration: {formatDuration(workout.durationSec)}</Text>
				<Text>{createdAtDateString}</Text>
				<Text>{workout.likedBy?.length ?? 0} likes</Text>
				<EvilIcons name="like" size={24} />
			</View>
		</TouchableOpacity>
	);
};

export default Workout;
