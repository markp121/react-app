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

app.listen(8800, () => {
  console.log("listening to port 8800");
});
