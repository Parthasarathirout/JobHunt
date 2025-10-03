import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/").get((req, res) => {
    res.status(200).json({ message: "Job route is working!" });
});
router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJobs); // Public - no auth required
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(getJobById); // Public - no auth required

export default router;

