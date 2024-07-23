//General imports
const cors = require('cors');
const dotenv= require('dotenv');
const express = require( "express");
const { driver }  = require(`./db/neo4jDB.js`);

//Routers imports
const dataRoutes = require('./Routes/dataRoutes.js');
const loginRoutes = require ('./Routes/loginRoutes.js');

const PORT = 8000;
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors({origin:"*"}));

//Middleware stuff that I may get back to later
// app.use((req, res, next) => {
//   console.log(req.originalUrl);
//   next();
// })

app.get(`/`, (req, res) => {
  res.send("Server is running");
});

app.use(`/api/v1/data`, dataRoutes);
app.use(`/api/v1/person`, loginRoutes);

app.get(`/*`, (req, res, next) => {
  const err = new Error(`Route does not exist`);
  // res.status(404).send(`Route does not exist`);
  err.status = 404;
  next(err);
});

//Error Handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({error: err.message,
stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  }); 
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Close the Neo4j driver when the process exits
process.on('exit', () => {
  driver.close();
});

