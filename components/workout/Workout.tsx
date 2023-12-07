import { useSession } from "@/app/ctx";
import WorkoutContext from "@/components/workout/context/WorkoutContext";
import profileService from "@/lib/profileService";
import { TProfile } from "@/types/profile.type";
import { TWorkout } from "@/types/workout.type";
import { EvilIcons } from "@expo/vector-icons";
import { useToggle } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";

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
	const [modalOpen, toggle] = useToggle([false, true]);
	const session = useSession();
	if (session?.isLoading) return <Text>Loading...</Text>;
	if (!session) return <Text>Not logged in</Text>;
	console.log("session:" + session?.session);
	const sessionJSON = JSON.parse(session.session!);

	const {
		data: profile,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["profile", workout.profileId],
		queryFn: async () => {
			const response = await profileService.getProfileEmbedAll({
				id: workout.profileId.toString(),
				accessToken: sessionJSON.accessToken,
			});
			if (response.code === "error") {
				throw new Error(response.error.message);
			}
			return response.data;
		},
	});

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
