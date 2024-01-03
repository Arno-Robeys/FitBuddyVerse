import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function History({ workouts }: any) {
	if (!workouts) return null;
	return (
		<>
			<View>
				<ScrollView>
					{workouts.map((workout: any) => (
						<View key={workout.workoutId} style={styles.workoutContainer}>
							<Text style={styles.workoutTitle}>{workout.workoutName}</Text>
							<Text style={styles.workoutDate}>{workout.workoutCreatedAt}</Text>
							<View style={styles.exerciseContainer}>
								<FontAwesome5 name="dumbbell" size={24} color="black" />
								<Text style={styles.exerciseName}>{workout.exerciseName}</Text>
								<Text style={styles.sets}>{`${workout.sets.length} sets`}</Text>
								<Entypo name="chevron-right" size={24} color="black" />
							</View>

							<View style={styles.setsContainer}>
								<View style={styles.setColumn}>
									<Text>SET</Text>
									<Text>WEIGHT & REPS</Text>
								</View>

								{workout.sets.map((set: any) => (
									<View key={set.setId} style={styles.setRow}>
										<Text>{set.setNr}</Text>
										<Text>{`${set.weightKG}kg x ${set.repetitions} reps`}</Text>
									</View>
								))}
							</View>
						</View>
					))}
				</ScrollView>
			</View>
		</>
	);
}
const styles = StyleSheet.create({
	workoutContainer: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "gray",
	},
	workoutTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "black", // Change to a dark text color
	},
	workoutDate: {
		color: "gray",
	},
	exerciseContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: 8,
	},
	exerciseName: {
		flex: 1,
		marginLeft: 4,
		color: "black", // Change to a dark text color
	},
	sets: {
		color: "gray",
	},
	setsContainer: {
		backgroundColor: "#eee", // Change to a light background color
		borderRadius: 8,
		padding: 16,
		marginTop: 8,
	},
	setColumn: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	setRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	bottomBar: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		padding: 16,
		backgroundColor: "#eee", // Change to a light background color
		flexDirection: "row",
		justifyContent: "space-around",
	},
});