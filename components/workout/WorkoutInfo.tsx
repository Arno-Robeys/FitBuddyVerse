import { format, intervalToDuration, isYesterday } from "date-fns";
import { useWorkoutContext } from "@/components/workout/context/WorkoutContext";
import { Text, View, TouchableHighlight } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

export default function WorkoutInfo() {
	const { workout, profile } = useWorkoutContext();

	const duration = intervalToDuration({
		start: 0,
		end: workout.durationSec * 1000,
	});

	const publishDate: Date = new Date(workout.createdAt);
	const createdAtDateString = isYesterday(publishDate)
		? `Yesterday at ${format(publishDate, "h:mmaaa")}`
		: format(publishDate, "dd MMM yyyy HH:mm");

	return (
		<>
			<View className="w-full flex flex-col items-center pb-10">
				<TouchableHighlight
					className="flex flex-row items-center"
					onPress={() => router.push(`/profile/${profile?.id}`)}
				>
					<View className="items-center">
						<AntDesign name="user" size={32} color="white" />
						<View>
							<Text className="py-1 font-bold text-base text-white">
								{profile?.username}
							</Text>
							<Text className="py-1 font-bold text-sm text-white">
								{createdAtDateString}
							</Text>
						</View>
					</View>
				</TouchableHighlight>
				<View>
					<Text className="items-center border-t-2 border-b-2 border-gray-500 font-bold text-white my-1 p-1 text-xl">
						{workout.name}
					</Text>
					<View className="px-1.5">
						<Text className="text-white py-0.5 text-base">
							Duration : {duration?.hours}h {duration?.minutes}min
						</Text>
						<Text className="text-white py-0.5 text-base">
							Volume : {workout.volumeKG} kg
						</Text>
					</View>
				</View>
			</View>
		</>
	);
}
