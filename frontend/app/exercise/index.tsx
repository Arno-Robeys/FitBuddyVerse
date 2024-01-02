import { useEffect } from "react";
import { Button, Text, View } from "react-native";

export default function ExerciseInfoPage({ route, navigation }: { route: any, navigation: any }) {

    const { id, userid } = route.params;

    useEffect(() => {
        console.log('ExerciseInfoPage mounted');
        console.log('route: ', route.params);
        console.log('id: ', id);
        console.log('userid: ', userid);
    }, []);


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
