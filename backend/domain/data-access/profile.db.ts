import database from "./prisma/db";
import { Profile } from "../model/profile";

const createProfile = async (profileData: Profile): Promise<Profile> => {
	try {
		const profile = await database.profile.create({
			data: {
				email: profileData.email.toLowerCase(),
				username: profileData.username.toLowerCase(),
				password: profileData.password,
				profilePicture: profileData.profilePicture || null,
			},
		});
		return Profile.From(profile);
	} catch (err) {
		if (err.code === "P2002") {
			throw new Error("Email or username already exists");
		} else throw new Error("Something went wrong");
	}
};

const getProfileById = async (id: string): Promise<Profile> => {
	const profile = await database.profile.findUnique({
		where: {
			id: Number.parseInt(id),
		},
	});
	return Profile.From(profile);
};

const getProfileByEmailOrName = async (
	username: string,
	email: string
): Promise<Profile> => {
	const profile = await database.profile.findFirst({
		where: {
			OR: [
				{ email: { equals: email, mode: "insensitive" } },
				{ username: { equals: username, mode: "insensitive" } },
			],
		},
	});
	return Profile.From(profile);
};

const getProfileByIdIncludeFollowingIncludeWorkoutWithSetsAndComments = async (
	profileId: string
): Promise<Profile | null> => {
	const profile = await database.profile.findUnique({
		where: {
			id: Number.parseInt(profileId),
		},
		include: {
			following: {
				include: {
					Workout: {
						include: {
							ExerciseSet: { include: { exercise: true } },
							WorkoutComment: { include: { profile: true } },
							LikedBy: true,
							ExerciseNote: true,
						},
					},
				},
			},
		},
	});
	return profile ? Profile.From(profile) : null;
};

const getProfileByIdIncludeAll = async (
	profileId: string
): Promise<Profile | null> => {
	const profile = await database.profile.findUnique({
		where: {
			id: Number.parseInt(profileId),
		},
		include: {
			Workout: {
				include: {
					ExerciseSet: { include: { workout: true, exercise: true } },
					WorkoutComment: { include: { profile: true } },
					LikedBy: true,
					ExerciseNote: true,
				},
			},
			followedBy: true,
			following: true,
		},
	});
	return Profile.From(profile);
};

const getAllProfiles = async (): Promise<Profile[]> => {
	const profiles = await database.profile.findMany();
	return profiles.map(Profile.From);
};

const getAllProfilesWithName = async (name: string): Promise<Profile[]> => {
	//Get all profiles that are not the current user
	const profiles = await database.profile.findMany({
		where: {
			username: {
				contains: name,
				mode: "insensitive",
			},
		},
	});
	return profiles.map(Profile.From);
};

const followProfile = async (
	id: number,
	followingId: number
): Promise<Profile> => {
	const profile = await database.profile.update({
		where: { id },
		data: {
			following: {
				connect: [{ id: followingId }],
			},
		},
		include: { following: true },
	});
	return Profile.From(profile);
};

const unfollowProfile = async (
	id: number,
	followingId: number
): Promise<Profile> => {
	const profile = await database.profile.update({
		where: { id },
		data: {
			following: {
				disconnect: [{ id: followingId }],
			},
		},
		include: { following: true },
	});
	return Profile.From(profile);
};

export default {
	createProfile,
	getProfileById,
	getProfileByEmailOrName,
	getProfileByIdIncludeFollowingIncludeWorkoutWithSetsAndComments,
	getProfileByIdIncludeAll,
	getAllProfiles,
	getAllProfilesWithName,
	followProfile,
	unfollowProfile,
};
