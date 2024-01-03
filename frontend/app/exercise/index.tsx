import exerciseService from "@/lib/exerciseService";
import React, { useEffect, useState } from "react";
import { Button, Dimensions, Text, TouchableOpacity, View } from "react-native";
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

const changeToUserView = {
    volumeKG: "Volume (KG)",
    one_rep_max: "Single Rep Max (KG)",
    max_weight: "Max Weight (KG)",
    total_reps: "Total Reps (Amount)",
    best_set_volume: "Best Set Volume (kg)",
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
    const [userSelected, setUserSelected] = useState<GraphItemType>("volumeKG"); // volumeKG is default value

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
            {/* Verify if there is data available to display in the graph. */}
            {exerciseGraph && exerciseGraph.graph.length > 0 ? (<>
                <Text className="font-bold text-xl">Exercise Chart of {changeToUserView[userSelected]}</Text>
                <LineChart
                    data={{
                        labels: exerciseGraph?.graph.map(
                            // Take only date out of createdAt, example original form:"2023-12-28T11:39:11.025Z"

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
                        backgroundColor: "#3730a3",
                        backgroundGradientFrom: "#3730a3",
                        backgroundGradientTo: "#3730a3",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#3730a3",
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 0,
                    }}
                />

                {/* Filter buttons */}
                <TouchableOpacity
                    onPress={() => setUserSelected(userSelected === 'volumeKG' ? 'volumeKG' : 'volumeKG')}
                    className="bg-indigo-800 rounded mt-0.5 py-2">
                    <Text className="text-center text-white font-bold">Volume</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setUserSelected(userSelected === 'one_rep_max' ? 'volumeKG' : 'one_rep_max')}
                    className="bg-indigo-800 rounded mt-0.5 py-2">
                    <Text className="text-center text-white font-bold">Single Rep Max</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setUserSelected(userSelected === 'max_weight' ? 'volumeKG' : 'max_weight')}
                    className="bg-indigo-800 rounded mt-0.5 py-2">
                    <Text className="text-center text-white font-bold">Max Weight</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setUserSelected(userSelected === 'total_reps' ? 'volumeKG' : 'total_reps')}
                    className="bg-indigo-800 rounded mt-0.5 py-2">
                    <Text className="text-center text-white font-bold">Total Reps</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setUserSelected(userSelected === 'best_set_volume' ? 'volumeKG' : 'best_set_volume')}
                    className="bg-indigo-800 rounded mt-0.5 py-2">
                    <Text className="text-center text-white font-bold">Best Set Volume</Text>
                </TouchableOpacity>
            </>
            ) : (
                // Shown when there is no available data 
                <Text className="font-bold text-xl">No graph data is currently available.</Text>
            )}

            {/* Go to exercise history button */}
            <TouchableOpacity
                onPress={() => navigation.navigate('ExerciseHistory', { id: id, userid: userid })}
                className="bg-gray-700 rounded mt-4 py-2">
                <Text className="text-center text-white font-bold text-lg">Go to Exercise History</Text>
            </TouchableOpacity>
        </View>
    );
}

