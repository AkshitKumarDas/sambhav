const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", require("./routes/userRoutes"));
app.use("/auth", require("./routes/authRoutes"));
// Attempt to load optional DB config; continue if not present
try {
  require("./config/db");
} catch (err) {
  console.warn("Optional DB config not found, continuing without DB.");
}

app.get("/test", (req, res) => {
  res.json({ message: "Backend running" });
});

module.exports = app;
