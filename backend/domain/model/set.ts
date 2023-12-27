import { TExerciseSet } from '@/types/set.type';

export class ExerciseSet {
    readonly id: string;
    readonly workoutId: string;
    readonly exerciseId: string;
    readonly setNr: number;
    readonly repetitions: number;
    readonly weightKG: number;

    constructor({
        id,
        workoutId,
        exerciseId,
        setNr,
        repetitions,
        weightKG,
    }: TExerciseSet) {
        this.id = id;
        this.workoutId = workoutId;
        this.exerciseId = exerciseId;
        this.setNr = setNr;
        this.repetitions = repetitions;
        this.weightKG = weightKG;
    }

    static From(exerciseSet: TExerciseSet): ExerciseSet {
        return new ExerciseSet(exerciseSet)
    }
}