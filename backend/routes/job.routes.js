import express from "express";
import userAuth from "../middleware/Auth.js";
import {
  getAdminJob,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controllers.js";
const router = express.Router();
router.post("/register", userAuth, postJob);
router.get("/get", userAuth, getAllJobs);
router.get("/get/:id", userAuth, getJobById);
router.get("/getadminjobs", userAuth, getAdminJob);
export default router;
