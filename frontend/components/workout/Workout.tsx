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
				var profile = await AsyncStorage.getItem("profile");
				profile = JSON.parse(profile!);
				//@ts-ignore
				var res = await profileService.getProfileEmbedAll({ id: profile.id, accessToken: profile.accessToken });
				//@ts-ignore
				setProfile(res.data);
			}catch(err) {
				console.log(err);
			}
		}
		fetchData();
	}, []);

	return (
		<WorkoutContext.Provider value={{ workout, profile }}>
			<View className="w-full max-w-sm bg-gray-700 border border-gray-500 shadow dark:bg-gray-800 dark:border-gray-700 rounded-3xl">
				<View className="flex justify-end px-4 pt-4">
					<TouchableOpacity
						className="items-end"
						onPress={() => router.push(`/profile/${workout.profileId}`)}
					>
						<EvilIcons
							className="w-5 h-5"
							name="pencil"
							size={32}
							color="white"
						/>
					</TouchableOpacity>
				</View>
				<View className="w-full flex flex-col items-center px-20">
					<Text className="">{workoutInfo}</Text>
					<Text className="">{exercises}</Text>
					<Text className="">{likes}</Text>
					<Text className="">{action}</Text>
					<Text className="">{comments}</Text>
				</View>
			</View>
		</WorkoutContext.Provider>
	);
};

export default React.memo(Workout);
