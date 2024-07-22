const {Router} = require('express');
const {getAllData} = require('../Controllers/dataControllers.js');

const router = Router()

router.get(`/`,getAllData)

module.exports= router

