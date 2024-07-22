const express = require('express');

const {
  getAllData,
  getAllDepartments,
  getAllHardSkills,
  getAllSoftSkills,
  getAllSkills,
  getAllTeams,
  getAllPositions,
  getAllLocations,
} = require("../Controllers/dataControllers.js");

const router = express.Router();

router.get(
  `/`,
  getAllData,
  getAllDepartments,
  getAllSkills,
  getAllHardSkills,
  getAllSoftSkills,
  getAllSkills,
  getAllTeams,
  getAllPositions,
  getAllLocations
);

module.exports = router;
