import { TWorkoutExercise } from "@/types/workout.type";
import axios from "axios";

const getWorkoutById = async (id: string) => {
	return (
		await axios.get(
			process.env.EXPO_PUBLIC_URL + `/workouts/${id}/workout-page`
		)
	).data.workout[0];
};

const createWorkout = async (workout: TWorkoutExercise) => {
	return (
		await axios.post(process.env.EXPO_PUBLIC_URL + `/workouts/create`, workout)
	).data;
};

export default {
	getWorkoutById,
	createWorkout,
};
