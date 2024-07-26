
const { Router } = require('express');
const express= require('express');

const {
  login, 
  register,
  logout,
} = require ('../Controllers/loginControllers.js');

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

module.exports = router;
