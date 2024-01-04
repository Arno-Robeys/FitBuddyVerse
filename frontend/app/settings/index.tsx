import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

export default function SettingsPage({ navigation }: { navigation: any }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

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
        <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
            <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Settings</Text>

            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={{ borderWidth: 1, borderColor: "gray", borderRadius: 4, padding: 8, marginBottom: 16 }}
            />

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{ borderWidth: 1, borderColor: "gray", borderRadius: 4, padding: 8, marginBottom: 16 }}
            />

            <TextInput
                placeholder="Current Password"
                secureTextEntry
                value={currentPassword}
                onChangeText={(text) => setCurrentPassword(text)}
                style={{ borderWidth: 1, borderColor: "gray", borderRadius: 4, padding: 8, marginBottom: 16 }}
            />

            <TextInput
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                style={{ borderWidth: 1, borderColor: "gray", borderRadius: 4, padding: 8, marginBottom: 16 }}
            />

            <Button title="Save Changes" onPress={handleSaveChanges} />

            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}
