import profileService from "@/lib/profileService";
import { TProfile } from "@/types/profile.type";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SearchPage({ navigation }: { navigation: any }) {
	const [searchText, setSearchText] = useState('');
	const [users, setUsers] = useState<TProfile[]>([]);

	const handleSearch = (text: string) => {
		setSearchText(text);
		if (text.length < 1) setUsers([]);
		else profileService.searchProfiles(text).then(res => {
			setUsers(res.profiles);
		});
	}

	useEffect(() => {
		//Add search bar to navigation
		navigation.setOptions({
			headerTitle: () => (
				<TextInput className="h-12 text-lg" onChangeText={(text) => handleSearch(text)} placeholder="Search for user..." />
			)
		});
	}, []);

	return (
		<View className="bg-white flex-1 p-4">
			<FlatList
				data={users.filter(user => user.username.toLowerCase().includes(searchText.toLowerCase()))}
				keyExtractor={(item) => (item.id as number).toString()}
				ListHeaderComponent={() => (
					<Text className="text-base text-gray-400 text-center">{users.length == 0 ? 'No users found' : 'Search Results'}</Text>
				)}
				renderItem={({ item }) => (
					<View className="flex-row justify-between border-b-2 py-4 border-gray-300">
						<TouchableOpacity className="w-3/4" onPress={() => { navigation.navigate("ProfileUser", { id: item.id }) }}>
							<Text className="text-2xl font-bold">{item.username}</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => { }} className="bg-blue-400 rounded p-2">
							<Text className="text-center text-white font-bold">FOLLOW</Text>
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
}
