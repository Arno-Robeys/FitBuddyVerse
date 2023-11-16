import { TExercise } from "@/types/exercise.type";
import { useEffect, useState } from "react";
import { useWorkoutContext } from "./context/WorkoutContext";
import { View, Text } from "react-native";

type Props = {
	image?: string;
	exerciseId?: number;
	setsAmount?: number;
	exerciseName?: string;
};

export default function WorkoutExercise({
	image,
	exerciseId,
	setsAmount,
}: Props) {
	const [exercise, setExercise] = useState<TExercise>();
	const { workout } = useWorkoutContext();
	// const { data: session } = useSession();

	useEffect(() => {
		let isMounted = true;
		// async function fetchData(id: number) {
		//     try {
		//         if (isMounted && session?.user) {
		//             const exercise = await exerciseService.getExercise(id, session);
		//             setExercise(exercise);
		//         }
		//     } catch (error) {
		//         console.log(error);
		//     }
		// }
		// if (exerciseId) fetchData(exerciseId);

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<>
			{exerciseId && (
				<View key={workout.id + exerciseId}>
					<Text>
						{image} {setsAmount} sets {exercise?.name}
					</Text>
				</View>
			)}
		</>
	);
}
