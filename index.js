import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// Import des routeurs
import tripsRouter from "./routes/trips.js";
import bookingsRouter from "./routes/booking.js";

const app = express();
const PORT = process.env.PORT || 3000;

// === Middlewares ===
// Active CORS pour autoriser les requêtes cross-domaine
app.use(cors());
// Parse le JSON entrant (pour lire req.body)
app.use(express.json());

// === Routes de l'API ===
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API GreenTrip 🌱");
});

// Connecte les routeurs
app.use("/trips", tripsRouter);
app.use("/bookings", bookingsRouter);

// === Démarrage du serveur ===
app.listen(PORT, () => {
  console.log(`Serveur GreenTrip démarré sur http://localhost:${PORT}`);
});
