import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Errors from "@/components/Errors";
import profileService from '@/lib/profileService';

export default function RegistrationForm({navigation}: {navigation: any}) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<any[]>([]);

    const handleRegistration = async () => {
        profileService.createProfile(username, email, password).then((res) => {
            if (res.status === 201) {
                setErrors([]);
                navigation.navigate('Login');
            } else {
                setErrors(['Error creating profile. Please try again']);
            }
        }).catch((err) => {
            setErrors([err.response.data.errorMessage]);
            console.log(err.response.data);
        });
    };
    return (
        <View className="bg-white flex-1 justify-center p-4">
            <Text className="text-center text-2xl font-bold mb-4">
                Registration Form
            </Text>

            {errors.length > 0 && (
                <Errors errors={errors} clear={() => setErrors([])} />
            )}
            <View className="mb-4">

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
                    <Text className="text-white text-lg">Register</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
