export type TExerciseSet = {
    id?: number;
    workoutId?: number;
    exerciseId: number;
    setNr: number;
    repetitions: number;
    weightKG: number;
    isCompleted?: boolean;
};
