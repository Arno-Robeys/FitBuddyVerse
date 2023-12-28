import express from "express";
const router = express.Router();
import exerciseService from "../service/exercise.service";

router.get("/:id", async (req, res) => {
    const exerciseIdParam = req.params.id;
    const exerciseId = parseInt(exerciseIdParam, 10); // Convert to number

    try {
        const exercise = await exerciseService.getExerciseById(exerciseId);
        res.status(200).json({ status: "Success", exercise });
    } catch (error) {
        res.status(404).json({ status: 'error', errorMessage: error.message });
    }
})


export default router