"use client";

import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import exerciseService from "@/lib/exerciseService";
import { router, useLocalSearchParams } from "expo-router";

export default function ExerciseInfoPage() {
	const { id } = useLocalSearchParams();
	if (typeof id !== "string") return;

	const [profileId, setProfileId] = useState<number | undefined>(undefined);

	useEffect(() => {
		const fetchProfileId = async () => {
			try {
				// Retrieve the profile from AsyncStorage
				const profile = await AsyncStorage.getItem("profile");
				if (profile) {
					// Parse the profile JSON
					const parsedProfile = JSON.parse(profile);

					// Extract and set the profileId
					setProfileId(parsedProfile.id);
				}
			} catch (error) {
				console.error("Error fetching profile from AsyncStorage:", error);
			}
		};

		// Fetch the profileId
		fetchProfileId();
	}, []); // Empty dependency array to run this effect only once

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Check if profileId is available
				if (!profileId) {
					console.error("Profile ID not available.");
					return;
				}

				// Fetch exercise details using the exerciseService
				const exerciseDetails = await exerciseService.getExerciseByIdFromUser(
					id,
					profileId
				);

				// Log the exercise details (replace this with the desired logic)
				console.log("Exercise Details:", JSON.stringify(exerciseDetails));

				// Now you can use exerciseDetails to update the component state or perform other actions
			} catch (error) {
				console.error("Error fetching exercise details:", error);
			}
		};

		// Fetch data when both id and profileId are available
		if (id && profileId) {
			fetchData();
		}
	}, [id, profileId]); // Run this effect when either id or profileId changes

	return (
		<>
			<View className="bg-white py-24">
				<View className="mx-auto max-w-5xl px-6 lg:px-8">
					<Text>exercise met id: {id}</Text>
					<Button
						title="History"
						onPress={() => router.push(`/exercise/${id}/${profileId}/history`)}
					/>
				</View>
			</View>
		</>
	);
}
