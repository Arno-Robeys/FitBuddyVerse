import { TExercise } from "./exercise.type";
import { TExerciseSet } from "./set.type";

export type TWorkoutDetails = {
    id?: number;
    workoutId: string;
    exerciseId: string;
    note: string;
    exerciseSets?: TExerciseSet[];
    exercise?: TExercise;
};