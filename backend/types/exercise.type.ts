import { ExerciseSet } from '@/domain/model/set';
import { Note } from '@/domain/model/note';

export type TExercise = {
    id?: string;
    name: string;
    type: string;
    equipment: string;
    exerciseSets?: ExerciseSet[];
    notes?: Note[];
};

export type TInputExercise = {
    id: string;
    name: string;
    type: string;
    equipment: string;
    muscleIds: string[];
};