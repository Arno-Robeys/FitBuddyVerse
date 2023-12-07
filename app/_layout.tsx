import { Slot } from "expo-router";
import { SessionProvider } from "./ctx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Root() {
	// Set up the auth context and render our layout inside of it.
	const queryClient = new QueryClient();
	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<Slot />
			</QueryClientProvider>
		</SessionProvider>
	);
}
