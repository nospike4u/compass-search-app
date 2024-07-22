const dotenv= require("dotenv");
dotenv.config();

const username = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_PASSWORD;
const uri = process.env.NEO4J_URI;

const neo4j = require('neo4j-driver-lite');
const driver = neo4j.driver(uri, neo4j.auth.basic(username,password));
const session = driver.session();

module.exports= {driver,session}