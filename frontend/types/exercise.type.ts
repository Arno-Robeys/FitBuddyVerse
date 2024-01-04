import { TNote } from './details.type';
import { TExerciseSet } from './set.type';

export type TExercise = {
    id: number;
    name: string;
    type: string;
    equipment: string;
    exerciseSets?: TExerciseSet[];
    notes?: TNote[];
};
