"use client";
import Exercise from "@/components/exercise/Exercise";
import exerciseService from "@/lib/exerciseService";
import { TExercise } from "@/types/exercise.type";
import { TWorkoutExercise } from "@/types/workout.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';

export default function WorkoutPage({route, navigation }: {route: any, navigation: any }) {

    const [workout, setWorkout] = useState<TWorkoutExercise>({ name: '', createdAt: '', durationSec: 0, volumeKG: 0, profileId: 0, exercise: [] });
    const [opened, setOpened] = useState(false);
    const [exercises, setExercises] = useState<TExercise[]>([]);
    const [selectedExercise, setSelectedExercise] = useState<TExercise[]>([]);

    const FinishHandler = async () => {
        // Implement your finish logic
    };

    useEffect(() => {
        async function fetchData() {
            const exercises = await exerciseService.getAllExercises();
            setExercises(exercises);

            AsyncStorage.getItem("profile").then((res) => {
                const profile = JSON.parse(res!);
                workout.profileId = profile.id;
            }).catch((err) => {
                console.log(err);
            });
        }
        fetchData();
    }, []);

    const AddSelectedExerciseHandler = (exercise: TExercise) => {
        // Implement your add exercise logic
        if(selectedExercise.includes(exercise)) {
            setSelectedExercise(selectedExercise.filter((item) => item.id !== exercise.id));
            
        } else setSelectedExercise([...selectedExercise, exercise]);
    };

    const AddExerciseHandler = () => {
        // Implement your add exercise logic
        selectedExercise.forEach((exercise) => {
            //Check if exercise already exists
            if(workout.exercise?.find((item) => item.id === exercise.id)) return;
            const newExercise = {
                id: exercise.id,
                name: exercise.name,
                type: exercise.type,
                equipment: exercise.equipment,
                exerciseSets: [{exerciseId: exercise.id, setNr: 1, repetitions: 0, weightKG: 0}]
            };
            workout.exercise?.push(newExercise);
        });

        //If workout is new, set createdAt when adding first exercise
        if(workout.createdAt === '' && selectedExercise.length !== 0) workout.createdAt = moment().format();
        setSelectedExercise([]);
        setOpened(false);
    };

    useEffect(() => {
        if (workout.createdAt) {
          const interval = setInterval(() => {
            setWorkout((prevWorkout) => ({
              ...prevWorkout,
              durationSec: prevWorkout.createdAt ? moment().diff(moment(prevWorkout.createdAt), 'seconds') : 0
            }));
          }, 1000);
      
          return () => clearInterval(interval);
        }
      }, [workout.createdAt]);

    const formatDuration = (durationSec: number) => {
        const duration = moment.duration(durationSec, 'seconds');
        return durationSec < 60 ? `${durationSec} sec` : `${duration.minutes()}m ${duration.seconds()}s`;
    };

    return (
        <ScrollView className="bg-white h-screen">
            <View className="flex-col p-2">
                <Text className="mb-2 font-bold text-2xl">Workout Name</Text>
                <TextInput className="border border-gray-400 rounded p-2 text-base" value={workout.name} onChangeText={(value) => setWorkout({ ...workout, name: value })} placeholder="New Workout" />

                <TouchableOpacity onPress={() => setOpened(true)} className="bg-gray-700 rounded mt-4 py-2">
                    <Text className="text-center text-white font-bold text-lg">+ Add Exercise</Text>
                </TouchableOpacity>
                <View className="flex-row justify-between">
                    <Text className="text-base">Time: {formatDuration(workout.durationSec)}</Text>
                    <Text className="text-base">Total Volume: {workout.volumeKG}</Text>
                </View>
                <Exercise workout={workout} setWorkout={setWorkout} navigation={navigation} />
            </View>

            {/* Modal AddExercise*/}
            <Modal visible={opened} onRequestClose={() => {setOpened(false); setSelectedExercise([])}} animationType="slide">
                <View className="flex-col justify-between h-screen">
                    <TouchableOpacity onPress={() => {setOpened(false); setSelectedExercise([])}} className="bg-gray-700 py-4">
                        <Text className="text-center text-white font-bold">Cancel</Text>
                    </TouchableOpacity>
                    <ScrollView>
                        {exercises.map((exercise) => (
                            <TouchableOpacity key={exercise.id} onPress={() => AddSelectedExerciseHandler(exercise)} className={`p-2 ${selectedExercise.includes(exercise) ? 'bg-cyan-300' : ''}`}>
                                <Text className="text-center text-black font-bold text-lg">{exercise.name} - {exercise.type}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    {selectedExercise.length > 0 ? (
                            <TouchableOpacity onPress={() => AddExerciseHandler()} className="bg-gray-700 py-4 absolute bottom-0 w-full">
                                <Text className="text-center text-white font-bold">Add</Text>
                            </TouchableOpacity>
                        ) : null}
                </View>
            </Modal>
        </ScrollView>
    );
}
