import express from "express";
const router = express.Router();
import userService from "../service/profile.service";


router.post("/login", async (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    try {
        const profile = await userService.login(username, email, password)
        res.status(200).json({status: "Authentication Succesful", profile})
    } catch(error) {
        res.status(403).json({status: 'error', errorMessage: error.message})
    }
})

router.post("/register", async (req, res) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    try {
        const profile = await userService.createProfile({email, username, password})
        res.status(201).json({status: "Registration Succesful", profile})
    } catch(error) {
        res.status(403).json({status: 'error', errorMessage: error.message})
    }
})

export default router