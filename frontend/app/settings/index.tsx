import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Button, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

export default function SettingsPage({ navigation }: { navigation: any }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveChanges = () => {
        // TODO: Implement logic to save changes
        console.log("Saving changes...");
    };

    const handleLogout = () => {
        AsyncStorage.removeItem("profile");
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    };

    return (
        <View className="bg-white flex-1 justify-center p-4">
            <Text className="text-center text-2xl font-bold mb-4">Settings</Text>

            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-4"
            />

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-4"
            />

            <TextInput
                placeholder="Current Password"
                secureTextEntry
                value={currentPassword}
                onChangeText={(text) => setCurrentPassword(text)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-4"
            />

            <TextInput
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-4"
            />

            <TouchableOpacity onPress={handleSaveChanges}>
                <View className="bg-gray-800 rounded py-3 items-center">
                    {!isLoading ? (
                        <Text className="text-white text-lg">Save Changes</Text>
                    ) : (
                        <ActivityIndicator color="white" />
                    )}
                </View>
            </TouchableOpacity>

            <TouchableOpacity className="mt-2" onPress={handleLogout}>
                <View className="bg-gray-800 rounded py-3 items-center">
                    <Text className="text-white text-lg">Logout</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
