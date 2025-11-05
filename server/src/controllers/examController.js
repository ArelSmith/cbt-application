const db = require("../utils/db");

const createExam = async (req, res) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({
      error: "You need to provide the exam data!",
    });
  }
  const requiredFields = [
    "title",
    "duration_min",
    "total_questions",
    "scheduled_at",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const sanitizedInput = {
    title: req.body.title,
    subject: req.body.subject || null,
    duration_min: parseInt(req.body.duration_min, 10),
    total_questions: parseInt(req.body.total_questions, 10),
    scheduled_at: new Date(req.body.scheduled_at),
    instructions: req.body.instructions || null,
  };

  try {
    // Dont forget to change this on req.user.id
    const createdBy = 1;
    const [result] = await db.execute(
      `INSERT INTO exams (title, subject, duration_min, total_questions, scheduled_at, instructions, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        sanitizedInput.title,
        sanitizedInput.subject,
        sanitizedInput.duration_min,
        sanitizedInput.total_questions,
        sanitizedInput.scheduled_at,
        sanitizedInput.instructions,
        createdBy,
      ]
    );

    res.status(201).json({
      message: "Exam created successfully",
      examId: result.insertId,
    });
  } catch (err) {
    console.error("Exam creation error: ", err);
    res.status(500).json({ error: "Failed to create exam!" });
  }
};

module.exports = { createExam };
