import express from "express";
import { TripController } from "../controllers/TripController.js";
const router = express.Router();

router.get("/", (req, res) => TripController.getAll(req, res));
router.post("/", (req, res) => TripController.create(req, res));
router.post("/:id/reserve", (req, res) => TripController.reserve(req, res));

export default router;