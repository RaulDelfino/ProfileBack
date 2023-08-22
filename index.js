const express = require('express');
const app = express();
const mongoose = require('mongoose')
const routes =  require('./routes/rotas');
const cors = require('cors');
require('dotenv').config()

mongoose.connect(process.env.URL_MONGODB).then(
    console.log("connected to MongoDB")
).catch(err => console.log(err))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Expose-Headers', 'Authorization');
    next();
});

app.use("/", cors() ,express.json() , routes)

app.listen(process.env.PORT, () => console.log("Servidor rodando"));