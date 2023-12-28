"use client";
import Exercise from "@/components/exercise/Exercise";
import { TWorkoutExercise } from "@/types/workout.type";
import { set } from "date-fns";
import { router } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';

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
    },
    {
        "id": 3,
        "name": "Incline Bench Press",
        "type": "Chest",
        "equipment": "Dumbbell",
        "exerciseSets": [
            {
                "id": 5,
                "workoutId": 1,
                "exerciseId": 3,
                "setNr": 1,
                "repetitions": 11,
                "weightKG": 34,
                "isCompleted": false
            }
        ]
    }
]

export default function WorkoutPage() {

    const [workout, setWorkout] = useState<TWorkoutExercise>({name: '', createdAt: new Date().toISOString(), durationSec: 0, volumeKG: 0, profileId: '', exercise: exerciseDummy});
    const [opened, setOpened] = useState(false);
  
    const FinishHandler = async () => {
      // Implement your finish logic
    };

    const AddExerciseHandler = () => {
      // Implement your add exercise logic
    };

    useEffect(() => {
        const interval = setInterval(() => {
          setWorkout(prevWorkout => ({
            ...prevWorkout,
            durationSec: prevWorkout.createdAt
              ? Math.floor((Date.now() - Date.parse(prevWorkout.createdAt)) / 1000)
              : 0
          }));
        }, 1000);
      
        return () => clearInterval(interval);
      }, [workout.createdAt]);

    const formatDuration = (durationSec: number) => {
        const duration = moment.duration(durationSec, 'seconds');
        return durationSec < 60 ? `${durationSec} sec` : `${duration.minutes()}m ${duration.seconds()}s`;
    };

	return (
		<ScrollView className="bg-white h-screen">
            <View className="flex-col p-2">
                <Text className="mb-2 font-bold text-2xl">Workout Name</Text>
                <TextInput className="border border-gray-400 rounded p-2 text-base" value={workout.name} onChangeText={(value) => setWorkout({ ...workout, name: value })} placeholder="New Workout"/>

                <TouchableOpacity onPress={() => setOpened(true)} className="bg-gray-700 rounded mt-4 py-2">
                    <Text className="text-center text-white font-bold text-lg">+ Add Exercise</Text>
                </TouchableOpacity>
                <View className="flex-row justify-between">
                    <Text className="text-base">Tijd: {formatDuration(workout.durationSec)}</Text>
                    <Text className="text-base">Totale Volume: {workout.volumeKG}</Text>
                </View>
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
		</ScrollView>
	);
}
