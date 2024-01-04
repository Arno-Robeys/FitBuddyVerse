"use client";

import exerciseService from "@/lib/exerciseService";
import { useEffect, useState } from "react";
import { View } from "react-native";
import History from "../../../components/exercise/History";

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

				navigation.setOptions({
					title: exerciseHistory[0].exercise.name + " History",
				});
			} catch (error) {
				console.error("Error fetching exercise details:", error);
			}
		};
		fetchData();
	}, []);
	return (
		<>
			<View className="bg-white h-full">
				<History workouts={exerciseHistory} />
			</View>
		</>
	);
}
