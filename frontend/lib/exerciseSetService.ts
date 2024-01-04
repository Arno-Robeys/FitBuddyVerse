import { TExerciseSet } from "@/types/set.type";
import axios from "axios";


const createExerciseSet = async (exerciseSet: TExerciseSet) => {
    return (
        await axios.post(process.env.EXPO_PUBLIC_URL + `/sets/create`, exerciseSet)
    ).data;
};

export default {
	createExerciseSet,
};
