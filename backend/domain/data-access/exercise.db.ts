import database from "./prisma/db";
import { Exercise } from "@/model/exercise";

const getExerciseById = async (id: number): Promise<Exercise> => {
	return await database.exercise.findUnique({
		where: {
			id: id,
		},
	});
};

const getExerciseByIdFromUser = async (
	id: number,
	profileId: number
): Promise<Exercise | null> => {
	return await database.exercise.findUnique({
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
	database.$queryRaw`select workout_id,set_id,repetitions,"weightKG",set_volume,set_volume_string
    from
        (select
      "Workout".id as workout_id,
      "ExerciseSet".id as set_id,
      "ExerciseSet".repetitions::integer,
      "ExerciseSet"."weightKG",
      max("ExerciseSet"."weightKG" * "ExerciseSet".repetitions) as set_volume,
      "ExerciseSet"."weightKG" || ' x ' || "ExerciseSet".repetitions as set_volume_string,
      ROW_NUMBER() OVER (PARTITION BY "ExerciseSet".repetitions ORDER BY repetitions,"weightKG" DESC) AS rn
    from
      "Workout"
      join "ExerciseSet" on "Workout".id = "ExerciseSet"."workoutId"
    where
      "ExerciseSet"."exerciseId" = ${exerciseId}
      and "Workout"."profileId" = ${profileId}
    group by
      "Workout".id,
      "ExerciseSet".id,
      "ExerciseSet"."weightKG",
      "ExerciseSet".repetitions
    order by repetitions, "weightKG") as sub
    where rn = 1`;
    
export default {
	getExerciseById,
	getExerciseByIdFromUser,
	getWorkoutGraphForExercise,
	getPersonalBestForExercise,
};
