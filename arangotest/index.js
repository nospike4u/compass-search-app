// const { Database, aql } = require("arangojs");

// // establish database connection
// const db = new Database({
//   url: "https://f6c2dcc15203.arangodb.cloud:8529/",
//   databaseName: "Compass Search Deployment (test)",
//   auth: { username: "github|9579649", password: "Gfp1HGvbCrn1MY60Adqi" },
// });

// async function checkConnection() {
//     try {
//       const collection = db.collection("Test");
//       const result = await collection.all();
//       console.log("Connection successful! Result:", result);
//     } catch (error) {
//       console.error("Error connecting to the database:", error);
//     }
//   }
  
//   checkConnection();

// module.exports = { checkConnection };

"use strict";
const encodedCA = "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURHRENDQWdDZ0F3SUJBZ0lRU3NMZGFqMkkvZW1YRXVtZW1uOEsxVEFOQmdrcWhraUc5dzBCQVFzRkFEQW0KTVJFd0R3WURWUVFLRXdoQmNtRnVaMjlFUWpFUk1BOEdBMVVFQXhNSVFYSmhibWR2UkVJd0hoY05NalF3TnpJMApNRFF5TURRMVdoY05Namt3TnpJek1EUXlNRFExV2pBbU1SRXdEd1lEVlFRS0V3aEJjbUZ1WjI5RVFqRVJNQThHCkExVUVBeE1JUVhKaGJtZHZSRUl3Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLQW9JQkFRQzgKU1Y4ZGI1cDZOSERzL2VhM0ZkSHZuMGxDRjhWVG40b3FLOS96NllCanNVYjN1V3RVYlF0enVKRGwxZHVjVFpTTAplczNOSzd5OElvdDZNaFM0TWtNckliWUdtQkxwcjl5RVpSdlhmb0RHM1c1QXJxbk85bDFFeXVUVEN6OXJzZmFqCkl6V0E1ekJBL2kycjhUSFVLdEp5T3NHTXQvaTRNd2ZBNDlOZTdoMk5rd3ViNEJiS3BUZ21XZ01kZWJvdURtVFIKOUVHL3hwZHd0ZW5sVFFJUWxldllOcExPU2RBVFFwYjFmT2I3akZVczdtQ0RRL29wZ2lMelQrRnRGaXJEdTFaSgpDdE9lR2wxaFcyQWQwanBndjJ4RXhLcUpSUDZLU1hzcllkYnJQbDBTNTFka0VTdjJ1Snd5bC9YWXhXVXQ4bHY2CjhzQXZWS3M5RFM5UVExR0V0OHlCQWdNQkFBR2pRakJBTUE0R0ExVWREd0VCL3dRRUF3SUNwREFQQmdOVkhSTUIKQWY4RUJUQURBUUgvTUIwR0ExVWREZ1FXQkJSeWttMWJCOFdGOU5pZzVkWjRPZkNlMFJoZHVUQU5CZ2txaGtpRwo5dzBCQVFzRkFBT0NBUUVBUUdBcXhNV0lUU0ZWSFgyVW4wRVFyM0lKaEYzVDlwS0JpSU5XOURZbkttS0wxSEYwCnJDVDBzWU5mYVluTno2MXN4Z0s0SWV1TlhWbStYQU1CaXNqMGVib0duQld5dE44VXVTUG5PUjNLM3lvTnlxelcKZFh0RFF6ZlplSkNsbC9vbWFacU5kaWdSaGF0dzdjbEJDVDN4WlFyM283Zm8vcWlqMFNyYy9jL2hJL0plRGU1MQpBMndsa3pRQjd3bzY0OENmWExDcXJBaUtmdU9vQ05aNHBDOFF6MzFQTzZCdHhJcnR1T3c0QUtBdlhIMksvUis5CmhQemozbTN1SEtoMEJEcWlOdDdpUzZjajdBSUd0UFkzODk1d1JreENmSUxBZmdDdlRWeCsreld3eFB5WjROaUMKaGZPbGxhZTRzNFU2clBpcnA3Q3VSb0F5QUJobFZPbUlZQW5Ud0E9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==";
const arangojs = require("arangojs");
const db = arangojs({url: "https://f6c2dcc15203.arangodb.cloud:18529", agentOptions: {ca: Buffer.from(encodedCA, "base64")}});
db.useBasicAuth("root", "Gfp1HGvbCrn1MY60Adqi");
console.log("Connected to ArangoDB");
// Note that ArangoGraph Insights Platform runs deployments in a cluster configuration.
// To achieve the best possible availability, your client application has to handle
// connection failures by retrying operations if needed.
db.version().then(
	version => console.log(version),
	error => console.error(error, "Failed to connect to ArangoDB")
);