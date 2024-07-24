import neo4j from "neo4j-driver";
// import neo4j from 'lib/browser/neo4j-web.esm.min.js'
import dotenv from "dotenv";

dotenv.config();

const username = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_PASSWORD;
const uri = process.env.NEO4J_URI;

console.log(username, password, uri);

// const connectDB = (async () => {
//   let driver;
//   try {
//       driver = neo4j.driver(uri, neo4j.auth.basic(username, password),);
//       const serverInfo = await driver.verifyConnectivity();
//       console.log('Database Connection established');
//       console.log(serverInfo);
//   } catch (err) {
//       console.log(`Database Connection error\n${err}\nCause: ${err.cause}`);
//   } finally {
//       await driver.close();
//   }
// })();

// export default connectDB ;

let driver;
driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

let session = driver.session({
  database: "neo4j",
});

driver.close();

export default connectDB;
