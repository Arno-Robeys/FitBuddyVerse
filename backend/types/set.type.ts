export type TExerciseSet = {
    id?: string;
    workoutId: string;
    exerciseId: string;
    setNr: number;
    repetitions: number;
    weightKG: number;
}
export type TInputExerciseSet = {
    id: string;
    workoutId: string;
    exerciseId: string;
    setNr: number;
    repetitions: number;
    weightKG: number;
}