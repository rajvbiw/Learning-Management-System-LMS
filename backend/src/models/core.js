const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('student', 'instructor'), defaultValue: 'student' },
});

const Course = sequelize.define('Course', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  thumbnail_url: { type: DataTypes.STRING },
});

const Lesson = sequelize.define('Lesson', {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT },
  video_url: { type: DataTypes.STRING },
  order_index: { type: DataTypes.INTEGER, defaultValue: 0 },
});

// Relationships
User.hasMany(Course, { foreignKey: 'instructor_id' });
Course.belongsTo(User, { as: 'instructor', foreignKey: 'instructor_id' });

Course.hasMany(Lesson, { foreignKey: 'course_id', onDelete: 'CASCADE' });
Lesson.belongsTo(Course, { foreignKey: 'course_id' });

module.exports = { User, Course, Lesson };
