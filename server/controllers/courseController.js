const { Course, Lesson, User } = require('../models');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [{ model: User, as: 'instructor', attributes: ['name', 'email'] }],
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        { model: User, as: 'instructor', attributes: ['name', 'email'] },
        { model: Lesson, attributes: ['id', 'title', 'order_index', 'video_url'] },
      ],
    });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { title, description, thumbnail_url, instructor_id } = req.body;
    const course = await Course.create({ title, description, thumbnail_url, instructor_id });
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addLesson = async (req, res) => {
  try {
    const { title, content, video_url, order_index } = req.body;
    const lesson = await Lesson.create({
      course_id: req.params.courseId,
      title,
      content,
      video_url,
      order_index,
    });
    res.status(201).json(lesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
