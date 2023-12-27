import { TWorkout } from '@/types/workout.type';
import { WorkoutComment } from '@/model/comment';
import { ExerciseSet } from '@/model/set';
import { Profile } from '@/model/profile';
import { Exercise } from '@/model/exercise';

export class Workout {
    readonly id: string;
    readonly name: string;
    readonly createdAt: Date;
    readonly durationSec: number;
    readonly likeCount: number;
    readonly volumeKG: number;
    readonly profileId: string;
    readonly workoutComments?: WorkoutComment[];
    readonly exercise?: Exercise[];
    readonly exerciseSets?: ExerciseSet[];
    readonly likedBy?: Profile[];

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
    }

    static From(workout: TWorkout): Workout {
        return new Workout(workout)
    }
}