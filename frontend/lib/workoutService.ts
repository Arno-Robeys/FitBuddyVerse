import { TWorkoutExercise } from "@/types/workout.type";
import axios from "axios";

const getWorkoutDetailsById = async (id: string) => {
	return (
		await axios.get(
			process.env.EXPO_PUBLIC_URL + `/workouts/${id}/workout-page`
		)
	).data.workout;
};

const createWorkout = async (workout: TWorkoutExercise) => {
	return (
		await axios.post(process.env.EXPO_PUBLIC_URL + `/workouts/create`, workout)
	).data;
};

const getProfileFeed = async (profileId: number) => {
	return (
		await axios.get(
			process.env.EXPO_PUBLIC_URL + `/workouts/${profileId}/feed`
		)
	).data.workouts;
};

const likeWorkout = async (workoutId: string, profileId: string) => {
	return (
		await axios.get(
			process.env.EXPO_PUBLIC_URL + `/workouts/${workoutId}/like/${profileId}`
		)
	).data;
};

export default {
	getWorkoutDetailsById,
	createWorkout,
	getProfileFeed,
	likeWorkout
};
