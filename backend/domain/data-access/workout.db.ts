import { Workout } from "../model/workout";
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
	return await database.$queryRaw`SELECT
		w.id AS "workoutId",
		w.name AS "workoutName",
		w."createdAt" AS "workoutCreatedAt",
		w."durationSec" AS "workoutDurationSec",
		w."volumeKG" AS "workoutVolumeKG",
		w."profileId" AS "workoutProfileId",
		JSON_AGG(
		JSON_BUILD_OBJECT(
			'exerciseId', e.id,
			'exerciseName', e.name,
			'exerciseType', e.type,
			'exerciseEquipment', e.equipment,
			'exerciseDescription', e.description,
			'exerciseNote', n.note,
			'sets', sets_agg.sets
		)
		) AS exercises
	FROM
		"Exercise" e
		LEFT JOIN "ExerciseSet" s ON e.id = s."exerciseId"
		LEFT JOIN "Workout" w ON s."workoutId" = w.id
		LEFT JOIN "ExerciseNote" n ON e.id = n."exerciseId" AND w.id = n."workoutId"
		LEFT JOIN (
		SELECT
			s."exerciseId" AS "exerciseId",
			s."workoutId" AS "workoutId",
			JSON_AGG(
			JSON_BUILD_OBJECT(
				'setId', s.id,
				'setNr', s."setNr",
				'repetitions', s.repetitions,
				'weightKG', s."weightKG"
			) ORDER BY s."setNr"
			) AS sets
		FROM
			"ExerciseSet" s
		GROUP BY
			s."exerciseId",
			s."workoutId"
		) sets_agg ON e.id = sets_agg."exerciseId" AND w.id = sets_agg."workoutId"
	WHERE
		w.id = ${id}
	GROUP BY
		w.id,
		w.name,
		w."createdAt",
		w."durationSec",
		w."volumeKG",
		w."profileId"
	ORDER BY
		"workoutCreatedAt";`;
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
	getWorkoutByIdForWorkoutPage,
};
