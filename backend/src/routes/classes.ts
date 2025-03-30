import express from "express";
import { createClass, getClassList } from "../controllers/classes";

const router = express.Router();

router.post("/", createClass);
router.get("/", getClassList);

export default router;
