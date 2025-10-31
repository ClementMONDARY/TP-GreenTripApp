-- ============================================
-- Création de la base de données
-- ============================================
-- La base est déjà créée via POSTGRES_DB dans docker-compose.yml

-- ============================================
-- Types ENUM
-- ============================================
CREATE TYPE transport_type AS ENUM ('car', 'van', 'bike', 'bus');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');

-- ============================================
-- TABLE USER
-- ============================================
CREATE TABLE IF NOT EXISTS "user" (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    driver_license VARCHAR(50),
    criminal_record BOOLEAN DEFAULT FALSE
);

-- ============================================
-- TABLE TRIP
-- ============================================
CREATE TABLE IF NOT EXISTS trip (
    trip_id SERIAL PRIMARY KEY,
    departure_location VARCHAR(255) NOT NULL,
    arrival_location VARCHAR(255) NOT NULL,
    departure_date_time TIMESTAMP NOT NULL,
    seats_total INT NOT NULL,
    seats_available INT NOT NULL,
    transport_type transport_type NOT NULL,
    proposer_id INT NOT NULL,
    FOREIGN KEY (proposer_id) REFERENCES "user"(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ============================================
-- TABLE BOOKING
-- ============================================
CREATE TABLE IF NOT EXISTS booking (
    booking_id SERIAL PRIMARY KEY,
    number_of_seats INT NOT NULL,
    status booking_status DEFAULT 'pending',
    trip_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (trip_id) REFERENCES trip(trip_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ============================================
-- Données d'exemple
-- ============================================

-- Utilisateurs
INSERT INTO "user" (email, password_hash, first_name, last_name, phone_number, driver_license, criminal_record)
VALUES
('alice.dupont@example.com', 'hash123', 'Alice', 'Dupont', '0612345678', 'B123456', FALSE),
('bob.martin@example.com', 'hash456', 'Bob', 'Martin', '0698765432', 'C987654', FALSE),
('charlie.durand@example.com', 'hash789', 'Charlie', 'Durand', '0655443322', NULL, FALSE),
('david.moreau@example.com', 'hash000', 'David', 'Moreau', '0677889900', 'B111222', TRUE);

-- Trajets
INSERT INTO trip (departure_location, arrival_location, departure_date_time, seats_total, seats_available, transport_type, proposer_id)
VALUES
('Paris', 'Lyon', '2025-11-01 08:00:00', 4, 3, 'car', 1),
('Marseille', 'Nice', '2025-11-02 09:30:00', 3, 2, 'car', 2),
('Toulouse', 'Bordeaux', '2025-11-03 07:45:00', 2, 1, 'van', 1);

-- Réservations
INSERT INTO booking (number_of_seats, status, trip_id, user_id)
VALUES
(1, 'confirmed', 1, 3),
(2, 'pending', 2, 4),
(1, 'confirmed', 3, 3);

-- ============================================
-- Vérification
-- ============================================
SELECT * FROM "user";
SELECT * FROM trip;
SELECT * FROM booking;
