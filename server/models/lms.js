const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { User, Course, Lesson } = require('./core');

const Enrollment = sequelize.define('Enrollment', {
  enrolled_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

const Quiz = sequelize.define('Quiz', {
  title: { type: DataTypes.STRING, allowNull: false },
});

const Question = sequelize.define('Question', {
  question_text: { type: DataTypes.TEXT, allowNull: false },
  type: { type: DataTypes.ENUM('mcq'), defaultValue: 'mcq' },
});

const Answer = sequelize.define('Answer', {
  answer_text: { type: DataTypes.TEXT, allowNull: false },
  is_correct: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const QuizAttempt = sequelize.define('QuizAttempt', {
  score: { type: DataTypes.DECIMAL(5, 2) },
});

const Progress = sequelize.define('Progress', {
  is_completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  last_watched_second: { type: DataTypes.INTEGER, defaultValue: 0 },
});

// Relationships
User.belongsToMany(Course, { through: Enrollment, foreignKey: 'user_id' });
Course.belongsToMany(User, { through: Enrollment, foreignKey: 'course_id' });

Lesson.hasOne(Quiz, { foreignKey: 'lesson_id', onDelete: 'CASCADE' });
Quiz.belongsTo(Lesson, { foreignKey: 'lesson_id' });

Quiz.hasMany(Question, { foreignKey: 'quiz_id', onDelete: 'CASCADE' });
Question.belongsTo(Quiz, { foreignKey: 'quiz_id' });

Question.hasMany(Answer, { foreignKey: 'question_id', onDelete: 'CASCADE' });
Answer.belongsTo(Question, { foreignKey: 'question_id' });

User.hasMany(QuizAttempt, { foreignKey: 'user_id' });
QuizAttempt.belongsTo(User, { foreignKey: 'user_id' });
Quiz.hasMany(QuizAttempt, { foreignKey: 'quiz_id' });
QuizAttempt.belongsTo(Quiz, { foreignKey: 'quiz_id' });

User.hasMany(Progress, { foreignKey: 'user_id' });
Progress.belongsTo(User, { foreignKey: 'user_id' });
Lesson.hasMany(Progress, { foreignKey: 'lesson_id' });
Progress.belongsTo(Lesson, { foreignKey: 'lesson_id' });

module.exports = { Enrollment, Quiz, Question, Answer, QuizAttempt, Progress };
