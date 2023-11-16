import { format, intervalToDuration, isYesterday } from "date-fns";
import { useWorkoutContext } from "@/components/workout/context/WorkoutContext";
import { Text, Linking, View, TouchableHighlight } from "react-native";
import { AntDesign } from "@expo/vector-icons";

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
			<TouchableHighlight
				onPress={() => Linking.openURL(`/profile/${profile?.id}`)}
			>
				<View className="flex items-center gap-x-4 w-full m-a text-white">
					<AntDesign name="user" size={24} color="white" />
					<View className="flex flex-col">
						<Text>{profile?.username}</Text>
						<Text className="text-white">{createdAtDateString}</Text>
					</View>
				</View>
			</TouchableHighlight>

			{/*
                <a
                    href="#"
                    className="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100"
                >
                    {profile?.username}
                </a>
                */}
			<View className="relative w-full">
				<Text className="mt-3 text-lg font-semibold leading-6">
					{workout.name}
				</Text>
				<View className="flex mt-3 text-sm leading-6 gap-3 w-full">
					<View>
						<Text>Duration</Text>
						<Text className="font-semibold">
							{duration?.hours}h {duration?.minutes}min
						</Text>
					</View>
					<View>
						<Text>Volume</Text>
						<Text className="font-semibold">{workout.volumeKG} kg</Text>
					</View>
				</View>
			</View>
		</>
	);
}
