// foto? ExerciseName: Bench Press  removeButton: trashcan
// SET       WEIGHT     REPS   checkmark
// 1         100kg      10      </
// 2         100kg      10      </
// 3         100kg      10      </

//             + Add Set
//             + Add Exercise

import React, { FC, ReactNode } from "react";
import ExerciseContext from "./context/ExerciseContext";
import { TExercise } from "@/types/exercise.type";
import { TExerciseSet } from "@/types/set.type";
import { View } from "react-native";

interface ExerciseProps {
	exercise: TExercise;
	image?: ReactNode;
	action?: ReactNode;
	addExerciseSetToUpdate: (exercise: TExerciseSet) => void;
	removeExerciseSetFromUpdate: (exercise: TExerciseSet) => void;
	rerenderExercises: () => void;
	openCreateExerciseModal: () => void;
}
const Exercise: FC<ExerciseProps> = ({
	exercise,
	image,
	action,
	addExerciseSetToUpdate,
	removeExerciseSetFromUpdate,
	rerenderExercises,
	openCreateExerciseModal,
}) => {
	return (
		<ExerciseContext.Provider
			value={{
				exercise,
				addExerciseSetToUpdate,
				removeExerciseSetFromUpdate,
				rerenderExercises,
				openCreateExerciseModal,
			}}
		>
			<View className="exercise-card">
				{image}
				{action}
			</View>
		</ExerciseContext.Provider>
	);
};
export default Exercise;
