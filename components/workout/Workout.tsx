import { TWorkout } from "../../../Mobile Applications - PROJECT OLD/types/workout.type";
// import { useSession } from 'next-auth/react';
import { FC, Fragment, ReactNode, useEffect, useState } from "react";
import WorkoutContext from "../../../Mobile Applications - PROJECT OLD/components/workout/context/WorkoutContext";
// import WorkoutInfo from './WorkoutInfo';
// import WorkoutExercises from './WorkoutExercises';
// import WorkoutActions from './WorkoutActions';
// import WorkoutLikes from './WorkoutLikes';
// import WorkoutComments from './WorkoutComments';
import profileService from "../../../Mobile Applications - PROJECT OLD/lib/profileService";
import { useToggle } from "@mantine/hooks";
import React from "react";
// import WorkoutDelete from "./WorkoutDelete";
import { TProfile } from "../../../Mobile Applications - PROJECT OLD/types/profile.type";
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
	// const { data: session } = useSession();
	const [modalOpen, toggle] = useToggle([false, true]);

	useEffect(() => {
		let isMounted = true;

		async function fetchData(id: number) {
			try {
				if (isMounted) {
					// const profile = await profileService.getProfile(id, session);
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
				<View className="relative rounded-md p-6 font-medium mb-6 space-y-3 shadow-md bg-[#1A2E4F] text-white">
					<Text>{workoutInfo}</Text>
					<Text>{exercises}</Text>
					<Text>{likes}</Text>
					<Text>{action}</Text>
					<Text>{comments}</Text>
					{/* {session?.user != undefined
						? parseInt(session?.user?.id) == workout.profileId && ( */}
					<TouchableHighlight
						className="absolute right-5 top-5 border-white border-2 rounded-md shadow-md p-1"
						onPress={() => Linking.openURL(`/workouts/${workout.id}`)}
					>
						<EvilIcons name="pencil" size={24} color="white" />
					</TouchableHighlight>
					{/* ) : null} */}
					{/* <WorkoutDelete
						modalOpen={modalOpen}
						toggle={toggle}
						workout={workout}
						key={`delete ${workout.id}`}
					/> */}
				</View>
			</View>
		</WorkoutContext.Provider>
	);
};
// Workout.Info = WorkoutInfo;
// Workout.Exercises = WorkoutExercises;
// Workout.Likes = WorkoutLikes;
// Workout.Actions = WorkoutActions;
// Workout.Comments = WorkoutComments;

export default React.memo(Workout);
