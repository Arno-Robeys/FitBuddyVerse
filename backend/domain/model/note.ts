import { TNote } from '@/types/note.type';

export class Note {
    readonly id: number;
    readonly note: string;
    readonly workoutId: number;
    readonly exerciseId: number;

    constructor({ id, note, workoutId, exerciseId }: TNote) {
        this.id = id;
        this.note = note;
        this.workoutId = workoutId;
        this.exerciseId = exerciseId;
    }

    static From(note: TNote): Note {
        return new Note(note)
    }

}