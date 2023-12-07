import Errors from "@/components/Errors";
import profileService from "@/lib/profileService";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
export default function RegistrationForm() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const handleRegistration = async () => {
		// Implement your registration logic here
		console.log("Registration details:", {
			firstName,
			lastName,
			email,
			username,
			password,
		});
		try {
			await profileService.createProfile({
				userEmail: email,
				userUsername: username,
				userPassword: password,
			});
		} catch (error) {
			console.log(error);
			return;
		}

		router.push("/");
		// You can send the registration details to your backend or perform any other actions
	};

	const goBack = async () => {
		router.push("/");
	};

	return (
		<View className="flex-1 justify-center p-4">
			<Stack.Screen
				options={{
					title: "Sign Up",
					headerStyle: { backgroundColor: "#374151" },
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<Text className="text-center text-2xl font-bold mb-4">
				Registration Form
			</Text>

			{errors.length > 0 && (
				<Errors errors={errors} clear={() => setErrors([])} />
			)}
			<View className="mb-4">
				<Text className="text-base">First Name</Text>
				<TextInput
					className="border border-gray-500 rounded p-2"
					placeholder="First Name"
					value={firstName}
					onChangeText={(text) => setFirstName(text)}
				/>

				<Text className="text-base">Last Name</Text>
				<TextInput
					className="border border-gray-500 rounded p-2"
					placeholder="Last Name"
					value={lastName}
					onChangeText={(text) => setLastName(text)}
				/>

				<Text className="text-base">Email</Text>
				<TextInput
					className="border border-gray-500 rounded p-2"
					placeholder="Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					keyboardType="email-address"
				/>

				<Text className="text-base">Username</Text>
				<TextInput
					className="border border-gray-500 rounded p-2"
					placeholder="Username"
					value={username}
					onChangeText={(text) => setUsername(text)}
				/>

				<Text className="text-base">Password</Text>
				<TextInput
					className="border border-gray-500 rounded p-2"
					placeholder="Password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry
				/>
			</View>

			<TouchableOpacity onPress={handleRegistration}>
				<View className="bg-gray-800 rounded p-2 items-center">
					<Text className="text-white text-lg">Register</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity className="items-center" onPress={goBack}>
				<View className="text-gray-700 mt-2.5">
					<Text className="border-b-2 font-bold">Go back</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}
