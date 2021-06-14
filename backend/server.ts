require('dotenv').config();
// --- import npm
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connect } from './db';
import { auth } from './app/middlewares/auth';

// --- import
import loginRouter from './app/routers/login.router';
import pangolinRouter from './app/routers/pangolins.router';
import signupRouter from './app/routers/signup.router';
import profileRouter from './app/routers/profile.router';

// --- server
const app = express();
const HOSTNAME: string = process.env.SERVER_HOST || 'http://localhost';
const PORT: string | number = process.env.PORT || 3333;

// --- middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());

// --- routes
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);
app.use('/api/pangolins', pangolinRouter);
app.use('/api/profile', auth, profileRouter);

// --- DB connection + starting server
export async function start() {
  try {
    await connect();
    app.listen(PORT, () => console.log(`Server listening on: ${HOSTNAME}:${PORT}`));
  } catch (err) {
    console.error(err);
  }
}
