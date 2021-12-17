const express = require("express");
const app = express();
require('dotenv').config();

const connection = require('./db/connection.js');

app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));

app.use(express.json());

const cors = require('cors');

app.use(cors({
    origin: ['https://wmdd4936-dleung46.herokuapp.com']
}));

const router = require('./routes/index.js');

app.use('/api/v1/', router);

connection.once('open', ()=>{
    const server = app.listen(process.env.PORT, ()=>{
    console.log("Connected and listening");
    });
});