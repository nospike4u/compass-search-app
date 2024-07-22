//General imports
const express= require( "express");
const cors = require("cors");
const dotenv= require("dotenv");
const neo4j = require('neo4j-driver-lite');
const  {driver}  = require(`./db/neo4jDB.js`);

const dataRoutes = require('./Routes/dataRoutes.js');


dotenv.config();

// const uri = process.env.NEO4J_URI;

// console.log(username, password, uri);
const PORT = 8000;
const app = express();

// const driver = neo4j.driver(username, neo4j.auth.basic('neo4j', password));



//Routers imports
// import router from "./Routes/LoginRoutes/index.js";


app.use(cors({origin:"*"}));
app.use(express.json());

// connectDB();

// app.use((req, res, next) => {
//   console.log(req.originalUrl);
//   next();
// })


app.get(`/`, (req, res) => {
  res.send("Server is running");
});




app.use(`/api/v1/data`, dataRoutes);
// app.use(`/api/v1/person`, loginRoutes);




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

