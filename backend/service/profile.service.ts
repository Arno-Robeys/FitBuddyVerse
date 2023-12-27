import profileDb from "../domain/data-access/profile.db";
import { Profile } from "../domain/model/profile";


const createProfile = async (profile: Profile): Promise<Profile> => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailRegex.test(profile.email)) throw new Error("Email must be valid")
    return profileDb.createProfile(profile);
}

const login = async (username: string, email: string, password: string): Promise<Profile> => {
    const profile = await profileDb.getProfileByEmailOrName(username, email);
    if(!profile) throw new Error("Profile not found");
    if(profile.password !== password) throw new Error("Password incorrect");
    return profile;
}

export default {
    createProfile,
    login
}

