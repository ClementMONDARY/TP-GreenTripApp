-- ============================================
-- Création de la base de données
-- ============================================
CREATE DATABASE IF NOT EXISTS GreenTrip;
USE GreenTrip;

-- ============================================
-- TABLE USER
-- ============================================
CREATE TABLE USER (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(20),
    driverLicense VARCHAR(50),
    criminalRecord BOOLEAN DEFAULT FALSE
);

-- ============================================
-- TABLE TRIP
-- ============================================
CREATE TABLE TRIP (
    tripId INT AUTO_INCREMENT PRIMARY KEY,
    departureLocation VARCHAR(255) NOT NULL,
    arrivalLocation VARCHAR(255) NOT NULL,
    departureDateTime DATETIME NOT NULL,
    seatsTotal INT NOT NULL,
    seatsAvailable INT NOT NULL,
    transportType ENUM('car', 'van', 'bike', 'bus') NOT NULL,
    proposerId INT NOT NULL,
    FOREIGN KEY (proposerId) REFERENCES USER(userId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ============================================
-- TABLE BOOKING
-- ============================================
CREATE TABLE BOOKING (
    bookingId INT AUTO_INCREMENT PRIMARY KEY,
    numberOfSeats INT NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    tripId INT NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (tripId) REFERENCES TRIP(tripId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (userId) REFERENCES USER(userId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ============================================
-- Données d’exemple
-- ============================================

-- Utilisateurs
INSERT INTO USER (email, passwordHash, firstName, lastName, phoneNumber, driverLicense, criminalRecord)
VALUES
('alice.dupont@example.com', 'hash123', 'Alice', 'Dupont', '0612345678', 'B123456', FALSE),
('bob.martin@example.com', 'hash456', 'Bob', 'Martin', '0698765432', 'C987654', FALSE),
('charlie.durand@example.com', 'hash789', 'Charlie', 'Durand', '0655443322', NULL, FALSE),
('david.moreau@example.com', 'hash000', 'David', 'Moreau', '0677889900', 'B111222', TRUE);

-- Trajets
INSERT INTO TRIP (departureLocation, arrivalLocation, departureDateTime, seatsTotal, seatsAvailable, transportType, proposerId)
VALUES
('Paris', 'Lyon', '2025-11-01 08:00:00', 4, 3, 'car', 1),
('Marseille', 'Nice', '2025-11-02 09:30:00', 3, 2, 'car', 2),
('Toulouse', 'Bordeaux', '2025-11-03 07:45:00', 2, 1, 'van', 1);

-- Réservations
INSERT INTO BOOKING (numberOfSeats, status, tripId, userId)
VALUES
(1, 'confirmed', 1, 3),
(2, 'pending', 2, 4),
(1, 'confirmed', 3, 3);

-- ============================================
-- Vérification
-- ============================================
SELECT * FROM USER;
SELECT * FROM TRIP;
SELECT * FROM BOOKING;
