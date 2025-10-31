import db from "./src/config/db.js";

(async () => {
  try {
    const [rows] = await db.execute("SELECT 1 AS ok");
    console.log("DB OK:", rows);
    process.exit(0);
  } catch (e) {
    console.error("Échec connexion DB :", e.code, e.message);
    process.exit(1);
  }
})();
