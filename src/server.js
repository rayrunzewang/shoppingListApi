require('dotenv').config();
const express = require('express');
const winston = require('winston');
const { createLogger, transports } = winston;

const logger = createLogger({
  transports: [
    new transports.File({ filename: 'server-internal-error.log', level: 'error' })
  ]
});

const app = express();
const port = 3001; 
app.use(express.json());

const db = require('./config/db');
const routes = require('./routes');

db.once('open', () => {
  console.log('Connected to MongoDB');
  // 在这里执行其他数据库操作
});

app.use(routes);

app.use((err, req, res, next) => {
  logger.error(`错误：${err.message}`);
  res.status(500).send('内部服务器错误');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
