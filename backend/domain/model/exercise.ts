import { ExerciseSet } from "../model/set";
import {
	Exercise as PrismaExercise,
	Workout as PrismaWorkout,
	ExerciseSet as PrismaExerciseSet,
} from "@prisma/client";
import { Workout } from "./workout";

export class Exercise {
	readonly id: number;
	readonly name: string;
	readonly type: string;
	readonly equipment: string;
	readonly exerciseSets?: ExerciseSet[];
	readonly workouts?: Workout[];

	constructor({
		id,
		name,
		type,
		equipment,
		exerciseSets,
		workouts,
	}: Exercise) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.equipment = equipment;
		this.exerciseSets = exerciseSets;
		this.workouts = workouts;
	}

	static From(
		exercise: PrismaExercise & {
			ExerciseSet?: PrismaExerciseSet[];
		} & { Workout?: PrismaWorkout[] }
	): Exercise {
		return new Exercise({
			...exercise,
			exerciseSets: exercise?.ExerciseSet?.map(ExerciseSet.From),
			workouts: exercise?.Workout?.map(Workout.From),
		});
	}
}
