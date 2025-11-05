const db = require("../utils/db");

const getExams = async (req, res) => {
  try {
    const [exams] = await db.execute(
      "SELECT * FROM exams ORDER BY scheduled_at DESC"
    );
    res.status(200).json({ exams });
  } catch (err) {
    console.error("Error fetching exams: ", err.message);
    res.status(500).json({ error: "Failed to fetch exams!" });
  }
};

const getExamById = async (req, res) => {
  const examId = req.params.id;

  if (!/^\d+$/.test(examId)) {
    return res.status(400).json({ error: "Invalid exam ID" });
  }
  try {
    const [exams] = await db.execute("SELECT * FROM exams WHERE id = ?", [
      examId,
    ]);

    if (exams.length === 0) {
      return res.status(404).json({ error: "Exam not found!" });
    }

    res.json({ exam: exams[0] });
  } catch (err) {
    console.error("Error fetching exam by ID: ", err.message);
    res.status(500).json({ error: "Failed to fetch exam!" });
  }
};

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

const updateExam = async (req, res) => {
  const examId = req.params.id;
  if (!/^\d+$/.test(examId)) {
    return res.status(400).json({ error: "Invalid exam ID" });
  }

  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({
      error: "You need to provide the exam data to update!",
    });
  }

  const {
    title,
    subject = null,
    duration_min,
    total_questions,
    scheduled_at,
    instructions = null,
    is_active,
  } = req.body;

  console.log(req.body);

  if (
    !title ||
    !duration_min ||
    !total_questions ||
    !scheduled_at ||
    typeof is_active !== "boolean"
  ) {
    return res.status(400).json({
      error: "Missing required fields to update the exam!",
    });
  }

  try {
    const [existingExams] = await db.execute(
      "SELECT * FROM exams WHERE id = ?",
      [examId]
    );
    if (existingExams.length === 0) {
      return res.status(404).json({ error: "Exam not found!" });
    }

    const fields = [];
    const values = [];

    if (title !== undefined) {
      fields.push("title = ?");
      values.push(title);
    }
    if (subject !== undefined) {
      fields.push("subject = ?");
      values.push(subject);
    }
    if (duration_min !== undefined) {
      fields.push("duration_min = ?");
      values.push(parseInt(duration_min, 10));
    }
    if (total_questions !== undefined) {
      fields.push("total_questions = ?");
      values.push(parseInt(total_questions, 10));
    }
    if (scheduled_at !== undefined) {
      fields.push("scheduled_at = ?");
      values.push(new Date(scheduled_at));
    }
    if (instructions !== undefined) {
      fields.push("instructions = ?");
      values.push(instructions);
    }
    if (is_active !== undefined) {
      fields.push("is_active = ?");
      values.push(is_active ? 1 : 0);
    }

    if (fields.length === 0) {
      return res
        .status(400)
        .json({ error: "No valid fields provided for update!" });
    }

    values.push(examId);

    await db.execute(`UPDATE exams SET ${fields.join(", ")} WHERE id = ?`, [
      ...values,
      examId,
    ]);
    res.status(200).json({ message: "Exam updated successfully" });
  } catch (err) {
    console.error("Error updating exam: ", err.message);
    res.status(500).json({ error: "Failed to update exam!" });
  }
};

const deleteExam = async (req, res) => {
  const examId = req.params.id;

  if (!/^\d+$/.test(examId)) {
    return res.status(400).json({ error: "Invalid exam ID" });
  }

  try {
    const [result] = await db.execute("DELETE FROM exams WHERE id = ?", [
      examId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Exam not found!" });
    }

    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (err) {
    console.error("Error deleting exam: ", err.message);
    res.status(500).json({ error: "Failed to delete exam!" });
  }
};

module.exports = { getExams, getExamById, createExam, updateExam, deleteExam };
