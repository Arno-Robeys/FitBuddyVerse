import exerciseDb from "../domain/data-access/exercise.db";
import { Exercise } from "../domain/model/exercise";

const getExerciseById = async (exerciseId: number): Promise<Exercise> => {
    const exercise = await exerciseDb.getExerciseById(exerciseId);
    if (!exercise) throw new Error("Exercise not found");
    return exercise;
}

export default {
    getExerciseById,
}
