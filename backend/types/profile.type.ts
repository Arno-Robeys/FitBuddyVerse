import { WorkoutComment } from '@/domain/model/comment';
import { Workout } from '@/domain/model/workout';
import { Profile } from '@/domain/model/profile';

export type TProfile = {
    id?: string;
    email: string;
    username: string;
    password: string;
    workouts?: Workout[];
    workoutComments?: WorkoutComment[];
    followedBy?: Profile[];
    following?: Profile[];
};
export type TInputProfile = {
    id: string;
    email: string;
    username: string;
    password: string;
};