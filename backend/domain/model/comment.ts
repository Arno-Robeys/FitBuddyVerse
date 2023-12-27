import { TWorkoutComment } from "@/types/comment.type";

export class WorkoutComment{
    readonly id: string;
    readonly workoutId: string;
    readonly profileId: string;
    readonly message: string;
    readonly createdAt: Date;

    constructor({
        id,
        workoutId,
        profileId,
        message,
        createdAt,
    }: TWorkoutComment) {
        this.id = id;
        this.workoutId = workoutId;
        this.profileId = profileId;
        this.message = message;
        this.createdAt = createdAt;
    }

    static From(workoutComment: TWorkoutComment): WorkoutComment {
        return new WorkoutComment(workoutComment)
    }
}