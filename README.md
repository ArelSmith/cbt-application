# 🧠 CBT School System

A Computer-Based Test (CBT) web application designed for school institutions to conduct secure, efficient, and fully digital exams.
Built with Next.js, Express.js, MySQL, and Docker for modular scalability and simple deployment.

## 🚀 Tech Stack
Layer	Technology
Frontend	Next.js
Backend	Express.js
Database	MySQL
Containerization	Docker
ORM (optional)	Prisma or Sequelize
🧩 Features
👨‍🏫 Teacher

Manage question banks (multiple choice, essay, true/false, matching).

Import/export questions via Excel or CSV.

Schedule exams for specific classes.

Monitor exam sessions in real-time.

Manually grade essay questions.

Export results to Excel or PDF.

## 👩‍🎓 Student

Login using student ID and password.

Access active or scheduled exams.

Take exams with timer and autosubmit feature.

Randomized question and answer order.

Security: fullscreen enforcement, tab-switch detection, one active session.

View exam scores if allowed.

## 👨‍💼 Admin

Manage teacher and student accounts.

Configure global exam settings and permissions.

Access reports and analytics dashboard.

## 🏗️ Project Structure
cbt-app/
│
├── client/               # Next.js frontend
│   ├── pages/
│   ├── components/
│   ├── utils/
│   └── ...
│
├── server/               # Express.js backend
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── middleware/
│
├── docker-compose.yml
└── README.md

## ⚙️ Installation & Setup

Clone the repository
git clone https://github.com/<your-username>/cbt-school-system.git

Navigate to the project folder
cd cbt-school-system

Start all services using Docker Compose
docker-compose up -d

Access the application

Frontend → http://localhost:3000

Backend API → http://localhost:5000

## 🧠 Environment Variables

For Express.js, create a .env file inside the server/ directory:

PORT=5000
DB_HOST=db
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=cbt_db
JWT_SECRET=your_secret_key


For Next.js, create a .env.local file inside the client/ directory:

NEXT_PUBLIC_API_URL=http://localhost:5000

## 🧾 API Overview

Auth Routes

POST /api/auth/login – User login

POST /api/auth/register – Create new account (admin/teacher)

Question Routes

GET /api/questions – Fetch questions

POST /api/questions – Create question

PUT /api/questions/:id – Update question

DELETE /api/questions/:id – Delete question

Exam Routes

POST /api/exams – Create exam

GET /api/exams/:id – Get exam details

POST /api/exams/:id/submit – Submit answers

## 📦 Deployment

To rebuild and run in production mode:

docker-compose down
docker-compose up --build -d

## 🧰 Future Improvements

Integration with School Information System (SIS).

Cloud deployment (AWS/Azure) support.

Enhanced analytics and reporting.

Role-based permission refinements.

## 👨‍💻 Author

Developed by Arel
💼 Role: Fullstack Web Developer
📧 Contact: [arelarel576@gmail.com]
🌐 Portfolio: [arelsmith.my.id]
