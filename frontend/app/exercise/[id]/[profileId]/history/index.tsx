"use client";

import exerciseService from "@/lib/exerciseService";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import History from "./history";

export default function HistoryPage() {
	const { id, profileId } = useLocalSearchParams();
	const [exerciseHistory, setExerciseHistory] = useState<any>();

	if (typeof id !== "string" || typeof profileId !== "string") return;

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Check if profileId is available
				if (!profileId || !id) {
					console.error("Profile ID or Exercise ID not available.");
					return;
				}

				// Fetch exercise details using the exerciseService
				const exerciseHistory = await exerciseService.getExerciseHistory(
					id,
					profileId
				);
				setExerciseHistory(exerciseHistory);

				// Log the exercise details (replace this with the desired logic)
				console.log("Exercise History:", JSON.stringify(exerciseHistory));

				// Now you can use exerciseDetails to update the component state or perform other actions
			} catch (error) {
				console.error("Error fetching exercise details:", error);
			}
		};

		// Fetch data when both id and profileId are available
		if (id && profileId) {
			fetchData();
		}
	}, [id, profileId]);
	return <History workouts={exerciseHistory} />;
}
