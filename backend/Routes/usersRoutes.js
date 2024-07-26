const { Router } = require('express');
const {
  getAllUsers,
  getSingleUser,
  createSingleUser,
  updateSingleUser,
  deleteSingleUser,
} = require('../Controllers/usersControllers.js');
const { isOwnerOrAdmin, isAuthenticated } = require('../Middleware/loginMiddleware.js');

const router = Router();

router.get('/', isAuthenticated, getAllUsers);

router.post('/', createSingleUser);

router.get('/:id', isAuthenticated, getSingleUser);

router.put('/:id', isAuthenticated, updateSingleUser);
router.delete('/:id', deleteSingleUser);

module.exports = router;
