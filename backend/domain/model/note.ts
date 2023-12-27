import { TNote } from '@/types/note.type';

export class Note {
    readonly id: string;
    readonly note: string;
    readonly workoutId: string;
    readonly exerciseId: string;

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