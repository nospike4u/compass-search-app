import express from "express";

import {
  getAll,
  createPerson,
  getOnePerson,
  updatePerson,
  deletePerson,
} from "../../Controllers/LoginControllers/index.js";

const router = express.Router();

router.route(`/`).get(getAll).post(createPerson);

router
  .route(`/:id`)
  .get(getOnePerson)
  .put(updatePerson)
  .delete(deletePerson);

export default router;
