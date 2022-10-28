const mongoose = require('mongoose')
require('dotenv').config

mongoose
    .connect(process.env.DB_URL,
        {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
    .then(()=>{
        console.log('connected to mongodb 😎')
    })
    .catch((err)=>{
        console.log("can't connect to data base  "+err)
    })
