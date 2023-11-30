import React, { useState } from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import Errors from "@/components/Errors";
import { router } from "expo-router";

export default function RegistrationForm() {
    const [name, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleRegistration = () => {
        // Implement your registration logic here
        console.log('Registration details:', {
            name,
            lastName,
            email,
            username,
            password,
        });

        router.push("/");
        // You can send the registration details to your backend or perform any other actions
    };

    return (
        <View className="flex-1 justify-center p-4">
            <Text className="text-center text-2xl font-bold mb-4">
                Registration Form
            </Text>

            {errors.length > 0 && (
                <Errors errors={errors} clear={() => setErrors([])} />
            )}
            <View className="mb-4">
                <Text className="text-base">
                    First Name
                </Text>
                <TextInput className="border border-gray-500 rounded p-2"
                           placeholder="First Name"
                           value={name}
                           onChangeText={(text) => setFirstName(text)}
                />

                <Text className="text-base">
                    Last Name cbcgxvc
                    cgvbcd
                    fvcdfx
                    vdxfv
                    xswdfcsxwd
                    cwsx
                    wcd
                </Text>
                <TextInput className="border border-gray-500 rounded p-2"
                           placeholder="Last Name"
                           value={lastName}
                           onChangeText={(text) => setLastName(text)}
                />

                <Text className="text-base">
                    Email
                </Text>
                <TextInput className="border border-gray-500 rounded p-2"
                           placeholder="Email"
                           value={email}
                           onChangeText={(text) => setEmail(text)}
                           keyboardType="email-address"
                />

                <Text className="text-base">
                    Username
                </Text>
                <TextInput className="border border-gray-500 rounded p-2"
                           placeholder="Username"
                           value={username}
                           onChangeText={(text) => setUsername(text)}
                />

                <Text className="text-base">
                    Password
                </Text>
                <TextInput className="border border-gray-500 rounded p-2"
                           placeholder="Password"
                           value={password}
                           onChangeText={(text) => setPassword(text)}
                           secureTextEntry
                />
            </View>

            <TouchableOpacity onPress={handleRegistration}>
                <View className="bg-gray-800 rounded p-2 items-center">
                    <Text className="text-white text-lg">Register
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
