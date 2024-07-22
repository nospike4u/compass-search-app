const express= require('express');

const {
  getAll,
  createPerson,
  getOnePerson,
  updatePerson,
  deletePerson,
} = require ('../Controllers/loginControllers.js');

const router = express.Router();

router.route(`/`).get(getAll).post(createPerson);

router
  .route(`/:id`)
  .get(getOnePerson)
  .put(updatePerson)
  .delete(deletePerson);

module.exports = router;
