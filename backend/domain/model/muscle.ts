import { TMuscle } from '@/types/muscle.type';

export class Muscle {
    readonly id: string;
    readonly name: string;

    constructor({ id, name }: TMuscle) {
        this.id = id;
        this.name = name;
    }
}