import database from "./prisma/db";
import { Workout } from "../model/workout";

const getWorkoutById = async (id: number): Promise<Workout> => {
	const workout = await database.workout.findUnique({
		where: {
			id: id,
		},
	});
	return Workout.From(workout);
};

const getWorkoutByIdIncludeAll = async (id: number): Promise<Workout> => {
	const workout = await database.workout.findUnique({
		where: {
			id: id,
		},
		include: {
			profile: true,
			WorkoutDetails: { include: { exercise: true, ExerciseSet: true } },
			LikedBy: true,
			WorkoutComment: { include: { profile: true } },
		},
	});
	return Workout.From(workout);
};

const getWorkoutByIdForWorkoutPage = async (id: number): Promise<Workout> => {
	const workout = await database.workout.findUnique({
		where: {
			id: id,
		},
		include: {
			profile: true,
			WorkoutDetails: { include: { exercise: true, ExerciseSet: true } },
			LikedBy: true
		},
	});
	return Workout.From(workout);
}

const getAllFollowingWorkouts = async (profileId: number): Promise<Workout[]> => {
	const workouts = await database.workout.findMany({
		where: {
			profile: {
				followedBy: {
					some: {
						id: profileId
					}
				}
			}
		},
		include: {
			profile: true,
			WorkoutDetails: { include: { exercise: true, ExerciseSet: true } },
			LikedBy: true
		}
	});
	return workouts.map(Workout.From);
}

const createWorkout = async (workout: Workout): Promise<Workout> => {
	const w = await database.workout.create({
		data: {
			name: workout.name,
			durationSec: workout.durationSec,
			createdAt: workout.createdAt,
			volumeKG: workout.volumeKG,
			profileId: workout.profileId,
			WorkoutDetails: {
				create: workout.workoutDetails?.map((wd) => {
					return {
						ExerciseSet: {
							create: wd.exerciseSets?.map((es) => {
								return {
									weightKG: es.weightKG,
									setNr: es.setNr,
									repetitions: es.repetitions,
								};
							}),
						},
						exerciseId: wd.exerciseId,
						note: wd.note ?? null,
					};
				}),
			},
		},
		include: {
			WorkoutDetails: { include: { exercise: true, ExerciseSet: true } },
		},
	});

	return Workout.From(w);
};

export default {
	getWorkoutByIdForWorkoutPage,
	createWorkout,
	getWorkoutById,
	getWorkoutByIdIncludeAll,
	getAllFollowingWorkouts
}