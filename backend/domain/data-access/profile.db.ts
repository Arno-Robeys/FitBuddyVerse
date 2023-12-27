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
}

const getProfileById = async (id: number): Promise<Profile> => {
    return await database.profile.findUnique({
        where: {
            id: id,
        },
    });
}

const getProfileByEmailOrName = async (username: string, email: string): Promise<Profile> => {
    return await database.profile.findFirst({
        where: {
            OR: [
                { email: {equals: email, mode: 'insensitive'} },
                { username: {equals: username, mode: 'insensitive'}},
            ],
        },
    });
}

export default {
    createProfile,
    getProfileById,
    getProfileByEmailOrName,
};
