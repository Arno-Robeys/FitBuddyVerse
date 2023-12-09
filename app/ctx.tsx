import React from "react";
import { useStorageState } from "./useStorageState";
import axios from "axios";

const AuthContext = React.createContext<{
	signIn: (signInProps: {
		email: string;
		password: string;
		username: string;
	}) => Promise<["error" | "success", string | null]>;
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
			value={{signIn: async (signInProps) => {
					// Perform sign-in logic here
					const res = await axios.post(`${process.env.EXPO_PUBLIC_URL}/profiles/login`, signInProps).catch((err) => {
						console.log(err);
						return err;
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
					} else {
						setSession(null);
						return ["error", "Invalid username or password"];
					}
					return ["success", null];
				},
				signOut: () => {
					setSession(null);
				},
				session,
				isLoading
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
