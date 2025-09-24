FleetLink - Logistics Vehicle Booking System
FleetLink is a full-stack logistics vehicle booking system for B2B clients. It allows administrators and users to manage vehicles, check real-time availability considering capacity, routes, and booking schedules, and initiate logistics bookings.

🚀 Features
Backend (Node.js + Express + MongoDB)
Vehicle Management: Add and manage vehicles with details like name, capacity, and tyres.

Availability Check: Robust logic to filter available vehicles based on capacity, route, and booking time.

Booking System: Secure booking with conflict checks to prevent double bookings.

Unit Testing: Critical backend logic covered with Jest (availability, booking conflicts).

Frontend (React)
Vehicle Management UI: Add new vehicles to the fleet.

Search Vehicles: Search based on capacity, route, and start time.

Real-time Availability: Displays estimated ride duration and available vehicles.

Booking Flow: Book vehicles directly with feedback on success or conflicts.

Bonus
Dockerized Setup: docker-compose.yml provided to run backend, frontend, and MongoDB with a single command.

Modular Project Structure for scalability.

⚡ Tech Stack
Frontend: React, Axios, React Router,

Backend: Node.js, Express, Mongoose, Jest

Database: MongoDB

Containerization: Docker, Docker Compose

🔧 Installation & Setup
Prerequisites
Node.js (>=20)

npm / yarn

Docker & Docker Compose

Run with Docker (Recommended 🚀)
bash
# Clone repository
```
git clone https://github.com/Utsavkachchhi/FleetLink.git
cd FleetLink
```
# Start all services (backend, frontend, MongoDB)
```
docker-compose up --build -d
```

Backend runs at: http://localhost:8080

Frontend runs at: http://localhost:3000

MongoDB runs at: mongodb://localhost:27017/fleetlink

Run Without Docker
Backend
```
cd server
npm install
npm run dev
```
Frontend
```
cd client
npm install
npm start
```
MongoDB must be running locally (mongodb://localhost:27017/fleetlink).

📌 API Endpoints
Vehicles
POST /api/vehicles → Add a new vehicle

GET /api/vehicles/available → Search available vehicles

Bookings
POST /api/bookings → Create a new booking

DELETE /api/bookings/:id → Cancel a booking 

GET /api/bookings  -> Get all bookings

🧪 Testing (Backend)
bash
cd server
npm run test
