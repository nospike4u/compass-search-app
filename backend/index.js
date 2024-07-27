//General imports
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/mongooseDB.js';

//Routers imports
import loginRoutes from './Routes/loginRoutes.js';
import usersRoutes from './Routes/usersRoutes.js';

const PORT = 8000;
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors({origin:"*"}));

connectDB();

app.get(`/`, (req, res) => {
  res.send("Server is running");
});

app.use(`/api/v1`, loginRoutes);
app.use(`/api/v1/users/`, usersRoutes);

app.get(`/*`, (req, res, next) => {
  const err = new Error(`Route does not exist`);

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

