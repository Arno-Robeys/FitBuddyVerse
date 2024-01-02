import WorkoutContext from "@/components/workout/context/WorkoutContext";
import profileService from "@/lib/profileService";
import { TProfile } from "@/types/profile.type";
import { TWorkout } from "@/types/workout.type";
import { EvilIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { FC, ReactNode, useEffect, useState } from "react";
import {Text, TouchableOpacity, View } from "react-native";

interface Props {
	workout: TWorkout;
	workoutInfo?: ReactNode;
	exercises?: ReactNode;
	likes?: ReactNode;
	action?: ReactNode;
	comments?: ReactNode;
}
const Workout: FC<Props> = ({
	workout,
	workoutInfo,
	exercises,
	likes,
	comments,
	action
}: Props) => {
	const [profile, setProfile] = useState<TProfile>();

	useEffect(() => {
		var fetchData = async() => {
			try {
				const p = JSON.parse(await AsyncStorage.getItem("profile") ?? "{}") as TProfile;
				var res = await profileService.getProfilesFollowing(p?.id ?? 0);
				setProfile(res.profile);
			}catch(err) {
				console.log(err);
			}
		}
		fetchData();
	}, []);

	return (
		<WorkoutContext.Provider value={{ workout, profile }}>
			<View className="w-full max-w-sm bg-gray-700 border border-gray-500 shadow dark:bg-gray-800 dark:border-gray-700 rounded-3xl">
				<View className="w-full flex flex-col items-center px-20">
					<Text>{workoutInfo}</Text>
					<Text>{exercises}</Text>
					<Text>{likes}</Text>
					<Text>{action}</Text>
					<Text>{comments}</Text>
				</View>
			</View>
		</WorkoutContext.Provider>
	);
};

export default React.memo(Workout);
