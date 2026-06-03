# ChartWiz Academy LMS

A modern Learning Management System (LMS) built with the MERN Stack for stock market and trading education.

## Features

### Authentication

- Email & Password Login
- Google Login
- Email Verification
- Protected Routes
- Role Based Access Control

### Student Features

- Student Dashboard
- View Enrolled Courses
- Enroll in Courses
- Join Live Classes
- Update Profile
- Course Progress Access

### Teacher Features

- Teacher Dashboard
- Create Courses
- Manage Courses
- Create Live Courses
- Publish Google Meet Sessions
- Manage Students
- Update Profile

### Admin Features

- Admin Dashboard
- User Management
- Role Management
- Payment Management
- Analytics Dashboard
- Student Approval System

### Course Management

- Recorded Courses
- Live Courses
- Course Categories
- Video Lessons
- Student Enrollment

### Payment System

- Offline Payment Support
- Invoice Generation
- Payment Records
- Razorpay Ready Architecture

### Security

- JWT Authentication
- Protected APIs
- Role-Based Authorization
- Secure Cookies
- Email Verification

---

## Tech Stack

### Frontend

- React.js
- Redux
- React Router DOM
- Tailwind CSS
- React Hot Toast
- Google OAuth

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Nodemailer

### Database

- MongoDB Atlas

### Deployment

- Vercel (Frontend)
- Render (Backend)

---

## Project Structure

client/
├── src/
│ ├── actions/
│ ├── reducers/
│ ├── pages/
│ ├── components/
│ ├── constants/
│ ├── config/
│ └── store.js

server/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── config/
└── server.js

---

## Environment Variables

### Backend (.env)

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY

CLIENT_URL=http://localhost:5173

SERVER_URL=http://localhost:5000

EMAIL_USER=YOUR_EMAIL

EMAIL_PASS=YOUR_APP_PASSWORD

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/chartwiz-academy.git

cd chartwiz-academy
```

### Backend Setup

```bash
cd server

npm install

npm run dev
```

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

## API Routes

### Authentication

```http
POST /api/users/register
POST /api/users/login
POST /api/users/google
GET  /api/users/me
GET  /api/users/logout
GET  /api/users/verify/:token
```

### Courses

```http
GET    /api/courses
GET    /api/courses/:id
POST   /api/courses/:id/enroll
POST   /api/courses/teacher/create
GET    /api/courses/teacher/my-courses
DELETE /api/courses/teacher/:id
```

### Live Courses

```http
GET    /api/live-courses
POST   /api/live-courses
POST   /api/live-courses/:id/enroll
PUT    /api/live-courses/:id/publish
DELETE /api/live-courses/:id
```

### Admin

```http
GET    /api/admin/users
PUT    /api/admin/users/:id/role
DELETE /api/admin/users/:id
GET    /api/admin/stats
GET    /api/admin/analytics
```

### Payments

```http
POST /api/payments/offline
GET  /api/payments
```

---

## Future Improvements

- Razorpay Integration
- Course Progress Tracking
- Quiz System
- Certificates
- Notifications
- Student Attendance
- Revenue Analytics
- Discussion Forum

---

## Author

Arjun Virk

Full Stack MERN Developer

Built with ❤️ using React, Node.js, Express, MongoDB and Tailwind CSS.
