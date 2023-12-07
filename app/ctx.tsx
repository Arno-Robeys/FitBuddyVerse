import React from "react";
import { useStorageState } from "./useStorageState";
import axios, { AxiosError } from "axios";

const AuthContext = React.createContext<{
	signIn: (signInProps: {
		email: string;
		password: string;
		username: string;
	}) => void;
	signOut: () => void;
	session?: string | null;
	isLoading: boolean;
} | null>(null);

// This hook can be used to access the user info.
export function useSession() {
	const value = React.useContext(AuthContext);
	if (process.env.NODE_ENV !== "production") {
		if (!value) {
			throw new Error("useSession must be wrapped in a <SessionProvider />");
		}
	}

	return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
	const [[isLoading, session], setSession] = useStorageState("session");

	return (
		<AuthContext.Provider
			value={{
				signIn: async (signInProps) => {
					// Perform sign-in logic here
					const { email, username, password } = signInProps;

					async function login() {
						console.log("what the fuck");
						const res = await axios
							.post(`${process.env.EXPO_PUBLIC_URL}/profiles/login`, {
								email: email,
								username: username,
								password: password,
							})
							.catch(function (error) {
								if (error.response) {
									// The request was made and the server responded with a status code
									// that falls out of the range of 2xx
									console.log(error.response.data);
									console.log(error.response.status);
									console.log(error.response.headers);
								} else if (error.request) {
									// The request was made but no response was received
									// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
									// http.ClientRequest in node.js
									console.log(error.request);
								} else {
									// Something happened in setting up the request that triggered an Error
									console.log("Error", error.message);
								}
								console.log(error.config);
							});

						const user = res?.status === 200 ? res.data.profile : null;
						if (user) {
							setSession(
								JSON.stringify({
									id: user.id.toString(),
									name: user.username,
									email: user.email,
									accessToken: user.accessToken,
								})
							);
						}
					}

					// Call the function to perform the fetch operation
					await login();
				},
				signOut: () => {
					setSession(null);
				},
				session,
				isLoading,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
