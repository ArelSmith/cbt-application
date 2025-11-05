-- CBT Application Database Schema
-- Run this in phpMyAdmin or MySQL CLI

-- Drop existing tables if needed (for dev only)
-- DROP TABLE IF EXISTS proctoring_logs, exam_sessions, answers, exam_enrollments, questions, exams, users;

-- INSERT INTO `users` (`id`, `email`, `password`, `name`, `role`, `student_id`, `created_at`, `updated_at`) VALUES (NULL, 'admin@cbt.test', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'admin', NULL, CURRENT_TIMESTAMP, NULL);

-- 1. users table
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NULL,                -- optional
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin','teacher','student') NOT NULL,
  student_id VARCHAR(100) NULL,           -- required for students
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
);

-- 2. exams table
CREATE TABLE exams (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  subject VARCHAR(100),
  duration_min INT NOT NULL,
  scheduled_at DATETIME NOT NULL,
  created_by BIGINT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  total_questions INT NOT NULL,
  instructions TEXT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. questions table
CREATE TABLE questions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  exam_id BIGINT NOT NULL,
  question_image VARCHAR(255) NULL,
  question_text TEXT NOT NULL,
  question_type ENUM('multiple_choice','essay') NOT NULL,
  option_a VARCHAR(255) NULL,
  option_b VARCHAR(255) NULL,
  option_c VARCHAR(255) NULL,
  option_d VARCHAR(255) NULL,
  option_e VARCHAR(255) NULL,
  correct_option CHAR(1) NULL, -- 'A', 'B', 'C', 'D', or 'E'
  marks INT NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
);

-- 4. exam_enrollments table
CREATE TABLE exam_enrollments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  exam_id BIGINT NOT NULL,
  student_id BIGINT NOT NULL,
  status ENUM('scheduled','started','submitted','graded') DEFAULT 'scheduled',
  started_at DATETIME NULL,
  submitted_at DATETIME NULL,
  UNIQUE KEY unique_enrollment (exam_id, student_id),
  FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. answers table
CREATE TABLE answers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  enrollment_id BIGINT NOT NULL,
  question_id BIGINT NOT NULL,
  answer_text TEXT NULL, -- for essay
  selected_option CHAR(1) NULL, -- for MCQ ('A'-'E')
  is_correct BOOLEAN NULL, -- auto-set for MCQ, NULL for essay
  graded_by BIGINT NULL, -- teacher who graded
  graded_at DATETIME NULL,
  marks_awarded INT NULL, -- for essay (override auto-score)
  FOREIGN KEY (enrollment_id) REFERENCES exam_enrollments(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
  FOREIGN KEY (graded_by) REFERENCES users(id)
);

-- 6. exam_sessions table
CREATE TABLE exam_sessions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  enrollment_id BIGINT NOT NULL,
  token VARCHAR(255) NOT NULL,
  ip_address VARCHAR(45) NULL,
  user_agent TEXT NULL,
  started_at DATETIME NOT NULL,
  ended_at DATETIME NULL,
  is_active BOOLEAN DEFAULT true,
  FOREIGN KEY (enrollment_id) REFERENCES exam_enrollments(id) ON DELETE CASCADE
);

-- 7. proctoring_logs table
CREATE TABLE proctoring_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL,
  event_type ENUM('blur','focus','visibility_change') NOT NULL,
  event_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  details JSON NULL, -- e.g., { "visibility": "hidden" }
  FOREIGN KEY (session_id) REFERENCES exam_sessions(id) ON DELETE CASCADE
);