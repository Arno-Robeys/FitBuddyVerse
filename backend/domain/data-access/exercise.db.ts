import database from "./prisma/db";
import { Exercise } from "../model/exercise";

const getExerciseById = async (id: number): Promise<Exercise> => {
	const exercise = await database.exercise.findUnique({
		where: {
			id: id,
		},
	});
	return Exercise.From(exercise);
};

const getAllExercises = async (): Promise<Exercise[]> => {
	const exercises = await database.exercise.findMany();
	return exercises.map(Exercise.From);
};

const getExerciseByIdFromUser = async (
	id: number,
	profileId: number
): Promise<Exercise | null> => {
	const exercise = await database.exercise.findUnique({
		where: {
			id: id,
		},
		include: {
			ExerciseNote: {
				where: {
					id: profileId,
				},
			},
			ExerciseSet: {
				where: {
					id: profileId,
				},
			},
		},
	});
	return exercise ? Exercise.From(exercise) : null;
};

const getWorkoutGraphForExercise = async (
	exerciseId: number,
	profileId: number
) => database.$queryRaw`select
    w.id,
    w."volumeKG",
    w."createdAt",
    max(
    e."weightKG" * (1 + e.repetitions::float / 30)
    ) as one_rep_max,
    max(e."weightKG") as max_weight,
    sum(e.repetitions)::integer as total_reps,
    max(e."weightKG" * e.repetitions) as best_set_volume
    from
    "Workout" w
    join "ExerciseSet" e on w.id = e."workoutId"
    where
    e."exerciseId" = ${exerciseId}
    and w."profileId" = ${profileId}
    group by
    w.id,
    w."volumeKG",
    w."createdAt"
    order by "createdAt"`;

const getPersonalBestForExercise = async (
	exerciseId: number,
	profileId: number
) =>
	database.$queryRaw`WITH exercise_set_data AS (
    SELECT
      "ExerciseSet".repetitions::integer,
      "ExerciseSet"."weightKG",
      "ExerciseSet"."weightKG" * "ExerciseSet".repetitions AS set_volume,
      "ExerciseSet"."weightKG" || ' x ' || "ExerciseSet".repetitions AS set_volume_string
    FROM
      "Workout"
      JOIN "ExerciseSet" ON "Workout".id = "ExerciseSet"."workoutId"
    WHERE
      "ExerciseSet"."exerciseId" = ${exerciseId}
      AND "Workout"."profileId" = ${profileId}
    GROUP BY
      "Workout".id,
      "ExerciseSet".id,
      "ExerciseSet"."weightKG",
      "ExerciseSet".repetitions
    ORDER BY
      "Workout".id
  ),
  max_values AS (
    SELECT
      ROUND(MAX("weightKG" * (1 + repetitions / 30::float))::numeric, 2) AS best_one_rep_max,
      MAX("weightKG")::int AS heaviest_weight,
      MAX("set_volume")::int AS best_set_volume,
      (
        SELECT
          "set_volume_string"
        FROM
          exercise_set_data
        ORDER BY
          "set_volume" DESC
        LIMIT 1
      ) AS set_volume_string
    FROM
      exercise_set_data
  )
  SELECT
    best_one_rep_max,
    heaviest_weight,
    best_set_volume,
    set_volume_string
  FROM
    max_values;`;

const getExerciseHistory = async (
	exerciseId: number,
	profileId: number
) => database.$queryRaw`SELECT
  w.id AS "workoutId",
  w.name AS "workoutName",
  w."createdAt" AS "workoutCreatedAt",
  w."durationSec" AS "workoutDurationSec",
  w."volumeKG" AS "workoutVolumeKG",
  w."profileId" AS "workoutProfileId",
  e.name AS "exerciseName",
  e.type AS "exerciseType",
  e.equipment AS "exerciseEquipment",
  e.description AS "exerciseDescription",
  n.note AS "exerciseNote",
  JSON_AGG(JSON_BUILD_OBJECT('setId',s.id,'setNr',s."setNr",'repetitions',s.repetitions,'weightKG',s."weightKG") ORDER BY "setNr") AS sets
  FROM
  "Exercise" e
  LEFT JOIN "ExerciseSet" s ON e.id = s."exerciseId"
  LEFT JOIN "Workout" w ON s."workoutId" = w.id
  LEFT JOIN "ExerciseNote" n ON e.id = n."exerciseId"
    AND w.id = n."workoutId"
  WHERE
  s."exerciseId" = ${exerciseId}
  AND w."profileId" = ${profileId}
  GROUP BY
  w.id,
  w.name,
  "workoutCreatedAt",
  e.name,
  e.type,
  w.name,
  w."createdAt",
  w."durationSec",
  w."volumeKG",
  w."profileId",
  e.name,
  w.id,
  e.equipment,
  e.description,
  n.note
  ORDER BY
  "workoutCreatedAt"`;

export default {
	getExerciseById,
	getExerciseByIdFromUser,
	getWorkoutGraphForExercise,
	getPersonalBestForExercise,
	getExerciseHistory,
	getAllExercises,
};
