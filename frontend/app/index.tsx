import Errors from "@/components/Errors";
import React, { useEffect, useState } from "react";
import {ActivityIndicator, Text, TextInput, TouchableOpacity, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileService from "@/lib/profileService";

export default function LoginPage({navigation}: {navigation: any}) {
	const [emailOrUsername, setEmailOrUsername] = useState("");
	const [password, setPassword] = useState("");

	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<any[]>([]);

	useEffect(() => {
		AsyncStorage.getItem("profile").then((profile) => {
			if (profile) {
				navigation.navigate("FitBuddyVerse");
			}
		});
	}, []);

	const handleSubmit = async () => {
		setIsLoading(true);
		profileService.loginProfile(emailOrUsername, password).then((res) => {
			console.log(res);
			if (res.status === 200) {
				AsyncStorage.setItem("profile", JSON.stringify(res.data.profile));
				setErrors([]);
				navigation.navigate("FitBuddyVerse");
			} else {
				setErrors(['Something went wrong! Please try again']);
			}
		}).catch((err) => {
			setErrors(['Invalid username or password']);
			console.log(err);
		}).finally(() => {
			setPassword("");
			setIsLoading(false);
		});
	};

	return (
		<View className="bg-white flex-1 justify-center p-4">
			<Text className="text-center text-2xl font-bold mb-4">
				Sign in to your account
			</Text>
			{errors.length > 0 && (
				<Errors errors={errors} clear={() => setErrors([])} />
			)}

			<View className="mb-4">
				<TextInput
					onChangeText={(text) => setEmailOrUsername(text)}
					placeholder="Email or username"
					className="border border-gray-500 rounded p-2 mb-2"
					cursorColor={"#000"}
					value={emailOrUsername}
				/>
				<TextInput
					onChangeText={(text) => setPassword(text)}
					placeholder="Password"
					secureTextEntry
					className="border border-gray-500 rounded p-2"
					cursorColor={"#000"}
					autoCapitalize="none"
					value={password}
				/>
			</View>

			<TouchableOpacity onPress={handleSubmit}>
				<View className="bg-gray-800 rounded p-3 items-center">
					{!isLoading ? (
						<Text className="text-white text-lg">Sign in</Text>
					) : (
						<ActivityIndicator color="white" />
					)}
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate("Register")}>
				<View className="bg-gray-800 rounded p-3 items-center mt-4">
					<Text className="text-white text-lg">No account yet? Sign up</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}
