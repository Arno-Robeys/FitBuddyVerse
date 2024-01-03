import { Workout } from "@/domain/model/workout";
import workoutDB from "../domain/data-access/workout.db";

const getWorkoutByIdIncludeAll = async ({
	id,
}: {
	id: string;
}): Promise<Workout> => {
	if (!Number.isInteger(parseInt(id)))
		throw new Error("Id must be numeric and whole");
	return workoutDB.getWorkoutByIdIncludeAll(parseInt(id));
};

const getWorkoutById = async ({ id }: { id: string }): Promise<Workout> => {
	if (!Number.isInteger(parseInt(id)))
		throw new Error("Id must be numeric and whole");
	return workoutDB.getWorkoutById(parseInt(id));
};
export default {
	getWorkoutByIdIncludeAll,
	getWorkoutById,
};
