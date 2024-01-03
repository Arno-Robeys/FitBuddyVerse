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

const getWorkoutByIdForWorkoutPage = async ({ id }: { id: string }) => {
	if (!Number.isInteger(parseInt(id)))
		throw new Error("Id must be numeric and whole");
	const workout = await workoutDB.getWorkoutByIdForWorkoutPage(parseInt(id));
	return workout;
};
export default {
	getWorkoutByIdIncludeAll,
	getWorkoutById,
	getWorkoutByIdForWorkoutPage,
};
