/*import { TExerciseSet } from "../../types/set.type";
import {
	ExerciseSet as PrismaExerciseSet,
	Exercise as PrismaExercise,
} from "@prisma/client";
import { Exercise } from "./exercise";

export class ExerciseSet {
	readonly id: number;
	readonly workoutId: number;
	readonly exerciseId: number;
	readonly setNr: number;
	readonly repetitions: number;
	readonly weightKG: number;
	readonly exercise?: Exercise;

	constructor({
		id,
		workoutId,
		exerciseId,
		setNr,
		repetitions,
		weightKG,
		exercise,
	}: TExerciseSet) {
		this.id = id;
		this.workoutId = workoutId;
		this.exerciseId = exerciseId;
		this.setNr = setNr;
		this.repetitions = repetitions;
		this.weightKG = weightKG;
		this.exercise = exercise;
	}

	static From(
		exerciseSet: PrismaExerciseSet & {
			exercise?: PrismaExercise;
		}
	): ExerciseSet {
		return new ExerciseSet({
			...exerciseSet,
			exercise: exerciseSet.exercise
				? Exercise.From(exerciseSet.exercise)
				: null,
		});
	}
}
*/