//General imports
const cors = require('cors');
const dotenv= require('dotenv');
const express = require( "express");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const {generateToken, verifyToken } = require('./utils/auth.js');

//Routers imports
const loginRoutes = require ('./Routes/loginRoutes.js');
const usersRoutes = require('./Routes/usersRoutes.js');

const password = "!8%3@2KCta9Z4f_p5I";
const salt =  bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);

console.log(hashedPassword);
 
const PORT = 8000;
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors({origin:"*"}));

app.get(`/`, (req, res) => {
  res.send("Server is running");
});

app.use(`/api/v1/`, loginRoutes);
app.use(`/api/v1/users/`, usersRoutes);

app.get(`/*`, (req, res, next) => {
  const err = new Error(`Invalid path`);
  err.status = 404;
  next(err);
});

// //Error Handler middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({error: err.message,
// stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
//   }); 
// });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

