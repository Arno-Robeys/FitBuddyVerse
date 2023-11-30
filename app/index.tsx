import React, { useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Errors from "@/components/Errors";
import {router, Stack} from "expo-router";


export default function LoginPage() {
	const emailOrUsername = useRef(null);
	const password = useRef(null);

	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState([]);
	const navigation = useNavigation();

	const handleSubmit = async () => {

		router.push("/feed");
	};

	const signUp = async () => {
		router.push("/signUp")
	}

	return (
		<View className="flex-1 justify-center p-4">
			<Stack.Screen
				options={{
					title: 'Sign in',
					headerStyle: { backgroundColor: '#151619' },
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
					}
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
					ref={emailOrUsername}
					placeholder="Email or username"
					className="border border-gray-500 rounded p-2 mb-2"
					cursorColor={"#000"}
				/>
				<TextInput
					ref={password}
					placeholder="Password"
					secureTextEntry
					className="border border-gray-500 rounded p-2"
					cursorColor={"#000"}
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
			<TouchableOpacity onPress={signUp}>
				<View className="bg-gray-800 rounded p-3 items-center mt-4">
					<Text className="text-white text-lg">No account yet? Sign up</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}
