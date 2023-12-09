"use client";

import { useSession } from "@/app/ctx";
import { Stack } from "expo-router";
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';

export default function WorkoutPage() {
	const session = useSession();
	if (session?.isLoading) return <Text>Loading...</Text>;
	if (!session) return <Text>Not logged in</Text>;

    const [workout, setWorkout] = useState({ name: '', durationSec: 0, volumeKG: 0 });
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
					title: "Profile",
					headerStyle: { backgroundColor: "#374151" },
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
            <View className="mt-20 p-4">
                <View className="flex-col">
                    <View className="flex-row justify-between pb-4 space-x-1">
                        <Text className="text-2xl font-bold">Workout Tracker</Text>
                        <View className="flex-row space-x-2">
                            <TouchableOpacity className="bg-red-500 rounded py-2 px-4">
                                <Text className="text-white font-bold">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={FinishHandler} className="bg-blue-500 rounded py-2 px-4">
                                <Text className="text-white font-bold">Finish</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={{ color: '#333', fontWeight: '600', marginBottom: 4 }}>Workout Name</Text>
                    <TextInput
                    style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, fontSize: 16 }}
                    value={workout.name}
                    onChangeText={(value) => setWorkout({ ...workout, name: value })}
                    placeholder="New Workout"
                    />

                    <TouchableOpacity onPress={() => setOpened(true)} className="bg-gray-700 rounded mt-4 py-2">
                        <Text className="text-center text-white font-bold">+ Add Exercise</Text>
                    </TouchableOpacity>

                    {/* Exercise & Sets */}
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
