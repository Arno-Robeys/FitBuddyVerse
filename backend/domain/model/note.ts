import { TNote } from "@/types/note.type";
import { Workout } from "./workout";
import { Exercise } from "./exercise";
import {
	Exercise as PrismaExercise,
	Workout as PrismaWorkout,
	ExerciseNote as PrismaNote,
} from "@prisma/client";

export class Note {
	readonly id: number;
	readonly note: string;
	readonly workoutId: number;
	readonly exerciseId: number;
	readonly workout?: Workout;
	readonly exercise?: Exercise;

	constructor({ id, note, workoutId, exerciseId, workout, exercise }: TNote) {
		this.id = id;
		this.note = note;
		this.workoutId = workoutId;
		this.exerciseId = exerciseId;
		this.workout = workout;
		this.exercise = exercise;
	}

	static From(
		note: PrismaNote & { workout: PrismaWorkout } & {
			exercise: PrismaExercise;
		}
	): Note {
		return new Note(note);
	}
}
