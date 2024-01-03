import exerciseService from "@/lib/exerciseService";
import React, { useEffect, useState } from "react";
import { Button, Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface ApiResponse {
    status: string;
    graph: GraphItem[];
}

interface GraphItem {
    id: number;
    volumeKG: number;
    createdAt: string;
    one_rep_max: number;
    max_weight: number;
    total_reps: number;
    best_set_volume: number;
}

type GraphItemType =
    | "volumeKG"
    | "one_rep_max"
    | "max_weight"
    | "total_reps"
    | "best_set_volume";

const stringvorm = {
    volumeKG: "volume",
    one_rep_max: "One Rep Max",
    max_weight: "max_weight",
    total_reps: "total_reps",
    best_set_volume: "best_set_volume",
};

export default function ExerciseInfoPage({
    route,
    navigation,
}: {
    route: any;
    navigation: any;
}) {
    const { id, userid } = route.params;

    const [exerciseGraph, setExerciseGraph] = useState<ApiResponse>();
    const [userSelected, setUserSelected] = useState<GraphItemType>("volumeKG");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch exercise details using the exerciseService
                const exerciseGraph: ApiResponse =
                    await exerciseService.getExerciseGraph(id, userid);
                setExerciseGraph(exerciseGraph);

                // Now you can use exerciseDetails to update the component state or perform other actions
            } catch (error) {
                console.error("Error fetching exercise graph:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <View className="bg-white flex-1 justify-center p-4">
            <Text>Exercise Chart of {stringvorm[userSelected]}</Text>
            <LineChart
                data={{
                    labels: exerciseGraph?.graph.map(
                        (item) => item.createdAt.split("T")[0]
                    ) ?? ["error"],
                    datasets: [
                        {
                            data: exerciseGraph?.graph.map((item) => item[userSelected]) ?? [
                                0,
                            ],
                        },
                    ],
                }}
                width={(Dimensions.get("window").width / 100) * 92} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#4D61AA",
                    backgroundGradientFrom: "#4D61AA",
                    backgroundGradientTo: "#4D61AA",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#4D61AA",
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 0,
                }}
            />
            <Button
                title="volumeKG"
                onPress={() =>
                    setUserSelected(userSelected === "volumeKG" ? "volumeKG" : "volumeKG")
                }
            />
            <Button
                title="one_rep_max"
                onPress={() =>
                    setUserSelected(
                        userSelected === "one_rep_max" ? "volumeKG" : "one_rep_max"
                    )
                }
            />
            <Button
                title="max_weight"
                onPress={() =>
                    setUserSelected(
                        userSelected === "max_weight" ? "volumeKG" : "max_weight"
                    )
                }
            />
            <Button
                title="total_reps"
                onPress={() =>
                    setUserSelected(
                        userSelected === "total_reps" ? "volumeKG" : "total_reps"
                    )
                }
            />
            <Button
                title="best_set_volume"
                onPress={() =>
                    setUserSelected(
                        userSelected === "best_set_volume" ? "volumeKG" : "best_set_volume"
                    )
                }
            />
            <Button
                title="Go to Exercise History"
                onPress={() =>
                    navigation.navigate("ExerciseHistory", { id: id, userid: userid })
                }
            />
        </View>
    );
}
