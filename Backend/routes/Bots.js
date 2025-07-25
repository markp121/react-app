const express = require("express");
const router = express.Router();
const { Bots } = require("../models");

router.get("/", async (req, res) => {
  try {
    const bots = await Bots.findAll();
    res.json(bots);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

module.exports = router;