//General imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config();

// const username = process.env.NEO4J_USERNAME;
// const password = process.env.NEO4J_PASSWORD;
// const uri = process.env.NEO4J_URI;

// console.log(username, password, uri);

const PORT = 8000;

//Routers imports

const app = express();

app.use(cors({origin:"*"}));
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get(`/*`, (req, res) => {
  res.status(404).send(`Route does not exist`);
});

app.listen(PORT, () => {`Server is running on port ${PORT}`});

// import express from 'express';
// import neo4j from 'neo4j-driver';
// const app = express();

// const port = 3000;

// import dotenv from "dotenv";
// dotenv.config();

// const username = process.env.NEO4J_USERNAME;
// const password = process.env.NEO4J_PASSWORD;
// const uri = process.env.NEO4J_URI;

// // Neo4j driver setup
// const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));
// const session = driver.session();

// // Example route to get data from Neo4j
// app.get('/data', async (req, res) => {
//     try {
//         const result = await session.run('MATCH (n) RETURN n LIMIT 10');
//         const records = result.records.map(record => record.get('n').properties);
//         res.json(records);
//     } catch (error) {
//         console.error('Error retrieving data from Neo4j', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
// // Close the Neo4j driver when the process exits
// process.on('exit', () => {
//     driver.close();
// });