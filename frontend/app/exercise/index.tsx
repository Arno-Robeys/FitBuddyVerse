import exerciseService from "@/lib/exerciseService";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

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

export default function ExerciseInfoPage({ route, navigation }: { route: any, navigation: any }) {

    const { id, userid } = route.params;

    useEffect(() => {
        console.log('ExerciseInfoPage mounted');
        console.log('route: ', route.params);
        console.log('id: ', id);
        console.log('userid: ', userid);
    }, []);

    const [exerciseGraph, setExerciseGraph] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch exercise details using the exerciseService
                const exerciseGraph = await exerciseService.getExerciseGraph(
                    id,
                    userid
                );
                setExerciseGraph(exerciseGraph);

                // Log the exercise details (replace this with the desired logic)
                console.log("Exercise Graph:", JSON.stringify(exerciseGraph));

                // Now you can use exerciseDetails to update the component state or perform other actions
            } catch (error) {
                console.error("Error fetching exercise graph:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log('exerciseGraph: ', exerciseGraph);
    }, [exerciseGraph]);


    return (
        <View className="bg-white flex-1 justify-center p-4">
            <Text className="text-center text-2xl font-bold mb-4">
                Exercise Info met id {id}
            </Text>
            <Text className="text-center text-2xl font-bold mb-4">
                van user id {userid}
            </Text>
            <Button title="Go to Exercise History" onPress={() => navigation.navigate('ExerciseHistory', { id: id, userid: userid })} />
        </View>
    );
}
