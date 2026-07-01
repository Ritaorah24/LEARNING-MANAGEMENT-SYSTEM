import express from 'express';
import {
  getStudentDashboard,
  getCourseCatalog,
  enrollCourse,
  getCourseLessons,
  getLessonResources,
  markLessonComplete,
  getCourseProgress,
  getCourseQuizzes,
  submitQuiz,
  generateCertificate,
  getStudentCertificates
} from '../controllers/studentController.js';
import validate from '../validators/studentValidator.js';
import {
  enrollCourseSchema,
  completeLessonSchema,
  submitQuizSchema
} from '../validators/studentValidator.js';
import authMiddleware, { studentOnly } from '../middleware/authMiddleware.js';

const studentRoutes = express.Router();

 

// dashboard
studentRoutes.get('/dashboard', authMiddleware, studentOnly, getStudentDashboard);

// course catalog
studentRoutes.get('/courses', authMiddleware, studentOnly, getCourseCatalog);

// enrollment
studentRoutes.post('/enroll', authMiddleware, studentOnly, validate(enrollCourseSchema), enrollCourse);

// video lessons
studentRoutes.get('/courses/:courseId/lessons', authMiddleware, studentOnly, getCourseLessons);

// downloadable resources
studentRoutes.get('/lessons/:lessonId/resources', authMiddleware, studentOnly, getLessonResources);

// progress tracking
studentRoutes.post('/lessons/complete', authMiddleware, studentOnly, validate(completeLessonSchema), markLessonComplete);
studentRoutes.get('/courses/:courseId/progress', authMiddleware, studentOnly, getCourseProgress);

// quizzes
studentRoutes.get('/courses/:courseId/quizzes', authMiddleware, studentOnly, getCourseQuizzes);
studentRoutes.post('/quizzes/:quizId/submit', authMiddleware, studentOnly, validate(submitQuizSchema), submitQuiz);

// certificates
studentRoutes.post('/courses/:courseId/certificate', authMiddleware, studentOnly, generateCertificate);
studentRoutes.get('/certificates', authMiddleware, studentOnly, getStudentCertificates);

export default studentRoutes;