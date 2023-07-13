const fs = require("fs");
const { format } = require("date-fns");
const fsPromises = require("fs").promises;

const path = require('path');
const uuid = require("uuid");

const logEvents = async (message,logFileName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const id = uuid.v4();
  const logItem = `${dateTime}\t${id}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))){
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
  } catch (e) {
    console.log(e);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
  console.log(`${req.method} ${req.path}`);
  next()
 };

module.exports = logger;