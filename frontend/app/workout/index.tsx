import exerciseService from "@/lib/exerciseService";
import React, { useEffect, useState } from "react";
import { Button, Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function ExerciseInfoPage({
	route,
	navigation,
}: {
	route: any;
	navigation: any;
}) {
	const { id, userid } = route.params;

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch exercise details using the exerciseService
				const workout = await exerciseService.getExerciseGraph(id, userid);

				// Now you can use exerciseDetails to update the component state or perform other actions
			} catch (error) {
				console.error("Error fetching workout:", error);
			}
		};
		fetchData();
	}, []);

	return <View className=""></View>;
}
