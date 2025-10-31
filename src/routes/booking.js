import express from "express";
import { TripService } from "../services/TripService.js";
const router = express.Router();

// POST /bookings -> reserve seat on trip
router.post("/", async (req, res) => {
  try {
    const { tripId, qty, userName, userEmail } = req.body;
    if (!tripId) return res.status(400).json({ error: "tripId required" });
    // simple reservation: decrement seats (you can persist booking in bookings table)
    const updatedTrip = await TripService.reserveSeat(Number(tripId), Number(qty || 1));
    // TODO: persist booking details in bookings table
    res.status(201).json({ message: "Réservation OK", trip: updatedTrip });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;