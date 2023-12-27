import { ExerciseSet } from '@/model/set';
import { TExercise } from '@/types/exercise.type';
import { Note } from './note';
import { Workout } from '@prisma/client';

export class Exercise {
    readonly id: string;
    readonly name: string;
    readonly type: string;
    readonly equipment: string;
    readonly exerciseSets?: ExerciseSet[];
    readonly notes?: Note[];
    readonly workouts?: Workout[];

    constructor({ id, name, type, equipment, exerciseSets }: TExercise) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.equipment = equipment;
        this.exerciseSets = exerciseSets;
    }

    static From(exercise: TExercise): Exercise {
        return new Exercise(exercise)
    }
}