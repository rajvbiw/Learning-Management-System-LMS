const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courseController');
const studentController = require('../controllers/studentController');
const quizController = require('../controllers/quizController');
const aiController = require('../controllers/aiController');

// Courses
router.get('/courses', courseController.getAllCourses);
router.get('/courses/:id', courseController.getCourseById);
router.post('/courses', courseController.createCourse);
router.post('/courses/:courseId/lessons', courseController.addLesson);

// Enrollment & Progress
router.post('/enroll', studentController.enrollStudent);
router.post('/progress', studentController.updateProgress);
router.get('/progress/:userId/:courseId', studentController.getCourseProgress);

// Quizzes
router.get('/quizzes/:lessonId', quizController.getQuizByLesson);
router.post('/quizzes/submit', quizController.submitQuiz);

// AI Chatbot
router.post('/ai/explain', aiController.explainTopic);
router.post('/ai/generate-quiz', aiController.generateQuizQuestions);

module.exports = router;
