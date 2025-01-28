const express = require('express');

const app = express();

app.use((rea,res , next) => {
    console.log("Hi i'am here!!");
    next();
});

app.use((req, res , next ) =>{
    res.status(201);
    next();
});

app.use((req,res,next)=>{
    res.json({message:"Hello World!" ,num : "1234"});

})

module.exports=app;