import { View, Text } from "react-native";
import { useWorkoutContext } from "@/components/workout/context/WorkoutContext";
import {EvilIcons} from "@expo/vector-icons";

export default function WorkoutLikes() {
	const { workout } = useWorkoutContext();
	return (
		<View>
			<Text className="text-white">
				<EvilIcons name="like" size={24} color="white"/>
				{workout?.likedBy?.length ?? 0}
			</Text>
		</View>
	);
}