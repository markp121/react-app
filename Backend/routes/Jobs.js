const express = require("express");
const router = express.Router();
const { Jobs } = require("../models");
const { Bots } = require("../models");
const { JobsBots } = require("../models");

router.get("/", async (req, res) => {
  try {
    const jobs = await Jobs.findAll({
      include: [
        {
          model: Bots,
        },
      ],
    });
    return res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const { name, description, requiredBots, status } = req.body;
  try {
    const newJob = await Jobs.create({
      name,
      description,
      status,
    });
    const newJobId = newJob.id;
    let bots = [];
    for (const botName of requiredBots) {
      const requiredBot = await Bots.findOne({
        where: {
          name: botName,
        },
      });
      bots.push({ BotId: requiredBot.id, JobId: newJobId });
    }
    await JobsBots.bulkCreate(bots);

    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.patch("/:id", async (req, res) => {
  const jobId = req.params.id;
  const { name, description, requiredBots, status } = req.body;
  const job = await Jobs.findByPk(jobId);
  try {
    const updatedJob = await Jobs.update(
      {
        name: name || job.name,
        description: description || job.description,
        status: status || job.status,
      },
      { where: { id: jobId } },
    );
    const bots = await job.getBots();
    job.removeBots(bots);

    let botsList = [];
    for (const botName of requiredBots) {
      const requiredBot = await Bots.findOne({
        where: {
          name: botName,
        },
      });
      botsList.push({ BotId: requiredBot.id, JobId: jobId });
    }
    await JobsBots.bulkCreate(botsList);
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
