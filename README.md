# 🧠 CBT School System

A **Computer-Based Test (CBT)** web application designed for school institutions to conduct secure, efficient, and fully digital exams.  
Built with **Next.js**, **Express.js**, **MySQL**, and **Docker** for modular scalability and simple deployment.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js |
| Backend | Express.js |
| Database | MySQL |

---

## 🧩 Features

### 👨‍🏫 Teacher
- Manage question banks (multiple choice, essay, true/false, matching).
- Import/export questions via Excel or CSV.
- Schedule exams for specific classes.
- Monitor exam sessions in real-time.
- Manually grade essay questions.
- Export results to Excel or PDF.

### 👩‍🎓 Student
- Login using student ID and password.
- Access active or scheduled exams.
- Take exams with timer and autosubmit feature.
- Randomized question and answer order.
- Security: fullscreen enforcement, tab-switch detection, one active session.
- View exam scores if allowed.

### 👨‍💼 Admin
- Manage teacher and student accounts.
- Configure global exam settings and permissions.
- Access reports and analytics dashboard.

---

## 🏗️ Project Structure

```
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
```

## ⚙️ Installation & Setup

1. Clone the repository
```
git clone https://github.com/ArelSmith/cbt-application.git
```


2. Navigate to the project folder
```
cd cbt-school-system
```

3. Run the app
```
yarn dev
```

4. Access the application

Frontend → http://localhost:3000
Backend API → http://localhost:5050

---

## 👨‍💻 Author

Developed by Arel
- 💼 Role: Fullstack Web Developer
- 📧 Contact: [arelarel576@gmail.com]
- 🌐 Portfolio: [arelsmith.my.id]
