//General imports
const cors = require('cors');
const dotenv= require('dotenv');
const express = require( "express");
const { driver }  = require(`./db/neo4jDB.js`);
const { auth1, auth2 } = require('./Middleware/auth.js');
const expressSession = require('express-session');

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

app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false, //needs to be set to true if working with cookies.
  saveUninitialized: true,
  cookie: { secure: false } //Set to true if using HTTPS on production.
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
})

//Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if(req.session.user) {
    next();
  } else {
    res.status(401).json({message: "Unauthorized"});
  }
};  

//Login middleware
app.post(`/api/v1/login`, async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({message: 'Invalid credentials'})
  }

});

app.get(`/`, (req, res) => {
  res.send("Server is running");
});

app.use(`/api/v1/data`, dataRoutes);
// app.use(`/api/v1/data/:id`, dataRoutes);
app.use(`/api/v1/person`, auth1, loginRoutes);
app.use(`/api/v1/:token`, auth2, loginRoutes);
// app.use(`/api/v1/person/:id`, loginRoutes);

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

