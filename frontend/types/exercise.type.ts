import { TMuscle } from './muscle.type';
import { TExerciseSet } from './set.type';

export type TExercise = {
    id: number;
    name: string;
    type: string;
    equipment: string;
    exerciseSets?: TExerciseSet[];
    muscles?: TMuscle[];
};
