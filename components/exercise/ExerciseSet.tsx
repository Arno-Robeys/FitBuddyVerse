import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { useDebouncedState, useToggle } from "@mantine/hooks";
import { useExerciseContext } from "./context/ExerciseContext";
import { TExerciseSet } from "@/types/set.type";
import CheckBox from "@react-native-community/checkbox";

interface ExerciseSetProps {
	set: TExerciseSet;
	index?: number;
	key?: string;
	removeOption: boolean;
}

const ExerciseSet: React.FC<ExerciseSetProps> = ({
	set,
	index,
	key,
	removeOption,
}) => {
	const [checked, setChecked] = useState(false);
	const {
		addExerciseSetToUpdate,
		removeExerciseSetFromUpdate,
		rerenderExercises,
	} = useExerciseContext();
	const [weightKG, setWeightKG] = useDebouncedState(set.weightKG, 500);
	const [repetitions, setRepetitions] = useDebouncedState(set.repetitions, 500);
	const [modalOpen, toggleModal] = useToggle([false]);

	useEffect(() => {
		if (checked) addExerciseSetToUpdate({ ...set, weightKG, repetitions });
		else removeExerciseSetFromUpdate({ ...set, weightKG, repetitions });
	}, [weightKG, repetitions, checked]);

	const triggerModal = () => {
		toggleModal();
	};

	const handleDelete = async () => {
		toggleModal();
	};

	return (
		<View
			key={key ?? `${set.exerciseId} ${index}`}
			style={{ flexDirection: "row" }}
		>
			<View style={{ flex: 1, alignItems: "center" }}>
				<Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
					{set.setNr}
				</Text>
			</View>
			<View style={{ flex: 2 }}>
				<TextInput
					placeholder={"" + set.weightKG}
					style={{ borderRadius: 4, padding: 8, backgroundColor: "white" }}
					onChangeText={(text) => setWeightKG(parseInt(text))}
				/>
			</View>
			<View style={{ flex: 2 }}>
				<TextInput
					placeholder={"" + set.repetitions}
					style={{ borderRadius: 4, padding: 8, backgroundColor: "white" }}
					onChangeText={(text) => setRepetitions(parseInt(text))}
				/>
			</View>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<CheckBox
					disabled={false}
					value={checked}
					onValueChange={() => setChecked(!checked)}
				/>
			</View>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				{removeOption && (
					<TouchableOpacity onPress={triggerModal}>
					</TouchableOpacity>
				)}
			</View>
			<Modal visible={modalOpen} animationType="slide" transparent={true}>
			</Modal>
		</View>
	);
};

export default ExerciseSet;
