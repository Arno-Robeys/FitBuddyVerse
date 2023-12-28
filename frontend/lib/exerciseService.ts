import axios from "axios";

const getExerciseByIdFromUser = async (id: string, profileId: number) => {
    return await axios.post(process.env.EXPO_PUBLIC_URL + "exercises/:id/:profileId", {
        id: id,
        profileId: profileId,

    }, { headers: { "Content-Type": "application/json" } });
};


export default {
    getExerciseByIdFromUser,
};
