import express from "express";
import db from "../config/db.js";

const router = express.Router();

/**
 * @route   POST /bookings
 * @desc    Réserve un trajet
 */
router.post("/", async (req, res) => {
  const { numberOfSeats, tripId, userId } = req.body;

  if (!numberOfSeats || !tripId || !userId) {
    return res
      .status(400)
      .json({ msg: "Champs manquants (numberOfSeats, tripId, userId)" });
  }

  let connection;
  try {
    // 1. Obtenir une connexion du pool pour la transaction
    connection = await db.getConnection();
    await connection.beginTransaction();

    // 2. Vérifier les places disponibles (en verrouillant la ligne pour éviter les conflits)
    const [trips] = await connection.query(
      "SELECT seatsAvailable FROM TRIP WHERE tripId = ? FOR UPDATE",
      [tripId]
    );

    if (trips.length === 0) {
      throw new Error("Trajet non trouvé");
    }

    const seatsAvailable = trips[0].seatsAvailable;

    if (seatsAvailable < numberOfSeats) {
      throw new Error("Pas assez de places disponibles");
    }

    // 3. Insérer la nouvelle réservation
    const [bookingResult] = await connection.query(
      "INSERT INTO BOOKING (numberOfSeats, status, tripId, userId) VALUES (?, ?, ?, ?)",
      [numberOfSeats, "confirmed", tripId, userId]
    );

    // 4. Mettre à jour le nombre de places sur le trajet
    await connection.query(
      "UPDATE TRIP SET seatsAvailable = seatsAvailable - ? WHERE tripId = ?",
      [numberOfSeats, tripId]
    );

    // 5. Valider la transaction
    await connection.commit();

    res
      .status(201)
      .json({
        msg: "Réservation confirmée",
        bookingId: bookingResult.insertId,
      });
  } catch (err) {
    // 6. En cas d'erreur, annuler la transaction
    if (connection) {
      await connection.rollback();
    }
    console.error(err.message);

    if (
      err.message === "Pas assez de places disponibles" ||
      err.message === "Trajet non trouvé"
    ) {
      return res.status(400).json({ msg: err.message });
    }
    res.status(500).send("Erreur serveur");
  } finally {
    // 7. Toujours libérer la connexion
    if (connection) {
      connection.release();
    }
  }
});

export default router;
