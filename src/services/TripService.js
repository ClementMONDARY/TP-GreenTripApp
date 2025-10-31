// import { TripModel } from "../models/TripModel.js";

// export const TripService = {
//   async getAllTrips() {
//     return await TripModel.getAll();
//   },

//   async createTrip(data) {
//     if (!data.start || !data.end) throw new Error("start et end sont obligatoires");
//     const seatsTotal = Number(data.seatsTotal || 0);
//     if (!Number.isInteger(seatsTotal) || seatsTotal <= 0) throw new Error("seatsTotal doit être > 0");
//     const tripData = {
//       start: data.start,
//       end: data.end,
//       seatsTotal,
//       seatsAvailable: seatsTotal,
//       date: data.date || null,
//       transport: data.transport || null,
//     };
//     return await TripModel.create(tripData);
//   },

//   async reserveSeat(tripId, qty = 1) {
//     if (qty <= 0) throw new Error("qty must be positive");
//     return await TripModel.decreaseSeats(tripId, qty);
//   }
// };

import { TripModel } from "../models/TripModel.js";
export const TripService = {
  async createTrip(data) {
    if (!data.start || !data.end) throw new Error("Start and end required");
    if (data.seatsTotal <= 0) throw new Error("Seats must be positive");
    const tripData = {
      ...data,
      seatsAvailable: data.seatsTotal,
    };
    return await TripModel.create(tripData);
  },
  async getAllTrips() {
    return await TripModel.getAll();
  },
};