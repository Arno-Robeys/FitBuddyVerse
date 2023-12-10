"use client";

import { useSession } from "@/app/ctx";
import Exercise from "@/components/exercise/Exercise";
import { TWorkoutExercise } from "@/types/workout.type";
import { Stack } from "expo-router";
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';

const exerciseDummy = [
    {
        "id": 1,
        "name": "Seated Row",
        "type": "Back",
        "equipment": "Machine",
        "exerciseSets": [
            {
                "id": 1,
                "workoutId": 1,
                "exerciseId": 1,
                "setNr": 1,
                "repetitions": 11,
                "weightKG": 89,
                "isCompleted": true
            },
            {
                "id": 2,
                "workoutId": 1,
                "exerciseId": 1,
                "setNr": 2,
                "repetitions": 12,
                "weightKG": 90,
                "isCompleted": false
            },
            {
                "id": 3,
                "workoutId": 1,
                "exerciseId": 1,
                "setNr": 3,
                "repetitions": 11,
                "weightKG": 20,
                "isCompleted": false
            }
        ]
    },
    {
        "id": 2,
        "name": "Bench Press",
        "type": "Chest",
        "equipment": "Barbell",
        "exerciseSets": [
            {
                "id": 4,
                "workoutId": 1,
                "exerciseId": 2,
                "setNr": 1,
                "repetitions": 11,
                "weightKG": 34,
                "isCompleted": true
            }
        ]
    }
]

export default function WorkoutPage() {
	const session = useSession();
	if (session?.isLoading) return <Text>Loading...</Text>;
	if (!session) return <Text>Not logged in</Text>;

    const [workout, setWorkout] = useState<TWorkoutExercise>({name: '', createdAt: new Date().toISOString(), durationSec: 0, volumeKG: 0, profileId: '', exercise: exerciseDummy});
    const [opened, setOpened] = useState(false);
  
    const FinishHandler = () => {
      // Implement your finish logic
    };
  
    const AddExerciseHandler = () => {
      // Implement your add exercise logic
    };

	return (
		<>
			<Stack.Screen
				options={{
					title: "Workout Tracker",
					headerStyle: { backgroundColor: "#374151" },
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
            <View className="p-2">
                <View className="flex-col">
                    <View className="flex-row justify-between pb-4 space-x-1">
                        <TouchableOpacity className="bg-red-500 rounded py-2 px-4">
                            <Text className="text-white font-bold">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={FinishHandler} className="bg-blue-500 rounded py-2 px-4">
                            <Text className="text-white font-bold">Finish</Text>
                        </TouchableOpacity>
                    </View>

                    <Text className="mb-2 font-bold">Workout Name</Text>
                    <TextInput className="border border-gray-400 rounded p-2 text-base"
                    value={workout.name}
                    onChangeText={(value) => setWorkout({ ...workout, name: value })}
                    placeholder="New Workout"
                    />

                    <TouchableOpacity onPress={() => setOpened(true)} className="bg-gray-700 rounded mt-4 py-2">
                        <Text className="text-center text-white font-bold">+ Add Exercise</Text>
                    </TouchableOpacity>

                    <Exercise workout={workout} setWorkout={setWorkout} />
                </View>

                {/* Modal AddExercise*/}
                <Modal visible={opened} onRequestClose={() => setOpened(false)} animationType="slide">
                    <TouchableOpacity onPress={() => setOpened(false)} className="bg-gray-700 py-4">
                        <Text className="text-center text-white font-bold">Close</Text>
                    </TouchableOpacity>
                    <View>
        
                    </View>
                </Modal>
            </View>
		</>
	);
}
