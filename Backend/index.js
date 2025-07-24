import express from "express";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";

const app = express();

const sequelize = new Sequelize("course_app", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello, this is the backend");
});

const Jobs = sequelize.define("jobs", {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  requiredBots: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

const Bots = sequelize.define("bots", {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  task: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.TEXT,
    defaultValue: "Stopped",
  },
});

// (async () => {
//   await sequelize.sync({ force: true });
//   console.log("Database Synced")
// })();

app.get("/jobs", async (req, res) => {
  try {
    const jobs = await Jobs.findAll();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/bots", async (req, res) => {
  try {
    const bots = await Bots.findAll();
    res.json(bots);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/jobs", async (req, res) => {
  const { name, description, requiredBots, status } = req.body;
  try {
    const newJob = await Jobs.create({
      name,
      description,
      requiredBots,
      status,
    });
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/bots", async (req, res) => {
  const { name, task, status } = req.body;
  try {
    const newBot = await Bots.create({
      name,
      task,
      status,
    });
    res.status(201).json(newBot);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/jobs/:id", async (req, res) => {
  const jobId = req.params.id;
  try {
    const deleteJob = await Jobs.destroy({
      where: {
        id: jobId,
      },
    });
    res.status(200).json(deleteJob);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/bots/:id", async (req, res) => {
  const botId = req.params.id;
  try {
    const deleteBot = await Bots.destroy({
      where: {
        id: botId,
      },
    });
    res.status(200).json(deleteBot);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/jobs/:id", async (req, res) => {
  const jobId = req.params.id;
  const { name, description, requiredBots, status } = req.body;
  try {
    const updatedJob = await Jobs.update(
      {
        name: name,
        description: description,
        requiredBots: requiredBots,
        status: status,
      },
      {
        where: {
          id: jobId,
        },
      },
    );
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/bots/:id", async (req, res) => {
  const botId = req.params.id;
  const { name, task, status } = req.body;
  try {
    const updatedBot = await Bots.update(
      {
        name: name,
        task: task,
        status: status,
      },
      {
        where: {
          id: botId,
        },
      },
    );
    res.status(200).json(updatedBot);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(8800, () => {
  console.log("listening to port 8800");
});
