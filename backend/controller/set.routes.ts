/*import express from "express";
const router = express.Router();
import setService from "../service/set.service";


router.post("/create", async (req, res) => {
    try {
        const set = await setService.createSet(req.body);
        res.json({ status: 200, set });
    } catch (err) {
        res.status(500).send({ status: 500, message: err.message });
    }
});


export default router;*/
