//http://localhost:3000
import axios from "axios";

const getWorkoutById = async (id: string) => {
	return (
		await axios.get(
			process.env.EXPO_PUBLIC_URL + `/workouts/${id}/workout-page`
		)
	).data.workout[0];
};

export default {
	getWorkoutById,
};
