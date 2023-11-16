import { TProfile } from '@/types/profile.type';

const getProfileWithFollowingEmbedAll = async (id: number, session: any): Promise<TProfile> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/profiles/${id}/following?embed=all`, {
        headers: {
            authorization: 'Bearer ' + session?.user.accessToken,
        },
    });
    const data = await res.json();
    return data as TProfile;
};

const getProfileEmbedAll = async (id: number, session: any): Promise<TProfile> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/profiles/${id}?embed=all`, {
        headers: {
            authorization: 'Bearer ' + session?.user.accessToken,
        },
    });
    const data = await res.json();
    return data as TProfile;
};

const getProfileWithFollowers = async (id: number, session: any): Promise<TProfile> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/profiles/${id}/followers`, {
        headers: {
            authorization: 'Bearer ' + session?.user.accessToken,
        },
    });
    const data: TProfile = await res.json();
    return data;
};

const getProfiles = async (session: any): Promise<TProfile[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/profiles`, {
        headers: {
            authorization: 'Bearer ' + session?.user.accessToken,
        },
    });
    const data = await res.json();
    return data as TProfile[];
};
const getProfile = async (id: number, session: any): Promise<TProfile> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/profiles/${id}`, {
        headers: {
            authorization: 'Bearer ' + session?.user.accessToken,
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
    const res = await fetch(process.env.NEXT_PUBLIC_URL + '/profiles', {
        method: 'POST',
        body: JSON.stringify({
            username: userUsername,
            email: userEmail,
            password: userPassword,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
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
