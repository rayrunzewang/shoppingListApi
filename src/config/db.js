const mongoose = require("mongoose");
const winston = require('winston');

mongoose.connect(process.env.DB_CONNECTION_SHOPPLIST_URL);
const db = mongoose.connection;

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'mongodb-error.log', level: 'error' })
  ]
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  // 这里可以添加处理连接错误的逻辑，例如终止应用程序或记录错误信息
  logger.error(`MongoDB connection error: ${err.message}`); //这是一个日志
});

module.exports = db;
