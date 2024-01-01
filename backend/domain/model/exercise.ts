import { ExerciseSet } from "@/model/set";
import { TExercise } from "@/types/exercise.type";
import { Note } from "./note";
import {
	Exercise as PrismaExercise,
	Workout as PrismaWorkout,
	ExerciseNote as PrismaNote,
	ExerciseSet as PrismaExerciseSet,
} from "@prisma/client";
import { Workout } from "./workout";

export class Exercise {
	readonly id: number;
	readonly name: string;
	readonly type: string;
	readonly equipment: string;
	readonly exerciseSets?: ExerciseSet[];
	readonly notes?: Note[];
	readonly workouts?: Workout[];

	constructor({
		id,
		name,
		type,
		equipment,
		exerciseSets,
		notes,
		workouts,
	}: TExercise) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.equipment = equipment;
		this.exerciseSets = exerciseSets;
		this.notes = notes;
		this.workouts = workouts;
	}

	static From(
		exercise: PrismaExercise & {
			ExerciseSet?: PrismaExerciseSet[];
		} & { ExerciseNote?: PrismaNote[] } & { Workout?: PrismaWorkout[] }
	): Exercise {
		return new Exercise({
			...exercise,
			exerciseSets: exercise.ExerciseSet,
			notes: exercise.ExerciseNote,
			workouts: exercise.Workout,
		});
	}
}
