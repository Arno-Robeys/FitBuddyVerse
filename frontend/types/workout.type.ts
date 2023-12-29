import { TWorkoutComment } from './comment.type';
import { TExercise } from './exercise.type';
import { TProfile } from './profile.type';
import { TExerciseSet } from './set.type';

export type TWorkout = {
    id: number;
    name: string;
    createdAt: string;
    durationSec: number;
    volumeKG: number;
    profileId: number;
    workoutComments?: TWorkoutComment[];
    exerciseSets?: TExerciseSet[];
    likedBy?: TProfile[];
};

export type TWorkoutExercise = {
    id?: number;
    name: string;
    createdAt: string;
    durationSec: number;
    volumeKG: number;
    profileId: number;
    exercise?: TExercise[];
};
