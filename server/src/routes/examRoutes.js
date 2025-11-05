const express = require("express");
const { createExam } = require("../controllers/examController");

const router = express.Router();

router.post("/", createExam);

module.exports = router;
