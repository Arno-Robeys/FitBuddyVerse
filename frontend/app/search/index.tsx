import { Text, View} from "react-native";

export default function SearchPage({navigation}: {navigation: any}) {

	return (
		<View className="bg-white flex-1 justify-center p-4">
			<Text className="text-center text-2xl font-bold mb-4">
                Search
            </Text>
		</View>
	);
}
