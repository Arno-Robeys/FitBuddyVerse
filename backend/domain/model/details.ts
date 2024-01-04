import {WorkoutDetails as PrismaWorkoutDetails} from "@prisma/client";

export class WorkoutDetails {
	readonly id: number;
	readonly note: string;
	readonly workoutId: number;
	readonly exerciseId: number;

	constructor({ id, note, workoutId, exerciseId }: WorkoutDetails) {
		this.id = id;
		this.note = note;
		this.workoutId = workoutId;
		this.exerciseId = exerciseId;
	}

	static From(note: PrismaWorkoutDetails): WorkoutDetails {
		return new WorkoutDetails(note);
	}
}
