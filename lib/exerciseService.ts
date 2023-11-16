import { TExercise } from '@/types/exercise.type';
import { TWorkout } from '@/types/workout.type';

async function getExerciseIDs(id: number, session: any): Promise<number[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/workouts/${id}/sets`, {
            headers: {
                authorization: 'Bearer ' + session?.user.accessToken,
            },
        });
        const data: TWorkout = await res.json();
        return [...new Set(data.exerciseSets?.map((set) => set.exerciseId))] as number[];
    } catch (err) {
        console.log(err);
    }
    return [];
}

async function getExerciseWithSets(id: number, session: any): Promise<TExercise> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/exercises/${id}/sets`, {
        headers: {
            authorization: 'Bearer ' + session?.user.accessToken,
        },
    });
    const data: TExercise = await res.json();
    return data as TExercise;
}

async function getExercise(id: number, session: any): Promise<TExercise> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/exercises/${id}`, {
        headers: {
            authorization: `bearer ${session?.user?.accessToken}`,
        },
    });
    const data: TExercise = await res.json();
    return data;
}

async function getExercises(session: any): Promise<TExercise[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/exercises`, {
        headers: {
            authorization: 'Bearer ' + session?.user.accessToken,
        },
    });
    const data: TExercise[] = await res.json();
    return data as TExercise[];
}

const createExercise = async ({ name, type, equipment }: Omit<TExercise, 'id'>, session: any) => {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + '/exercises', {
        method: 'POST',
        body: JSON.stringify({
            name,
            type,
            equipment,
        }),
        headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + session?.user.accessToken,
        },
    });
    const data = await res.json();
    return data;
};

const removeExercise = async (id: number, session: any) => {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + '/exercises', {
        method: 'DELETE',
        body: JSON.stringify({
            id,
        }),
        headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + session?.user.accessToken,
        },
    });
    const data = await res.json();
    return data;
};

export default { getExerciseIDs, getExercise, createExercise, getExercises, getExerciseWithSets };
