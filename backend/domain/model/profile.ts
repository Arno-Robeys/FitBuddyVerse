import { TProfile } from '@/types/profile.type';
import { WorkoutComment } from '@/model/comment';
import { Workout } from '@/model/workout';

export class Profile {
    readonly id: string;
    readonly email: string;
    readonly username: string;
    readonly password: string;
    readonly workouts?: Workout[]
    readonly workoutComments?: WorkoutComment[]
    readonly followedBy?: Profile[]
    readonly following?: Profile[]

    constructor({
        id,
        email,
        username,
        password,
        workouts,
        workoutComments,
        followedBy,
        following
    }: TProfile) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.workouts = workouts;
        this.workoutComments = workoutComments;
        this.followedBy = followedBy;
        this.following = following;
    }
}