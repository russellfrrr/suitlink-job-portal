import express from 'express';
import morgan from 'morgan';

import db from './database/db.js';


const app = express();

app.use(express.json());
app.use(morgan('dev'));

db();

app.get('/', (req, res) => {
  res.send('Welcome to SuitLink API!')
})

export default app;