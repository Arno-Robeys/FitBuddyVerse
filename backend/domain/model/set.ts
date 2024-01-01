import { TExerciseSet } from "../../types/set.type";
import {
	WorkoutComment as PrismaWorkoutComment,
	ExerciseSet as PrismaExerciseSet,
	Workout as PrismaWorkout,
	Profile as PrismaProfile,
	ExerciseNote as PrismaExerciseNote,
	Exercise as PrismaExercise,
} from "@prisma/client";
import { Workout } from "./workout";
import { Exercise } from "./exercise";

export class ExerciseSet {
	readonly id: number;
	readonly workoutId: number;
	readonly exerciseId: number;
	readonly setNr: number;
	readonly repetitions: number;
	readonly weightKG: number;
	readonly workout?: Workout;
	readonly exercise?: Exercise;

	constructor({
		id,
		workoutId,
		exerciseId,
		setNr,
		repetitions,
		weightKG,
		workout,
		exercise,
	}: TExerciseSet) {
		this.id = id;
		this.workoutId = workoutId;
		this.exerciseId = exerciseId;
		this.setNr = setNr;
		this.repetitions = repetitions;
		this.weightKG = weightKG;
		this.workout = workout;
		this.exercise = exercise;
	}

	static From(
		exerciseSet: PrismaExerciseSet & { workout: PrismaWorkout } & {
			exercise: PrismaExercise;
		}
	): ExerciseSet {
		return new ExerciseSet({
			...exerciseSet,
			workout: exerciseSet.workout ? Workout.From(exerciseSet.workout) : null,
			exercise: exerciseSet.exercise
				? Exercise.From(exerciseSet.exercise)
				: null,
		});
	}
}
