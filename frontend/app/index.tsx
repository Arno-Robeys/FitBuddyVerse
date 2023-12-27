import Errors from "@/components/Errors";
import {Stack, router } from "expo-router";
import React, {useState } from "react";
import {ActivityIndicator, Text, TextInput, TouchableOpacity, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileService from "@/lib/profileService";

export default function LoginPage() {
	const [emailOrUsername, setEmailOrUsername] = useState("");
	const [password, setPassword] = useState("");

	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<any[]>([]);


	const handleSubmit = async () => {
		setIsLoading(true);
		profileService.loginProfile(emailOrUsername, password).then((res) => {
			if (res.status === 200) {
				AsyncStorage.setItem("profile", JSON.stringify(res.profile));
				router.push("/feed");
			} else {
				setErrors(['Invalid username or password']);
			}
		}).catch((err) => {
			setErrors(['Invalid username or password']);
			console.log(err);
		}).finally(() => {
			setIsLoading(false);
		});
	};

	return (
		<View className="flex-1 justify-center p-4">
			<Stack.Screen
				options={{
					title: "Sign in",
					headerStyle: { backgroundColor: "#374151" },
					headerTintColor: "#fff",
					headerTitleStyle: { fontWeight: "bold" },
				}}
			/>
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
			<TouchableOpacity onPress={() => router.push("/signUp")}>
				<View className="bg-gray-800 rounded p-3 items-center mt-4">
					<Text className="text-white text-lg">No account yet? Sign up</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}