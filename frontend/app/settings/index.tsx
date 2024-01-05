import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Button, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import profileService from "@/lib/profileService";
import { set } from "date-fns";

export default function SettingsPage({ navigation }: { navigation: any }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);


    const handleSaveChanges = async () => {
        const id = JSON.parse((await AsyncStorage.getItem("profile")) ?? "{}").id;
        setIsLoading(true);
        console.log("Saving changes...");

        const profile = await AsyncStorage.getItem("profile");
        if (profile) {
            const parsedProfile = JSON.parse(profile);
            const updatedProfile = {
                ...parsedProfile,
                username: username || parsedProfile.username,
                email: email || parsedProfile.email,
            };

            if (currentPassword && newPassword) {
                updatedProfile.password = newPassword;
            } else if (!currentPassword && newPassword) {
                console.log("Please provide the current password.");
            } else if (currentPassword && !newPassword) {
                console.log("Please provide the new password.");
            }

            await profileService.updateProfile(id, updatedProfile.username, updatedProfile.email, updatedProfile.password);

            await AsyncStorage.setItem("profile", JSON.stringify(updatedProfile));
        }

        setIsLoading(false);
        console.log("Changes saved!");

        setSuccess(true);

        setTimeout(() => {
            setSuccess(false);
            navigation.navigate("Profile");
        }, 1500);

        
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

            <TouchableOpacity className="mt-3" onPress={handleLogout}>
                <View className="bg-red-800 rounded py-3 items-center">
                    <Text className="text-white text-lg">Logout</Text>
                </View>
            </TouchableOpacity>

            {success && (
                <View className="bg-green-600 p-3 rounded-lg" style={{ position: "absolute", bottom: 20, alignSelf: "center" }}>
                    <Text style={{ color: "white" }}>Changes saved successfully!</Text>
                </View>
            )}
        </View>
    );
}
