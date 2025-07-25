const express = require("express");
const router = express.Router();
const { Jobs } = require("../models");

router.get("/", async (req, res) => {
  try {
    const jobs = await Jobs.findAll();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
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

module.exports = router;
