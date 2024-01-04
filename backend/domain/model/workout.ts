/*import { TWorkout } from "../../types/workout.type";
import { WorkoutComment } from "../model/comment";
import { ExerciseSet } from "../model/set";
import { Profile } from "../model/profile";
import { Note } from "./note";
import {
	WorkoutComment as PrismaWorkoutComment,
	ExerciseSet as PrismaExerciseSet,
	Workout as PrismaWorkout,
	Profile as PrismaProfile,
	ExerciseNote as PrismaExerciseNote,
} from "@prisma/client";

export class Workout {
	readonly id: number;
	readonly name: string;
	readonly createdAt: Date;
	readonly durationSec: number;
	readonly volumeKG: number;
	readonly profileId: number;
	readonly workoutComments?: WorkoutComment[];
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
		this.profile = profile;
		this.exerciseNotes = exerciseNotes;
	}

	static From(
		workout: PrismaWorkout & { WorkoutComment?: PrismaWorkoutComment[] } & {
			ExerciseSet?: PrismaExerciseSet[];
		} & { LikedBy?: PrismaProfile[] } & {
			ExerciseNote?: PrismaExerciseNote[];
		} & { profile?: PrismaProfile }
	): Workout {
		return new Workout({
			...workout,
			workoutComments: workout?.WorkoutComment?.map(WorkoutComment.From),
			exerciseSets: workout?.ExerciseSet?.map(ExerciseSet.From),
			likedBy: workout?.LikedBy?.map(Profile.From),
			profile: workout.profile ? Profile.From(workout.profile) : null,
			exerciseNotes: workout?.ExerciseNote?.map(Note.From),
		});
	}

	static formatWorkout(workout) {
        return {
                id: workout.id,
                name: workout.name,
                createdAt: workout.createdAt,
                durationSec: workout.durationSec,
                volumeKG: workout.volumeKG,
                exercises: workout.ExerciseSet.map((exerciseSet) => ({
                    id: exerciseSet.exercise.id,
                    name: exerciseSet.exercise.name,
                    type: exerciseSet.exercise.type,
                    equipment: exerciseSet.exercise.equipment,
					description: exerciseSet.exercise.description,
                    sets: [
                        {
                            id: exerciseSet.id,
                            workoutId: exerciseSet.workoutId,
                            exerciseId: exerciseSet.exerciseId,
                            setNr: exerciseSet.setNr,
                            repetitions: exerciseSet.repetitions,
                            weightKG: exerciseSet.weightKG,
                        },
                    ],
                    notes: exerciseSet.exercise.ExerciseNote.map((note) => ({
                        id: note.id,
                        note: note.note,
                    })),
                })),
                likedBy: workout?.LikedBy?.map(Profile.From),
                profile: Profile.From(workout.profile),
        };
    }
}
*/