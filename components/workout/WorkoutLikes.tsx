import { View, Text } from "react-native";
import { useWorkoutContext } from "../../../Mobile Applications - PROJECT OLD/components/workout/context/WorkoutContext";

export default function WorkoutLikes() {
	const { workout } = useWorkoutContext();
	return (
		<View>
			<Text>{workout.likeCount} likes</Text>
		</View>
	);
}
