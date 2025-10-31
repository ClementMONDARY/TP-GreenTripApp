// import { TripService } from "../services/TripService.js";

// export const TripController = {
//   async getAll(req, res) {
//     try {
//       const trips = await TripService.getAllTrips();
//       res.json(trips);
//     } catch (e) {
//       console.error(e);
//       res.status(500).json({ error: "Erreur serveur", message: e.message });
//     }
//   },

//   async create(req, res) {
//     try {
//       const trip = await TripService.createTrip(req.body);
//       res.status(201).json(trip);
//     } catch (e) {
//       res.status(400).json({ error: e.message });
//     }
//   },

//   async reserve(req, res) {
//     try {
//       const { id } = req.params;
//       const { qty } = req.body;
//       const updated = await TripService.reserveSeat(Number(id), Number(qty || 1));
//       res.json(updated);
//     } catch (e) {
//       res.status(400).json({ error: e.message });
//     }
//   }
// };

import { TripService } from "../services/TripService.js";
export const TripController = {
  async getAll(req, res) {
    const trips = await TripService.getAllTrips();
    res.json(trips);
  },
  async create(req, res) {
    try {
      const trip = await TripService.createTrip(req.body);
      res.status(201).json(trip);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
};