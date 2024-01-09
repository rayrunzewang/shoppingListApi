require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const { createLogger, transports } = winston;

const logger = createLogger({
  transports: [
    new transports.File({ filename: 'server-internal-error.log', level: 'error' })
  ]
}); // TODO: 了解一下 winston 如何处理不同模块的错误和不同类型和需要输出不同log的错误

const app = express();
const PORT = process.env.PORT || 3001; 
app.use(express.json());

const connectDB = require('./config/db');
const routes = require('./routes/shoppinglist');

connectDB();

app.use(routes);

app.use((err, req, res, next) => {
  logger.error(`错误：${err.message}`);
  res.status(500).send('内部服务器错误');
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  // 在这里执行其他数据库操作
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  // 这里可以添加处理连接错误的逻辑，例如终止应用程序或记录错误信息
  logger.error(`MongoDB connection error: ${err.message}`); //这是一个日志
});


