import { Muscle } from '@/domain/model/muscle';
import { ExerciseSet } from '@/domain/model/set';

export type TExercise = {
    id?: string;
    name: string;
    type: string;
    equipment: string;
    exerciseSets?: ExerciseSet[];
    muscles?: Muscle[];
};

export type TInputExercise = {
    id: string;
    name: string;
    type: string;
    equipment: string;
    muscleIds: string[];
};