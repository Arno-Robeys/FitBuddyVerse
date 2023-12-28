import database from "./prisma/db";
import { Exercise } from "@/model/exercise";

const getExerciseById = async (id: number): Promise<Exercise> => {
    return await database.exercise.findUnique({
        where: {
            id: id,
        },
    });
}

const getExerciseByIdFromUser = async (id: number, profileId: number): Promise<Exercise | null> => {
    return await database.exercise.findUnique({
        where: {
            id: id,
        },
        include: {
            ExerciseNote: {
                where: {
                    id: profileId,
                },
            },
            ExerciseSet: {
                where: {
                    id: profileId,
                },
            },
        },
    });
}

export default {
    getExerciseById,
    getExerciseByIdFromUser,
};
