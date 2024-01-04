import axios from "axios";

const getExerciseByIdFromUser = async (id: string, profileId: number) => {
	return (
		await axios.get(
			process.env.EXPO_PUBLIC_URL + `/exercises/${id}/${profileId}`
		)
	).data;
};

const getExerciseHistory = async (id: string, profileId: string) => {
	return (
		await axios.get(
			process.env.EXPO_PUBLIC_URL +
			`/exercises/${id}/${profileId}/exercise-history`
		)
	).data.exercise_details;
};

const getExerciseGraph = async (id: string, profileId: string) => {
	return (
		await axios.get(
			process.env.EXPO_PUBLIC_URL +
			`/exercises/${id}/${profileId}/workout-graph`
		)
	).data;
};

const getExerciseBest = async (id: string, profileId: string) => {
	return (
		await axios.get(
			process.env.EXPO_PUBLIC_URL +
			`/exercises/${id}/${profileId}/personal-best`
		)
	).data;
};

const getAllExercises = async () => (await axios.get(process.env.EXPO_PUBLIC_URL + "/exercises")).data.exercises;

export default {
	getExerciseByIdFromUser,
	getExerciseHistory,
	getAllExercises,
	getExerciseGraph,
	getExerciseBest,
};