const sequelize = require('../config/database');
const { User, Course, Lesson } = require('./core');
const { Enrollment, Quiz, Question, Answer, QuizAttempt, Progress } = require('./lms');

module.exports = {
  sequelize,
  User,
  Course,
  Lesson,
  Enrollment,
  Quiz,
  Question,
  Answer,
  QuizAttempt,
  Progress,
};
