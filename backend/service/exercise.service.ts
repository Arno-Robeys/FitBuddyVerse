import exerciseDb from "../domain/data-access/exercise.db";
import { Exercise } from "../domain/model/exercise";

const getExerciseById = async (exerciseId: number): Promise<Exercise> => {
    const exercise = await exerciseDb.getExerciseById(exerciseId);
    if (!exercise) throw new Error("Exercise not found");
    return exercise;
}

const getExerciseByIdFromUser = async (exerciseId: number, profileId: number): Promise<Exercise | null> => {
    const exercise = await exerciseDb.getExerciseByIdFromUser(exerciseId, profileId);
    return exercise;
}

export default {
    getExerciseById,
    getExerciseByIdFromUser,
}
