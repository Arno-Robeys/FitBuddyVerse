/*import { Workout } from "../model/workout";
import database from "./prisma/db";

const getWorkoutByIdIncludeAll = async (id: number): Promise<Workout> => {
	const workout = await database.workout.findUnique({
		where: {
			id: id,
		},
		include: {
			ExerciseNote: true,
			ExerciseSet: { include: { exercise: true } },
			LikedBy: true,
			profile: true,
			WorkoutComment: { include: { profile: true } },
		},
	});
	return Workout.From(workout);
};

const getWorkoutByIdForWorkoutPage = async (id: number) => {
	const workout = await database.workout.findUnique({
		where: {
			id: id,
		},
		include: {
			ExerciseSet: { include: { exercise: {include: { ExerciseNote: {select: {id: true, note: true}}}} } },
			LikedBy: true,
			profile: true
		},
		});

	return Workout.formatWorkout(workout);
};

const getWorkoutById = async (id: number): Promise<Workout> => {
	const workout = await database.workout.findUnique({
		where: {
			id: id,
		},
	});
	return Workout.From(workout);
};

const createWorkout = async (workout: Workout) => {
	return await database.workout.create({
		data: {
			name: workout.name,
			createdAt: workout.createdAt,
			durationSec: workout.durationSec,
			volumeKG: workout.volumeKG,
			profileId: workout.profileId,
		},
	});
};

export default {
	getWorkoutByIdIncludeAll,
	getWorkoutById,
	getWorkoutByIdForWorkoutPage,
	createWorkout,
};*/

import database from "./prisma/db";

const getAllWorkouts = async () => {
	return await database.workout.findMany({
		include: {
			profile: true,
			ExerciseWorkout: { include: { exercise: true, ExerciseSet: true } },
		},
	});
}

export default {
	getAllWorkouts
}