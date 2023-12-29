import profileDb from "../domain/data-access/profile.db";
import { Profile } from "../domain/model/profile";

const createProfile = async (profile: Profile): Promise<Profile> => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	if (!emailRegex.test(profile.email)) throw new Error("Email must be valid");
	return profileDb.createProfile(profile);
};

const login = async (username: string, email: string, password: string): Promise<Profile> => {
	const profile = await profileDb.getProfileByEmailOrName(username, email);
	if (!profile) throw new Error("Profile not found");
	if (profile.password !== password) throw new Error("Password incorrect");
	return profile;
};

const getProfileByIdIncludeFollowingIncludeWorkoutWithSetsAndComments = async (
	profileId: string
): Promise<Profile | null> => {
	if (!Number.isInteger(parseInt(profileId)))
		throw new Error("Id must be numeric and whole");
	const profile =
		await profileDb.getProfileByIdIncludeFollowingIncludeWorkoutWithSetsAndComments(
			profileId
		);
	return profile;
};

const getProfileByIdIncludeAll = async (profileId: string): Promise<Profile | null> => {
	if (!Number.isInteger(parseInt(profileId))) throw new Error("Id must be numeric and whole");
	return await profileDb.getProfileByIdIncludeAll(profileId);
};

const getProfileById = async (profileId: string): Promise<Profile | null> => {
	if (!Number.isInteger(parseInt(profileId)))
		throw new Error("Id must be numeric and whole");
	const profile = await profileDb.getProfileById(profileId);
	return profile;
};

const getAllProfiles = async (): Promise<Profile[]> => await profileDb.getAllProfiles();

const followProfile = async ({
	id,
	followingId,
}: {
	id: string;
	followingId: string;
}) => {
	if (!Number.isInteger(parseInt(id)))
		throw new Error("Id must be numeric and whole");
	if (!Number.isInteger(parseInt(followingId)))
		throw new Error("followerId must be numeric and whole");

	// check if both profiles exist , error will be thrown if it coudn't fetch
	await Promise.all([getProfileById(id), getProfileById(followingId)]);

	return await profileDb.followProfile(parseInt(id), parseInt(followingId));
};

const unfollowProfile = async ({
	id,
	followingId,
}: {
	id: string;
	followingId: string;
}) => {
	if (!Number.isInteger(parseInt(id)))
		throw new Error("Id must be numeric and whole");
	if (!Number.isInteger(parseInt(followingId)))
		throw new Error("followerId must be numeric and whole");

	// check if both profiles exist , error will be thrown if it coudn't fetch
	await Promise.all([getProfileById(id), getProfileById(followingId)]);

	return await profileDb.unfollowProfile(parseInt(id), parseInt(followingId));
};

const searchAllProfiles = async (search: string): Promise<Profile[]> => await profileDb.getAllProfilesWithName(search);
	

export default {
	createProfile,
	login,
	getProfileByIdIncludeFollowingIncludeWorkoutWithSetsAndComments,
	getProfileByIdIncludeAll,
	getProfileById,
	getAllProfiles,
	searchAllProfiles,
	followProfile,
	unfollowProfile,
};
