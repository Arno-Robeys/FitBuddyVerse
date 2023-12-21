export type TWorkoutComment = {
    id?: string;
    workoutId: string;
    profileId: string;
    message: string;
    createdAt: Date;
};

export type TInputWorkoutComment = {
    id: string;
    workoutId: string;
    profileId: string;
    message: string;
    createdAt: string;
};