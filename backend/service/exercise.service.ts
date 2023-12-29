import exerciseDb from "../domain/data-access/exercise.db";
import { Exercise } from "../domain/model/exercise";

const getExerciseById = async (exerciseId: number): Promise<Exercise> => {
    const exercise = await exerciseDb.getExerciseById(exerciseId);
    if (!exercise) throw new Error("Exercise not found");
    return exercise;
}

const getAllExercises = async (): Promise<Exercise[]> => {
    const exercises = await exerciseDb.getAllExercises();
    return exercises;
}

const getExerciseByIdFromUser = async (exerciseId: number, profileId: number): Promise<Exercise | null> => {
    const exercise = await exerciseDb.getExerciseByIdFromUser(exerciseId, profileId);
    return exercise;
}
const getWorkoutGraphForExercise = async (exerciseId: number, profileId: number) => {
    const graph = await exerciseDb.getWorkoutGraphForExercise(exerciseId, profileId);
    return graph;
}
const getPersonalBestForExercise = async (exerciseId: number, profileId: number) => {
    const personal_best = await exerciseDb.getPersonalBestForExercise(exerciseId, profileId);
    return personal_best;
}
const getExerciseHistory = async (exerciseId: number, profileId: number) => {
    const exercise_history = await exerciseDb.getExerciseHistory(exerciseId, profileId);
    return exercise_history;
}
export default {
    getExerciseById,
    getExerciseByIdFromUser,
    getWorkoutGraphForExercise,
    getPersonalBestForExercise,
    getExerciseHistory,
    getAllExercises
}
