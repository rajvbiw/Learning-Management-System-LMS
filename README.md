# Lumina LMS - Production-Quality Learning Management System

A sleek, minimal, and production-ready LMS built with React, Node.js (Express), and MySQL.

## 🚀 Features
- **Courses System**: Create and manage courses with lessons, descriptions, and thumbnails.
- **Video Learning**: High-quality video playback with progress tracking and "Last Watched" memory.
- **Quiz System**: Automated MCQ assessments, instant scoring, and attempt history.
- **AI Chatbot**: In-course AI tutor powered by OpenAI to explain complex topics and generate custom quizzes.
- **Premium UI**: Modern dark-themed dashboard with glassmorphism, smooth animations (Framer Motion), and responsive layouts.
- **Instructor Dashboard**: Dedicated view for instructors to manage their content and students.

## 🏗️ Tech Stack
- **Frontend**: React, Vite, Framer Motion, Lucide React.
- **Backend**: Node.js, Express, Sequelize ORM.
- **Database**: MySQL.

## 🛠️ Step-by-Step Run Guide

Follow these steps to get the project up and running on your local machine.

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)

### 2. Database Setup
1. Create a new database: `CREATE DATABASE lms_db;`
2. Import the initial schema:
   ```bash
   mysql -u your_username -p lms_db < schema.sql
   ```

### 3. Setup & Run
1. Install root dependencies:
   ```bash
   npm install
   ```
2. Configure Environment Variables:
   - Copy `.env.example` to `.env` and update your credentials.
3. Start both Frontend & Backend:
   ```bash
   npm run dev
   ```
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 📂 Project Structure
```text
LMS/
├── server/            # Express server & Sequelize models
│   ├── config/        # Database configuration
│   ├── models/        # Database models
│   ├── controllers/   # Business logic
│   └── routes/        # API endpoints
├── src/               # React frontend (Vite source)
│   ├── components/    # UI components
│   ├── pages/         # Views
│   └── services/      # API integration
├── public/            # Static assets
├── package.json       # Unified dependencies
├── vite.config.mjs    # Frontend build config with proxy
└── schema.sql         # MySQL database schema
```
## 📧 Contact
Your Name - Raj Birari - rajbirari.work@example.com

Project Link: https://github.com/rajvbiw/Learning-Management-System-LMS
