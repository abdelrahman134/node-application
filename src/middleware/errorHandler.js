const fs =require('fs')
function errorHandler(err, req, res, next) {
 
  logEvents(`${err.name} : ${err.message} ${req.method}\t${req.url}\t${req.headers.origin}`, "errLog.log");

  res.status(500).json({ error: "Internal Server Error" });
}
module.exports=errorHandler