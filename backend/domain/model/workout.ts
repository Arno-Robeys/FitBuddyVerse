import { TWorkout } from "@/types/workout.type";
import { WorkoutComment } from "@/model/comment";
import { ExerciseSet } from "@/model/set";
import { Profile } from "@/model/profile";
import { Exercise } from "@/model/exercise";
import { Note } from "./note";
import {
	WorkoutComment as PrismaWorkoutComment,
	ExerciseSet as PrismaExerciseSet,
	Workout as PrismaWorkout,
	Profile as PrismaProfile,
	ExerciseNote as PrismaExerciseNote,
	Exercise as PrismaExercise,
} from "@prisma/client";

export class Workout {
	readonly id: number;
	readonly name: string;
	readonly createdAt: Date;
	readonly durationSec: number;
	readonly volumeKG: number;
	readonly profileId: number;
	readonly workoutComments?: WorkoutComment[];
	readonly exercises?: Exercise[];
	readonly exerciseSets?: ExerciseSet[];
	readonly likedBy?: Profile[];
	readonly profile?: Profile;
	readonly exerciseNotes?: Note[];

	constructor({
		id,
		name,
		createdAt,
		durationSec,
		volumeKG,
		profileId,
		workoutComments,
		exerciseSets,
		likedBy,
		exercises,
		profile,
		exerciseNotes,
	}: TWorkout) {
		this.id = id;
		this.name = name;
		this.createdAt = createdAt;
		this.durationSec = durationSec;
		this.volumeKG = volumeKG;
		this.profileId = profileId;
		this.workoutComments = workoutComments;
		this.exerciseSets = exerciseSets;
		this.likedBy = likedBy;
		this.exercises = exercises;
		this.profile = profile;
		this.exerciseNotes = exerciseNotes;
	}

	static From(
		workout: PrismaWorkout & { WorkoutComment?: PrismaWorkoutComment[] } & {
			ExerciseSet?: PrismaExerciseSet[];
		} & { LikedBy?: PrismaProfile[] } & {
			ExerciseNote?: PrismaExerciseNote[];
		} & { Exercise?: PrismaExercise[] } & { Profile?: PrismaProfile }
	): Workout {
		return new Workout({
			...workout,
			workoutComments: workout.WorkoutComment,
			exerciseSets: workout.ExerciseSet,
			likedBy: workout.LikedBy,
			exercises: workout.Exercise,
			profile: workout.Profile,
			exerciseNotes: workout.ExerciseNote,
		});
	}
}
