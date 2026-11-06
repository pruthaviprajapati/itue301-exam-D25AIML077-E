# DriveEasy Car Rental System

**ITUE301: Advanced Web Development Frameworks**  
Open-Book Practical Examination | CSPIT, CHARUSAT | Set E

## Project Overview
DriveEasy is a self-drive car rental booking platform with three user roles: Customer, Fleet Manager, and Admin. Built with React (frontend), Express.js (backend), and MongoDB with Mongoose.

## Tech Stack
- **Frontend:** React 18 + Vite + React Router DOM
- **Backend:** Express.js + Node.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT (jsonwebtoken)

## Folder Structure
```
itue301-exam-D25AIML077-E/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/    # VehicleCard, Navigation, ProtectedRoute
│   │   ├── pages/         # LoginPage, FleetPage, MyBookingsPage, AdminPanel
│   │   ├── context/       # AuthContext
│   │   ├── App.jsx        # Router config with React.lazy + Suspense
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/          # Express backend
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── models/
│   │   ├── Customer.js    # name, email, phone, licenseNumber
│   │   ├── Vehicle.js     # model, type, pricePerDay, available
│   │   └── Booking.js     # customerId, vehicleId, pickupDate, returnDate, status
│   ├── middleware/
│   │   ├── requestLogger.js   # [METHOD] [PATH] [TIMESTAMP]
│   │   ├── authGuard.js       # Bearer token validation
│   │   └── errorHandler.js    # Global structured JSON errors
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── vehicleController.js
│   │   └── bookingController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── vehicleRoutes.js
│   │   └── bookingRoutes.js
│   ├── public/
│   │   └── test.html      # API test page
│   ├── server.js          # Entry point
│   ├── seed.js            # Database seed script
│   ├── .env.example
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (running on localhost:27017 or MongoDB Atlas)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env      # Edit MONGO_URI and JWT_SECRET
node seed.js              # Seed sample data
npm start                 # Starts on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev               # Starts on http://localhost:5173
```

### Demo Login Credentials
- Email: `john@example.com`
- Password: `pass123`

## API Endpoints

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| POST | `/api/v1/auth/login` | Authenticate customer, issue JWT | No |
| GET | `/api/v1/vehicles` | Return all vehicles | No |
| POST | `/api/v1/bookings` | Create a new booking | Yes |
| GET | `/api/v1/bookings/my` | Get customer's own bookings | Yes |
| PATCH | `/api/v1/bookings/:id/status` | Update booking status | Yes |

## Key Features
- Reusable `VehicleCard` component with props (model, type, pricePerDay, available)
- React Router with protected routes (`ProtectedRoute` wrapper)
- `AuthContext` holding `{ customer, token }` with login/logout
- Lazy-loaded Admin Panel via `React.lazy` + `Suspense`
- Global `requestLogger` middleware: `[METHOD] [PATH] [TIMESTAMP]`
- `authGuard` middleware: Bearer token validation, 401 if invalid
- Global error handler: structured JSON (handles Mongoose validation errors)
- Mongoose schema-level validation (required, unique, enum, min)
- Booking creation checks `vehicle.available`, sets to `false` after booking
- `.populate()` on `GET /bookings/my` for customer and vehicle details
- Client-side type filter (All | Hatchback | Sedan | SUV) without new API calls

## Environment Variables
See `.env.example` in the backend folder:
```
PORT=5000
JWT_SECRET=your_secret_key_here
MONGO_URI=your_mongodb_connection_string
```
