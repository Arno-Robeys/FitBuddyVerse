import { TExerciseSet } from "@/types/set.type";

const createExerciseSet = async (
	{
		workoutId,
		exerciseId,
		setNr,
		repetitions,
		weightKG,
	}: Omit<TExerciseSet, "id">,
	session: any
): Promise<TExerciseSet> => {
	const res = await fetch(process.env.EXPO_PUBLIC_URL + "/exercise-sets", {
		method: "POST",
		body: JSON.stringify({
			workoutId,
			exerciseId,
			setNr,
			repetitions,
			weightKG,
		}),
		headers: {
			"Content-Type": "application/json",
			authorization: "Bearer " + session?.user.accessToken,
		},
	});
	const data = await res.json();
	return data;
};
const updateExerciseSet = async (
	{ id, workoutId, exerciseId, setNr, repetitions, weightKG }: TExerciseSet,
	session: any
): Promise<TExerciseSet> => {
	const res = await fetch(
		process.env.EXPO_PUBLIC_URL + `/exercise-sets/${id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				authorization: "Bearer " + session?.user.accessToken,
			},
			body: JSON.stringify({
				id,
				workoutId,
				exerciseId,
				setNr,
				repetitions,
				weightKG,
			}),
		}
	);
	const data = await res.json();
	return data;
};

const removeExerciseSet = async (
	id: number,
	session: any
): Promise<TExerciseSet> => {
	const res = await fetch(
		process.env.EXPO_PUBLIC_URL + `/exercise-sets/${id}`,
		{
			method: "DELETE",
			body: JSON.stringify({
				id,
			}),
			headers: {
				"Content-Type": "application/json",
				authorization: "Bearer " + session?.user.accessToken,
			},
		}
	);
	const data = await res.json();
	return data;
};

export default { createExerciseSet, updateExerciseSet, removeExerciseSet };
