const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const root = require('./routes/root.js')
const path = require("path")
const logEvents = require('./middleware/logger.js')
const errorHandler =require('./middleware/errorHandler.js')
const user =require("./routes/user.js")
const auth=require("./routes/auth.js")
const app =express()
const port =5000
const corsOptions=require('./config/corsOptions.js')
dotenv.config()

app.use(logEvents)
app.use(cookieParser())
app.use(express.json());

app.use(cors(corsOptions))
mongoose.connect("mongodb://127.0.0.1:27017/node-1");
app.use('/',express.static(path.join(__dirname,'public')))
app.use('/',root)
app.use(auth)
app.use(user)
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});
app.all("*",(req,res)=>{
res.status(404)
if(req.accepts('html')){
  res.sendFile(path.join(__dirname,"views","404.html"))
}
else if (req.accepts("json")){
  res.send({message:"404 page is not found"})
}
else{
  res.type('text').send('404 page is not found')
}
 })

 app.use(errorHandler)

    app.listen(port, () => {
      console.log("All Done Successfully");
    });
  