import database from "./prisma/db";
import { Profile } from "@/model/profile";

const createProfile = async (profile: Profile): Promise<Profile> => {
	return await database.profile.create({
		data: {
			email: profile.email,
			username: profile.username,
			password: profile.password,
			profilePicture: profile.profilePicture || null,
		},
	});
};

const getProfileById = async (id: string): Promise<Profile> => {
	return await database.profile.findUnique({
		where: {
			id: Number.parseInt(id),
		},
	});
};

const getProfileByEmailOrName = async (
	username: string,
	email: string
): Promise<Profile> => {
	return await database.profile.findFirst({
		where: {
			OR: [
				{ email: { equals: email, mode: "insensitive" } },
				{ username: { equals: username, mode: "insensitive" } },
			],
		},
	});
};
const getProfileByIdIncludeFollowingIncludeWorkoutWithSetsAndComments = async (
	profileId: string
): Promise<Profile | null> => {
	return await database.profile.findUnique({
		where: {
			id: Number.parseInt(profileId),
		},
		include: {
			following: {
				include: {
					Workout: { include: { ExerciseSet: true, WorkoutComment: true } },
				},
			},
		},
	});
};

const getProfileByIdIncludeFollowing = async (
	profileId: string
): Promise<Profile | null> => {
	return await database.profile.findUnique({
		where: {
			id: Number.parseInt(profileId),
		},
		include: {
			following: true,
		},
	});
};
const getProfileByIdIncludeAll = async (
	profileId: string
): Promise<Profile | null> => {
	return await database.profile.findUnique({
		where: {
			id: Number.parseInt(profileId),
		},
		include: {
			Workout: { include: { ExerciseSet: true, WorkoutComment: true } },
			WorkoutComment: true,
			followedBy: true,
			following: true,
		},
	});
};
const getAllProfilesIncludeAll = async (): Promise<Profile[]> => {
	return await database.profile.findMany({
		include: {
			Workout: { include: { ExerciseSet: true, WorkoutComment: true } },
			WorkoutComment: true,
			followedBy: true,
			following: true,
		},
	});
};
const getAllProfiles = async (): Promise<Profile[]> => {
	return await database.profile.findMany();
};
const getProfileByIdIncludeFollowers = async (
	profileId: string
): Promise<Profile | null> => {
	return await database.profile.findUnique({
		where: {
			id: Number.parseInt(profileId),
		},
		include: { followedBy: true },
	});
};

const followProfile = async (id: number, followingId: number) => {
	return await database.profile.update({
		where: { id },
		data: {
			following: {
				connect: [{ id: followingId }],
			},
		},
		include: { following: true },
	});
};
const unfollowProfile = async (id: number, followingId: number) => {
	return await database.profile.update({
		where: { id },
		data: {
			following: {
				disconnect: [{ id: followingId }],
			},
		},
		include: { following: true },
	});
};

export default {
	createProfile,
	getProfileById,
	getProfileByEmailOrName,
	getProfileByIdIncludeFollowingIncludeWorkoutWithSetsAndComments,
	getProfileByIdIncludeFollowing,
	getProfileByIdIncludeAll,
	getAllProfilesIncludeAll,
	getAllProfiles,
	getProfileByIdIncludeFollowers,
	followProfile,
    unfollowProfile,
};
