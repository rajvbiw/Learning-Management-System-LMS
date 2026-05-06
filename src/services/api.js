import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
});

export const courseService = {
  getAll: () => api.get('/courses'),
  getById: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post('/courses', data),
  addLesson: (courseId, data) => api.post(`/courses/${courseId}/lessons`, data),
};

export const studentService = {
  enroll: (userId, courseId) => api.post('/enroll', { user_id: userId, course_id: courseId }),
  updateProgress: (data) => api.post('/progress', data),
  getProgress: (userId, courseId) => api.get(`/progress/${userId}/${courseId}`),
};

export const quizService = {
  getQuiz: (lessonId) => api.get(`/quizzes/${lessonId}`),
  submit: (data) => api.post('/quizzes/submit', data),
};

export const aiService = {
  explain: (topic, context) => api.post('/ai/explain', { topic, context }),
  generateQuiz: (lessonContent) => api.post('/ai/generate-quiz', { lessonContent }),
};

export default api;
