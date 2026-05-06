const { Quiz, Question, Answer, QuizAttempt } = require('../models');

exports.getQuizByLesson = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      where: { lesson_id: req.params.lessonId },
      include: [{
        model: Question,
        include: [{ model: Answer, attributes: ['id', 'answer_text'] }] // Don't send 'is_correct' to client
      }]
    });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const { user_id, quiz_id, submissions } = req.body; // submissions: [{ question_id, answer_id }]
    
    const questions = await Question.findAll({
      where: { quiz_id },
      include: [{ model: Answer, where: { is_correct: true } }]
    });
    
    let correctCount = 0;
    submissions.forEach(sub => {
      const question = questions.find(q => q.id === sub.question_id);
      if (question && question.Answers[0].id === sub.answer_id) {
        correctCount++;
      }
    });
    
    const score = (correctCount / questions.length) * 100;
    const attempt = await QuizAttempt.create({ user_id, quiz_id, score });
    
    res.json({ score, attempt });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
