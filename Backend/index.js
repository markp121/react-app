const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

app.get("/", (req, res) => {
  res.json("Hello, this is the backend");
});

// Routers
const jobsRouter = require("./routes/Jobs");
app.use("/jobs", jobsRouter);
const botsRouter = require("./routes/Bots");
app.use("/bots", botsRouter);
const profilesRouter = require("./routes/Profiles");
app.use("/profiles", profilesRouter);

db.sequelize.sync().then(() => {
  app.listen(8800, () => {
    console.log("Server running on port 8800");
  });
});
