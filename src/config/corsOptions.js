const express =require('express')
const app =express()
const allowedOrigins =['http:/example1.com',"http:/expample2.com"]
const corsOptions={
origin:(origin,callback)=>{
    if(allowedOrigins.includes(origin)){
        callback(null,true);
    }else{
        callback(new Error ("Not allowed by CORS"))
    }
}
}
module.export=corsOptions