import { TWorkout } from "@/types/workout.type";

async function getWorkout(id: number, session: any): Promise<TWorkout> {
	const res = await fetch(`${process.env.EXPO_PUBLIC_URL}/workouts/${id}`, {
		headers: {
			authorization: "Bearer " + session?.user.accessToken,
		},
	});
	const data: TWorkout = await res.json();
	return data as TWorkout;
}
async function getWorkoutWithSets(id: number, session: any): Promise<TWorkout> {
	const res = await fetch(
		`${process.env.EXPO_PUBLIC_URL}/workouts/${id}/sets`,
		{
			headers: {
				authorization: "Bearer " + session?.user.accessToken,
			},
		}
	);
	const data: TWorkout = await res.json();
	return data as TWorkout;
}
async function getWorkoutEmbedAll(id: number, session: any): Promise<TWorkout> {
	const res = await fetch(
		`${process.env.EXPO_PUBLIC_URL}/workouts/${id}?embed=all`,
		{
			headers: {
				authorization: "Bearer " + session?.user.accessToken,
			},
		}
	);
	const data: TWorkout = await res.json();
	return data as TWorkout;
}
const createWorkout = async (
	{
		name,
		durationSec,
		likeCount,
		volumeKG,
		profileId,
	}: Omit<TWorkout, "id" | "createdAt">,
	session: any
): Promise<TWorkout> => {
	const res = await fetch(process.env.EXPO_PUBLIC_URL + "/workouts", {
		method: "POST",
		body: JSON.stringify({
			name,
			durationSec,
			likeCount,
			volumeKG,
			profileId,
		}),
		headers: {
			"Content-Type": "application/json",
			authorization: "Bearer " + session?.user.accessToken,
		},
	});
	const data = await res.json();
	return data;
};

const updateWorkout = async (
	{ id, name, durationSec, likeCount, volumeKG, profileId }: TWorkout,
	session: any
): Promise<TWorkout> => {
	const res = await fetch(process.env.EXPO_PUBLIC_URL + `/workouts/${id}`, {
		method: "PUT",
		body: JSON.stringify({
			id,
			name,
			durationSec,
			likeCount,
			volumeKG,
			profileId,
		}),
		headers: {
			"Content-Type": "application/json",
			authorization: "Bearer " + session?.user.accessToken,
		},
	});
	const data = await res.json();
	return data;
};

const removeWorkout = async (id: number, session: any) => {
	const res = await fetch(process.env.EXPO_PUBLIC_URL + `/workouts/${id}`, {
		method: "DELETE",
		body: JSON.stringify({
			id,
		}),
		headers: {
			"Content-Type": "application/json",
			authorization: "Bearer " + session?.user.accessToken,
		},
	});
	const data = await res.json();
	return data;
};

export default {
	getWorkout,
	getWorkoutWithSets,
	createWorkout,
	removeWorkout,
	updateWorkout,
	getWorkoutEmbedAll,
};
