const { Enrollment, Progress, Lesson, Course } = require('../models');

exports.enrollStudent = async (req, res) => {
  try {
    const { user_id, course_id } = req.body;
    const enrollment = await Enrollment.create({ user_id, course_id });
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { user_id, lesson_id, is_completed, last_watched_second } = req.body;
    
    let progress = await Progress.findOne({ where: { user_id, lesson_id } });
    
    if (progress) {
      progress.is_completed = is_completed !== undefined ? is_completed : progress.is_completed;
      progress.last_watched_second = last_watched_second !== undefined ? last_watched_second : progress.last_watched_second;
      await progress.save();
    } else {
      progress = await Progress.create({ user_id, lesson_id, is_completed, last_watched_second });
    }
    
    res.json(progress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const lessons = await Lesson.findAll({ where: { course_id: courseId } });
    const progress = await Progress.findAll({
      where: { user_id: userId },
      include: [{ model: Lesson, where: { course_id: courseId } }]
    });
    
    const completedCount = progress.filter(p => p.is_completed).length;
    const percentage = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;
    
    res.json({
      percentage: Math.round(percentage),
      completedLessons: progress.filter(p => p.is_completed).map(p => p.lesson_id),
      lastWatched: progress.sort((a, b) => b.updated_at - a.updated_at)[0] || null
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
