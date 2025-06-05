import express from "express";
import userAuth from "../middleware/Auth.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updatedStatus,
} from "../controllers/application.controllers.js";
const routes = express.Router();
routes.post("/apply/:id", userAuth, applyJob);
routes.get("/get", userAuth, getAppliedJobs);
routes.get("/:id/applicants", userAuth, getApplicants);
routes.put("/status:id/update", userAuth, updatedStatus);
export default routes;
