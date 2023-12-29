import profileService from "@/lib/profileService";
import { TProfile } from "@/types/profile.type";
import { set } from "date-fns";
import { useState } from "react";
import { Button, FlatList, Text, TextInput, View} from "react-native";

export default function SearchPage({navigation}: {navigation: any}) {
	const [searchText, setSearchText] = useState('');
	const [users, setUsers] = useState<TProfile[]>([]);

	const handleSearch = (text: string) => {
		setSearchText(text);
		if(text.length < 1) setUsers([]);
		else profileService.searchProfiles(text).then(res => {
			setUsers(res.profiles);
		});
	}

	return (
		<View className="bg-white flex-1 p-4">
			<Text className="text-center text-2xl font-bold mb-4">
                Search
            </Text>
			<TextInput className="border border-gray-500 rounded p-2 mb-2" onChangeText={(text) => handleSearch(text)} placeholder="Search for user..."/>
			<FlatList 
				data={users.filter(user => user.username.toLowerCase().includes(searchText.toLowerCase()))}
				keyExtractor={(item) => (item.id as number).toString()}
				renderItem={({ item }) => (
					<View>
						<Text style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>{item.username}</Text>
						<Button title="View Profile" onPress={() => {navigation.navigate("ProfileUser", {id: item.id})}}/>
						<Button title="Follow" onPress={() => {}}/>
					</View>
				  )}
			/>
		</View>
	);
}
