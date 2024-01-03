import workoutService from "../service/workout.service";
import express from "express";
const router = express.Router();

router.get("/:workoutId", async (req, res) => {
	const id = req.params.workoutId;
	try {
		if (req.query.embed === "all") {
			const workout = await workoutService.getWorkoutByIdIncludeAll({ id });
			res.json(workout);
		} else {
			const workout = await workoutService.getWorkoutById({ id });
			res.json(workout);
		}
	} catch (err) {
		res.status(500).send({ status: 500, message: err.message });
	}
});

export default router;
