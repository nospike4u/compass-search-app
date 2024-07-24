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
  getOnePerson
} = require("../Controllers/dataControllers.js");

const router = express.Router();

router.route(`/`).get(getAllData)
    // ,
    // getAllDepartments,
    // getAllSkills,
    // getAllHardSkills,
    // getAllSoftSkills,
    // getAllSkills,
    // getAllTeams,
    // getAllPositions,
    // getAllLocations);

 router.route(`/:id`).get(getOnePerson);   

module.exports = router;
