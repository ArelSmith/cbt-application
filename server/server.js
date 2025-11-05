const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const examRoutes = require("./src/routes/examRoutes");
// Registering all routes
app.use("/api/exams", examRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    message: "CBT Backend is running!",
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found!" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error: ", err);
  res.status(500).json({ error: "Internal server error!" });
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}/`);
});
