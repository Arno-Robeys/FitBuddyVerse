import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Text, View} from "react-native";

export default function SettingsPage({navigation}: {navigation: any}) {

	return (
		<View className="bg-white flex-1 justify-center p-4">
			<Text className="text-center text-2xl font-bold mb-4">
                Settings
            </Text>
            <Button title="Logout" onPress={() => {
                AsyncStorage.removeItem("profile");
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }]
                });
                }} />
		</View>
	);
}
