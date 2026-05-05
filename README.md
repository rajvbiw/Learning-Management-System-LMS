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
- A code editor (like VS Code)

### 2. Database Setup
1. Open your MySQL terminal or a tool like MySQL Workbench.
2. Create a new database:
   ```sql
   CREATE DATABASE lms_db;
   ```
3. Import the initial schema:
   ```bash
   mysql -u your_username -p lms_db < schema.sql
   ```
   *(Alternatively, copy the contents of `schema.sql` and run it in your SQL editor.)*

### 3. Backend Configuration
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Open `.env` and update the following with your credentials:
     ```env
     DB_USER=root
     DB_PASS=your_mysql_password
     OPENAI_API_KEY=your_openai_api_key
     ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server should now be running at `http://localhost:5000`.

### 4. Frontend Configuration
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm run dev
   ```
4. Open your browser and go to the URL provided by Vite (usually `http://localhost:5173`).

## 📂 Project Structure
```text
LMS/
├── backend/           # Express server & Sequelize models
│   ├── src/
│   │   ├── config/    # Database configuration
│   │   ├── models/    # Database models
│   │   ├── controllers/# Business logic (Course, Quiz, AI, Student)
│   │   └── routes/    # API endpoints
├── frontend/          # React + Vite application
│   ├── src/
│   │   ├── components/# UI components (Navbar, CourseCard, AIModal)
│   │   ├── pages/     # Views (Home, Dashboard, CourseDetail)
│   │   └── services/  # API integration (Axios)
└── schema.sql         # Full MySQL database schema
```

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact
Your Name - [@yourhandle](https://twitter.com/yourhandle) - email@example.com

Project Link: [https://github.com/yourusername/LMS](https://github.com/yourusername/LMS)
