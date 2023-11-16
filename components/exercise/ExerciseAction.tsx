import exerciseSetService from "@/lib/exerciseSetService";
import { TExerciseSet } from "@/types/set.type";

import { FC } from "react";
import ExerciseSet from "./ExerciseSet";
import { useExerciseContext } from "./context/ExerciseContext";
import { View, Text, TouchableOpacity } from "react-native";
import Table from "../Table";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// foto? ExerciseName: Bench Press  removeButton: trashcan
// SET       WEIGHT     REPS   checkmark
// 1         100kg      10      </
// 2         100kg      10      </
// 3         100kg      10      </

//             + Add Set
//             + Add Exercise

interface ExerciseActionProps {}

const ExerciseAction: FC<ExerciseActionProps> = ({}) => {
	let { exercise, rerenderExercises, openCreateExerciseModal } =
		useExerciseContext();

	const addSetHandler = async () => {
		const lastSet: TExerciseSet | undefined = exercise.exerciseSets
			?.sort((a, b) => (a.setNr === b.setNr ? 0 : a.setNr > b.setNr ? 1 : -1))
			?.pop();
		rerenderExercises();
	};

	const addExerciseHandler = async () => {
		openCreateExerciseModal();
	};
	return (
		<>
			<View className="space-y-2">
				<View className="bg-[#1A2E4F] text-white inline-block p-2 rounded-md">
					<Text>{exercise.name}</Text>
				</View>

				<Table header={["SET", "WEIGHT", "REPS", <EvilIcons />, <AntDesign />]}>
					{exercise.exerciseSets
						?.sort((a, b) =>
							a.setNr === b.setNr ? 0 : a.setNr > b.setNr ? 1 : -1
						)
						.map((set, i, sets) => (
							<ExerciseSet
								key={i.toString()}
								set={set}
								index={i}
								removeOption={i + 1 === sets.length}
							/>
						))}
				</Table>

				<TouchableOpacity
					onPress={addSetHandler}
					className="text-white text-sm bg-[#1A2E4F] py-1 rounded-md w-full"
				>
					<View>
						<Text>+ Set</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={addExerciseHandler}
					className="text-white text-sm bg-[#1A2E4F] py-1 rounded-md w-full"
				>
					<View>
						<Text>+ Exercise</Text>
					</View>
				</TouchableOpacity>
			</View>
		</>
	);
};

export default ExerciseAction;
