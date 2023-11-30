import { TWorkout } from "@/types/workout.type";
import { FC, ReactNode, useEffect, useState } from "react";
import WorkoutContext from "@/components/workout/context/WorkoutContext";
import { useToggle } from "@mantine/hooks";
import React from "react";
import { TProfile } from "@/types/profile.type";
import { EvilIcons } from "@expo/vector-icons";
import {Linking, TouchableHighlight, View, Text, TouchableOpacity} from "react-native";

interface Props {
	workout: TWorkout;
	workoutInfo?: ReactNode;
	exercises?: ReactNode;
	likes?: ReactNode;
	action?: ReactNode;
	comments?: ReactNode;
	show?: boolean;
}
const Workout: FC<Props> = ({
	workout,
	workoutInfo,
	exercises,
	likes,
	comments,
	action,
	show = true,
}: Props) => {
	const [profile, setProfile] = useState<TProfile>();
	const [modalOpen, toggle] = useToggle([false, true]);

	useEffect(() => {
		let isMounted = true;

		async function fetchData(id: number) {
			try {
				if (isMounted) {
					setProfile(profile);
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchData(workout.profileId);

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<WorkoutContext.Provider value={{ workout, profile }}>
			<View className="w-full max-w-sm bg-gray-700 border border-gray-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 rounded-3xl">
				<View className="flex justify-end px-4 pt-4">
					<TouchableOpacity className="items-end" onPress={() => Linking.openURL(`/workouts/${workout.id}`)}>
						<EvilIcons className="w-5 h-5" name="pencil" size={32} color="white" />
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