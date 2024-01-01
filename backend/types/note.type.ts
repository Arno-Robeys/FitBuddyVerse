import { Exercise } from "@/domain/model/exercise";
import { Workout } from "@/domain/model/workout";

export type TNote = {
    id?: number;
    workoutId: number;
    exerciseId: number;
    note: string;
    workout?: Workout;
    exercise?: Exercise;
};