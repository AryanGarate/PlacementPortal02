import express from "express";

import {
  postApplication,
  StudentDeleteApplication,
  StudentGetAllAplication,
  employerGetAllAplication,
} from "../controllers/applicationContoller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postApplication);
router.get("/Student/getall", isAuthenticated, StudentGetAllAplication);
router.get("/employer/getall", isAuthenticated, employerGetAllAplication);
router.delete("/delete/:id", isAuthenticated, StudentDeleteApplication);

export default router;
