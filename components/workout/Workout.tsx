import { TWorkout } from "@/types/workout.type";
import { FC, ReactNode, useEffect, useState } from "react";
import WorkoutContext from "@/components/workout/context/WorkoutContext";
import { useToggle } from "@mantine/hooks";
import React from "react";
import { TProfile } from "@/types/profile.type";
import { EvilIcons } from "@expo/vector-icons";
import { Linking, TouchableHighlight, View, Text } from "react-native";

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
			<View className="col-start-1 col-end-3">
				<View className="relative rounded-md p-6 font-medium mb-6 space-y-3 shadow-md bg-[#1A2E4F] text-white ">
					<Text className="font-medium">{workoutInfo}</Text>
					<Text>{exercises}</Text>
					<Text>{likes}</Text>
					<Text>{action}</Text>
					<Text>{comments}</Text>
					<TouchableHighlight
						className="absolute right-5 top-5 border-white border-2 rounded-md shadow-md p-1"
						onPress={() => Linking.openURL(`/workouts/${workout.id}`)}
					>
						<EvilIcons name="pencil" size={24} color="white" />
					</TouchableHighlight>
				</View>
			</View>
		</WorkoutContext.Provider>
	);
};

export default React.memo(Workout);