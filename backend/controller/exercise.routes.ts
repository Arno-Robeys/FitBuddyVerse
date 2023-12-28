import express from "express";
const router = express.Router();
import exerciseService from "../service/exercise.service";

router.get("/:id", async (req, res) => {
    const exerciseIdParam = req.params.id;
    const exerciseId = parseInt(exerciseIdParam); // Convert to number

    try {
        const exercise = await exerciseService.getExerciseById(exerciseId);
        res.status(200).json({ status: "Success", exercise });
    } catch (error) {
        res.status(404).json({ status: 'error', errorMessage: error.message });
    }
})

router.get("/:id/:profileId", async (req, res) => {
    const exerciseIdParam = req.params.id;
    const profileIdParam = req.params.profileId;

    const exerciseId = parseInt(exerciseIdParam); // Convert to number
    const profileId = parseInt(profileIdParam); // Convert to number

    if (isNaN(exerciseId) || isNaN(profileId)) {
        res.status(400).json({ status: 'error', errorMessage: 'Invalid exerciseId or profileId' });
        return;
    }

    try {
        const exercise = await exerciseService.getExerciseByIdFromUser(exerciseId, profileId);
        res.status(200).json({ status: "Success", exercise });
    } catch (error) {
        res.status(404).json({ status: 'error', errorMessage: error.message });
    }
});


export default router