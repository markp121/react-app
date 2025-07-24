import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "course_app",
});

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.json("Hello, this is the backend");
});

app.get("/jobs", (req, res) => {
  const q = "SELECT * FROM jobs";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/bots", (req, res) => {
  const q = "SELECT * FROM bots";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/jobs", (req, res) => {
  const q = "INSERT INTO jobs(`name`, `description`, `requiredBots`, `status`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.description,
    req.body.requiredBots,
    req.body.status,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json("Job has been created successfully");
  })
})

app.post("/bots", (req, res) => {
  const q = "INSERT INTO bots(`name`, `task`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.task,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json("Bot has been created successfully");
  })
})

app.delete("/jobs/:id", (req, res) => {
  const jobId = req.params.id;
  const q =  "DELETE FROM jobs WHERE id = ?";

  db.query(q, [jobId], (err, data) => {
    if (err) return res.json(err);
    return res.json("job deleted successfully");
  })
})

app.delete("/bots/:id", (req, res) => {
  const botId = req.params.id;
  const q =  "DELETE FROM bots WHERE id = ?";

  db.query(q, [botId], (err, data) => {
    if (err) return res.json(err);
    return res.json("bot deleted successfully");
  })
})

app.put("/jobs/:id", (req, res) => {
  const jobId = req.params.id;
  const q = "UPDATE jobs SET `name` = ?, `description` = ?, `requiredBots` = ?, `status` = ? WHERE id = ?";

  const values = [
    req.body.name,
    req.body.description,
    req.body.requiredBots,
    req.body.status,
  ];

  db.query(q, [...values, jobId], (err, data) => {
    if (err) return res.send(err);
    return res.json("Job has been updated successfully");
  })
})

app.put("/bots/:id", (req, res) => {
  const botId = req.params.id;
  const q = "UPDATE bots SET `name` = ?, `task` = ? WHERE id = ?";

  const values = [
    req.body.name,
    req.body.task,
  ];

  db.query(q, [...values, botId], (err, data) => {
    if (err) return res.send(err);
    return res.json("Bot has been updated successfully");
  })
})

app.listen(8800, () => {
  console.log("listening to port 8800");
});
