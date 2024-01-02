"use client";

import exerciseService from "@/lib/exerciseService";
import { useEffect, useState } from "react";
import History from "../../../components/exercise/History";
import { View, Text } from "react-native";

export default function ExerciseHistoryPage({ route, navigation }: { route: any, navigation: any }) {
	const { id, profileId } = route.params;
	const [exerciseHistory, setExerciseHistory] = useState<any>();

	useEffect(() => {
		const fetchData = async () => {
			try {
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
		fetchData();
	}, []);
	return <>
		<View>
			<Text>Exercise History</Text>
			<History workouts={exerciseHistory} />
		</View>
	</>;
}
