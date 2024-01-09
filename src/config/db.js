const mongoose = require("mongoose");
const winston = require('winston');


const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'mongodb-error.log', level: 'error' })
  ]
});

const connectDB = async () => {
 try{
  await mongoose.connect(process.env.DB_CONNECTION_SHOPPLIST_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });// 这里其实最好是一个异步操作
  console.log("已成功连接到数据库");
 } catch {
  console.error("Error connecting to db:", error)
 }
}

module.exports = connectDB;
