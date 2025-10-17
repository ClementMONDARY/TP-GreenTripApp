import express from "express";
import db from "../config/db.js";

const router = express.Router();

/**
 * @route   GET /trips
 * @desc    Liste tous les trajets disponibles
 */
router.get("/", async (req, res) => {
  try {
    const [trips] = await db.query(
      "SELECT * FROM TRIP WHERE seatsAvailable > 0"
    );
    res.status(200).json(trips);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

/**
 * @route   POST /trips
 * @desc    Ajoute un nouveau trajet
 */
router.post("/", async (req, res) => {
  // Récupère les données du corps de la requête
  const {
    departureLocation,
    arrivalLocation,
    departureDateTime,
    seatsTotal,
    transportType,
    proposerId,
  } = req.body;

  // Validation simple
  if (
    !departureLocation ||
    !arrivalLocation ||
    !departureDateTime ||
    !seatsTotal ||
    !transportType ||
    !proposerId
  ) {
    return res
      .status(400)
      .json({ msg: "Veuillez remplir tous les champs obligatoires" });
  }

  try {
    const sql = `
      INSERT INTO TRIP 
      (departureLocation, arrivalLocation, departureDateTime, seatsTotal, seatsAvailable, transportType, proposerId)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // seatsAvailable est initialement égal à seatsTotal
    const [result] = await db.query(sql, [
      departureLocation,
      arrivalLocation,
      departureDateTime,
      seatsTotal,
      seatsTotal, // seatsAvailable
      transportType,
      proposerId,
    ]);

    res
      .status(201)
      .json({ msg: "Trajet créé avec succès", tripId: result.insertId });
  } catch (err) {
    console.error(err.message);
    // Gère les erreurs de clé étrangère (ex: proposerId n'existe pas)
    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      return res
        .status(400)
        .json({ msg: "L'utilisateur (proposerId) n'existe pas." });
    }
    res.status(500).send("Erreur serveur");
  }
});

export default router;
