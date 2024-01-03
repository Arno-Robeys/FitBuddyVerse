"use client";

import exerciseService from "@/lib/exerciseService";
import { useEffect, useState } from "react";
import History from "../../../components/exercise/History";
import { View, Text } from "react-native";

export default function ExerciseHistoryPage({
	route,
	navigation,
}: {
	route: any;
	navigation: any;
}) {
	const { id, userid } = route.params;
	const [exerciseHistory, setExerciseHistory] = useState<any>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch exercise details using the exerciseService
				const exerciseHistory = await exerciseService.getExerciseHistory(
					id,
					userid
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
	return (
		<>
			<View>
				<Text className="font-bold text-2xl">Exercise History</Text>
				{/* Verify if there is data available to show in history. */}
				{exerciseHistory && exerciseHistory.length > 0 ? (<>
					<History workouts={exerciseHistory} />
				</>
				) : (
					// Shown when there is no available data
					<Text className="font-bold text-xl">No history data is currently available.</Text>
				)}
			</View>
		</>
	);
}
