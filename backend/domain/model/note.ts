/*import { TNote } from "@/types/note.type";
import {
	ExerciseNote as PrismaNote,
} from "@prisma/client";

export class Note {
	readonly id: number;
	readonly note: string;
	readonly workoutId: number;
	readonly exerciseId: number;

	constructor({ id, note, workoutId, exerciseId, workout, exercise }: TNote) {
		this.id = id;
		this.note = note;
		this.workoutId = workoutId;
		this.exerciseId = exerciseId;
	}

	static From(note: PrismaNote): Note {
		return new Note(note);
	}
}
*/