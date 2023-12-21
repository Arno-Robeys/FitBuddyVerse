import { WorkoutComment } from "@/domain/model/comment";
import { ExerciseSet } from "@/domain/model/set";
import { Profile } from "@/domain/model/profile";

export type TWorkout = {
	id?: string;
	name: string;
	createdAt: Date;
	durationSec: number;
	likeCount: number;
	volumeKG: number;
	profileId: string;
	workoutComments?: WorkoutComment[];
	exerciseSets?: ExerciseSet[];
	likedBy?: Profile[];
};
export type TInputWorkout = {
	id: string;
	name: string;
	createdAt: string;
	durationSec: number;
	likeCount: number;
	volumeKG: number;
	profileId: string;
};