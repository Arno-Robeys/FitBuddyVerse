import { Workout } from "../model/workout";
import database from "./prisma/db";

const getWorkoutByIdIncludeAll = async (id: number): Promise<Workout> => {
	const workout = await database.workout.findUnique({
		where: {
			id: id,
		},
		include: {
			Exercise: true,
			ExerciseNote: true,
			ExerciseSet: { include: { exercise: true } },
			LikedBy: true,
			profile: true,
			WorkoutComment: true,
		},
	});
	return Workout.From(workout);
};

const getWorkoutById = async (id: number): Promise<Workout> => {
	const workout = await database.workout.findUnique({
		where: {
			id: id,
		},
	});
	return Workout.From(workout);
};

export default {
	getWorkoutByIdIncludeAll,
	getWorkoutById,
};
