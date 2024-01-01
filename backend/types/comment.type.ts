import { Profile } from "@/domain/model/profile";
import { Workout } from "@/domain/model/workout";

export type TWorkoutComment = {
    id?: number;
    workoutId: number;
    profileId: number;
    message: string;
    createdAt: Date;
    profile?: Profile;
    workout?: Workout;
};

export type TInputWorkoutComment = {
    id: string;
    workoutId: string;
    profileId: string;
    message: string;
    createdAt: string;
};