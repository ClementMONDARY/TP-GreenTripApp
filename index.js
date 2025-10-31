import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// Import des routeurs
import tripsRouter from "./src/routes/trips.js";
import bookingsRouter from "./src/routes/booking.js";

const app = express();
const PORT = Number(process.env.PORT || 3000);

// === Middlewares ===
// Active CORS pour autoriser les requêtes cross-domaine
app.use(cors()); // en prod, configure origin
// Parse le JSON entrant (pour lire req.body)
app.use(express.json());

// === Routes de l'API ===
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API GreenTrip 🌱");
});

// Connecte les routeurs
app.use("/trips", tripsRouter);
app.use("/bookings", bookingsRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

// === Démarrage du serveur ===
const server = app.listen(PORT, () => {
  console.log(`Serveur GreenTrip démarré sur http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Fermeture du serveur...");
  server.close(() => process.exit(0));
});
process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection:", reason);
});
