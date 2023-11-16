import { TWorkoutComment } from './comment.type';
import { TWorkout } from './workout.type';

export type TProfile = {
    id: number;
    email: string;
    username: string;
    password: string;
    workouts?: TWorkout[];
    workoutComments?: TWorkoutComment[];
    followedBy?: TProfile[];
    following?: TProfile[];
};
