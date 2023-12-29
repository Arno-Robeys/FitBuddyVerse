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
export default {
	getExerciseByIdFromUser,
	getExerciseHistory,
};
