import { WorkoutComment } from "@/domain/model/comment";
import { ExerciseSet } from "@/domain/model/set";
import { Profile } from "@/domain/model/profile";

export type TWorkout = {
	id?: number;
	name: string;
	createdAt: Date;
	durationSec: number;
	volumeKG: number;
	profileId: number;
	workoutComments?: WorkoutComment[];
	exerciseSets?: ExerciseSet[];
	likedBy?: Profile[];
};
export type TInputWorkout = {
	id: number;
	name: string;
	createdAt: string;
	durationSec: number;
	volumeKG: number;
	profileId: number;
};