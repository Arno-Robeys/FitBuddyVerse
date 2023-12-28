import database from "./prisma/db";
import { Exercise } from "@/model/exercise";

const getExerciseById = async (id: number): Promise<Exercise> => {
    return await database.exercise.findUnique({
        where: {
            id: id,
        },
    });
}

export default {
    getExerciseById,
};
