import axios from "axios";

const createProfile = async ({userUsername, userEmail, userPassword}: {userUsername: string, userEmail: string, userPassword: string}) => {
	return await axios.post(process.env.EXPO_PUBLIC_URL + "/profiles/register", {
		username: userUsername,
		email: userEmail,
		password: userPassword,
	}, {headers: {"Content-Type": "application/json"}});
};

const loginProfile = async (userEmailOrName: string, userPassword: string) => {
	return await axios.post(process.env.EXPO_PUBLIC_URL + "/profiles/login", {
		username: userEmailOrName,
		email: userEmailOrName,
		password: userPassword,
	}, {headers: {"Content-Type": "application/json"}});
}

const getProfileByIdEmbedAll = async (id: number) => {
	return (await axios.get(process.env.EXPO_PUBLIC_URL + `/profiles/${id}?embed=all`)).data;
}

const searchProfiles = async (search: string) => (await axios.get(process.env.EXPO_PUBLIC_URL + `/profiles/?search=${search}`)).data;

export default {
	createProfile,
	loginProfile,
	getProfileByIdEmbedAll,
	searchProfiles,
};
