import { ExerciseSet } from '@/model/set';
import { TExercise } from '@/types/exercise.type';
import { Muscle } from '@/model/muscle';

export class Exercise {
    readonly id: string;
    readonly name: string;
    readonly type: string;
    readonly equipment: string;
    readonly exerciseSets?: ExerciseSet[];
    readonly muscles?: Muscle[];

    constructor({ id, name, type, equipment, exerciseSets, muscles }: TExercise) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.equipment = equipment;
        this.exerciseSets = exerciseSets;
        this.muscles = muscles;
    }
}