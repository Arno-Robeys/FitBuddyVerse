import express from "express";
const router = express.Router();
import profileService from "../service/profile.service";

router.get("/:profileId/following", async (req, res) => {
	const id = req.params.profileId;
	try {
		const profile = await profileService.getProfileByIdIncludeFollowingIncludeWorkoutWithSetsAndComments(id);
		res.json({ status: 200, profile });
	} catch (err) {
		res.status(500).send({ status: 500, message: err.message });
	}
});

router.get("/:profileId", async (req, res) => {
	const id = req.params.profileId;
	try {
		if (req.query.embed === "all") {
			const profile = await profileService.getProfileByIdIncludeAll(id);
			res.json({ status: 200, profile });
		} else {
			const profile = await profileService.getProfileById(id);
			res.json({ status: 200, profile });
		}
	} catch (err) {
		res.status(500).send({ status: 500, message: err.message });
	}
});

router.get("/", async (req, res) => {
	try {
		const profiles = await profileService.getAllProfiles();
		const profilesWithoutPassword = profiles.map(({ password, ...rest }) => rest);
		res.json({status: 200, profiles: profilesWithoutPassword});
	} catch (err) {
		res.status(500).send({ status: 500, message: err.message });
	}
});

router.post("/login", async (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	try {
		const profile = await profileService.login(username, email, password);
		res.status(200).json({ status: "Authentication Succesful", profile });
	} catch (error) {
		res.status(403).json({ status: "error", errorMessage: error.message });
	}
});

router.post("/register", async (req, res) => {
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	try {
		const profile = await profileService.createProfile({
			email,
			username,
			password,
		});
		res.status(201).json({ status: "Registration Succesful", profile });
	} catch (error) {
		res.status(403).json({ status: "error", errorMessage: error.message });
	}
});

router.put('/follow', async (req, res) => {
    const { id, followingId } = req.body;
    try {
        const profile = await profileService.followProfile({ id, followingId });
        res.status(200).json({ status: 200, profile});
    } catch (err) {
        res.status(500).send({ status: 500, message: err.message });
    }
});

router.put('/unfollow', async (req, res) => {
    const { id, followingId } = req.body;
    try {
        const profile = await profileService.unfollowProfile({ id, followingId });
        res.status(200).json({ status: 200, profile});
    } catch (err) {
        res.status(500).send({ status: 500, message: err.message });
    }
});

export default router;
