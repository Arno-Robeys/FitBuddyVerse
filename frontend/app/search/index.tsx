import profileService from "@/lib/profileService";
import { TProfile } from "@/types/profile.type";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
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

	return (
		<View className="bg-white flex-1 p-4">
			<View className="border border-gray-500 rounded items-center space-x-2 flex-row mb-2">
				<Ionicons name="ios-search" size={30} color={'black'} />
				<TextInput className="h-12 text-lg" onChangeText={(text) => handleSearch(text)} placeholder="Search for user..." />
			</View>
			<FlatList
				data={users.filter(user => user.username.toLowerCase().includes(searchText.toLowerCase()))}
				keyExtractor={(item) => (item.id as number).toString()}
				renderItem={({ item }) => (
					<View>
						<TouchableOpacity onPress={() => { navigation.navigate("ProfileUser", { id: item.id }) }}>
							<Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 30 }}>{item.username}</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => { }} className="bg-blue-400 rounded mb-5 py-2">
							<Text className="text-center text-white font-bold">FOLLOW</Text>
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
}
