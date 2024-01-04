import database from "./prisma/db";
import { ExerciseSet } from "../model/set";


const createSet = async (set: ExerciseSet): Promise<ExerciseSet> => {
    const createdSets = await database.exerciseSet.create({
        data: {
            weightKG: set.weightKG,
            setNr: set.setNr,
            repetitions: set.repetitions,
            exerciseId: set.exerciseId,
            workoutId: set.workoutId
          }
    });

    return ExerciseSet.From(createdSets);
};

export default {
    createSet
};
