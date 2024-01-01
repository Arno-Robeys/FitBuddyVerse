import { WorkoutComment } from "@/domain/model/comment";
import { ExerciseSet } from "@/domain/model/set";
import { Profile } from "@/domain/model/profile";
import { Note } from "@/domain/model/note";
import { Exercise } from "@/domain/model/exercise";

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
	exerciseNotes?: Note[];
	exercises?: Exercise[];
	profile?: Profile;
};
export type TInputWorkout = {
	id: number;
	name: string;
	createdAt: string;
	durationSec: number;
	volumeKG: number;
	profileId: number;
};
