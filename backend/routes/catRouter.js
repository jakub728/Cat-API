import express from "express";
import { catObjects, catPhotos } from "../controllers/catController.js";

const router = express.Router();

router.get("/", catObjects);
router.get("/photos/:input", catPhotos);

export default router;
