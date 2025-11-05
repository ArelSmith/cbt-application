const express = require("express");
const {
  getExams,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
} = require("../controllers/examController");

const router = express.Router();

router.get("/", getExams);
router.get("/:id", getExamById);
router.post("/", createExam);
router.put("/:id", updateExam);
router.delete("/:id", deleteExam);

module.exports = router;
