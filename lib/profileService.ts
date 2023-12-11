import { TProfile } from "@/types/profile.type";
import { requestHandler } from "./requestHandler";
import axios from "axios";

interface getProfileWithFollowingEmbedAllParams {
	id: string;
	accessToken: string;
}

// const getProfileWithFollowingEmbedAll = async (
// 	id: number,
// 	session: any
// ): Promise<TProfile> => {
// 	const res = await fetch(
// 		`${process.env.EXPO_PUBLIC_URL}/profiles/${id}/following?embed=all`,
// 		{
// 			headers: {
// 				authorization: "Bearer " + session?.user.accessToken,
// 			},
// 		}
// 	);
// 	const data = await res.json();
// 	return data as TProfile;
// };
const getProfileWithFollowingEmbedAll = requestHandler<
	getProfileWithFollowingEmbedAllParams,
	TProfile
>((params) =>
	axios.get(
		`${process.env.EXPO_PUBLIC_URL}/profiles/${params?.id}/following?embed=all`,
		{
			headers: {
				authorization: "Bearer " + params?.accessToken,
			},
		}
	)
);

// const getProfileEmbedAll = async (id: number, session: any): Promise<TProfile> => {
//     const res = await fetch(`${process.env.EXPO_PUBLIC_URL}/profiles/${id}?embed=all`, {
//         headers: {
//             authorization: 'Bearer ' + session?.user.accessToken,
//         },
//     });
//     const data = await res.json();
//     return data as TProfile;
// };

interface getProfileEmbedAllParams {
	id: string;
	accessToken: string;
}

const getProfileEmbedAll = requestHandler<getProfileEmbedAllParams, TProfile>(
	(params) =>
		axios.get(
			`${process.env.EXPO_PUBLIC_URL}/profiles/${params?.id}?embed=all`,
			{
				headers: {
					authorization: "Bearer " + params?.accessToken,
				},
			}
		)
);

const getProfileWithFollowers = async (
	id: number,
	session: any
): Promise<TProfile> => {
	const res = await fetch(
		`${process.env.EXPO_PUBLIC_URL}/profiles/${id}/followers`,
		{
			headers: {
				authorization: "Bearer " + session?.user.accessToken,
			},
		}
	);
	const data: TProfile = await res.json();
	return data;
};

const getProfiles = async (session: any): Promise<TProfile[]> => {
	const res = await fetch(`${process.env.EXPO_PUBLIC_URL}/profiles`, {
		headers: {
			authorization: "Bearer " + session?.user.accessToken,
		},
	});
	const data = await res.json();
	return data as TProfile[];
};
const getProfile = async (id: number, session: any): Promise<TProfile> => {
	const res = await fetch(`${process.env.EXPO_PUBLIC_URL}/profiles/${id}`, {
		headers: {
			authorization: "Bearer " + session?.user.accessToken,
		},
	});
	const data = await res.json();
	return data as TProfile;
};

const createProfile = async ({
	userUsername,
	userEmail,
	userPassword,
}: {
	userUsername: string;
	userEmail: string;
	userPassword: string;
}) => {
	const res = await fetch(process.env.EXPO_PUBLIC_URL + "/profiles/register", {
		method: "POST",
		body: JSON.stringify({
			username: userUsername,
			email: userEmail,
			password: userPassword,
		}),
		headers: { "Content-Type": "application/json" },
	});
	const data = await res.json();
	console.log(data);
	return data;
};

export default {
	getProfileWithFollowingEmbedAll,
	getProfileWithFollowers,
	getProfileEmbedAll,
	getProfiles,
	createProfile,
	getProfile,
};
