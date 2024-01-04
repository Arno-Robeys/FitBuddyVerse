
import {
	ExerciseSet as PrismaExerciseSet,
	Exercise as PrismaExercise,
} from "@prisma/client";
import { Exercise } from "./exercise";

export class ExerciseSet {
	readonly id: number;
	readonly workoutId: number;
	readonly workoutDetailsId: number;
	readonly setNr: number;
	readonly repetitions: number;
	readonly weightKG: number;
	readonly exercise?: Exercise;

	constructor({
		id,
		workoutId,
		workoutDetailsId,
		setNr,
		repetitions,
		weightKG,
		exercise,
	}: ExerciseSet) {
		this.id = id;
		this.workoutId = workoutId;
		this.workoutDetailsId = workoutDetailsId;
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
			exercise: exerciseSet?.exercise ? Exercise.From(exerciseSet.exercise) : null
		});
	}
}