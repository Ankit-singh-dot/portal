import express from "express";
const router = express.Router();
import userAuth from "../middleware/Auth.js";
import {
  getAllCompanies,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controllers.js";
router.post("/register", userAuth, registerCompany);
router.get("/get", userAuth, getAllCompanies);
router.get("/get/:id", userAuth, getCompanyById);
router.put("/update/:id", userAuth, updateCompany);
export default router;
