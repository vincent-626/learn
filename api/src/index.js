require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const learnersRoutes = require("./routes/learnersRoutes");
const tutorsRoutes = require("./routes/tutorsRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/api/users", userRoutes);
app.use("/api/learners", learnersRoutes);
app.use("/api/tutors", tutorsRoutes);
app.use("/api/search", searchRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server listening on port 3000");
});
