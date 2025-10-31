// import db from "../config/db.js";

// export const TripModel = {
//   async getAll() {
//     const [rows] = await db.execute(
//       `SELECT
//          tripId AS id,
//          departureLocation AS start,
//          arrivalLocation AS end,
//          departureDateTime AS date,
//          seatsTotal,
//          seatsAvailable,
//          transportType AS transport,
//          proposerId
//        FROM TRIP`
//     );
//     return rows;
//   },

//   async getById(id) {
//     const [rows] = await db.execute(
//       `SELECT
//          tripId AS id,
//          departureLocation AS start,
//          arrivalLocation AS end,
//          departureDateTime AS date,
//          seatsTotal,
//          seatsAvailable,
//          transportType AS transport,
//          proposerId
//        FROM TRIP
//        WHERE tripId = ?`,
//       [id]
//     );
//     return rows[0] || null;
//   },

//   async create(trip) {
//     const [result] = await db.execute(
//       `INSERT INTO TRIP
//          (departureLocation, arrivalLocation, departureDateTime, seatsTotal, seatsAvailable, transportType, proposerId)
//        VALUES (?, ?, ?, ?, ?, ?, ?)`,
//       [
//         trip.start,
//         trip.end,
//         trip.date || null,
//         trip.seatsTotal,
//         trip.seatsAvailable ?? trip.seatsTotal,
//         trip.transport || null,
//         trip.proposerId || null,
//       ]
//     );
//     const id = result.insertId;
//     return this.getById(id);
//   },

//   async decreaseSeats(id, qty = 1) {
//     const conn = await db.getConnection();
//     try {
//       await conn.beginTransaction();
//       const [rows] = await conn.execute(
//         "SELECT seatsAvailable FROM TRIP WHERE tripId = ? FOR UPDATE",
//         [id]
//       );
//       if (rows.length === 0) throw new Error("Trip not found");
//       const available = rows[0].seatsAvailable;
//       if (available < qty) throw new Error("Not enough seats");
//       await conn.execute(
//         "UPDATE TRIP SET seatsAvailable = seatsAvailable - ? WHERE tripId = ?",
//         [qty, id]
//       );
//       await conn.commit();
//       const [updated] = await conn.execute(
//         `SELECT
//            tripId AS id,
//            departureLocation AS start,
//            arrivalLocation AS end,
//            departureDateTime AS date,
//            seatsTotal,
//            seatsAvailable,
//            transportType AS transport,
//            proposerId
//          FROM TRIP
//          WHERE tripId = ?`,
//         [id]
//       );
//       return updated[0];
//     } catch (e) {
//       await conn.rollback();
//       throw e;
//     } finally {
//       conn.release();
//     }
//   }
// };

import db from "../config/db.js";
export const TripModel = {
  async getAll() {
    const result = await db.query("SELECT * FROM trips");
    return result.rows;
  },
  async create(trip) {
    const query = `
      INSERT INTO trips (departureLocation, arrivalLocation, departureDateTime, seatsTotal, seatsAvailable, transportType, proposerId)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [
      departureLocation,
      arrivalLocation,
      departureDateTime,
      seatsTotal,
      seatsAvailable,
      transportType,
      proposerId,
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  },
};