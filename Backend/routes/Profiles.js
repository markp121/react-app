const express = require("express");
const router = express.Router();
const { Profiles, Bots } = require("../models");

router.get("/", async (req, res) => {
  try {
    const profiles = await Profiles.findAll();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const { name, jobTitle, bio, skills, image } = req.body;
  try {
    const newProfile = await Profiles.create({
      name,
      jobTitle,
      bio,
      skills,
      image,
    });
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const profileId = req.params.id;
  try {
    const deleteProfile = await Profiles.destroy({
      where: {
        id: profileId,
      },
    });
    res.status(200).json(deleteProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const profileId = req.params.id;
  const { name, jobTitle, bio, skills, image } = req.body;
  try {
    const updatedProfile = await Profiles.update(
      {
        name,
        jobTitle,
        bio,
        skills,
        image,
      },
      {
        where: {
          id: profileId,
        },
      },
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
