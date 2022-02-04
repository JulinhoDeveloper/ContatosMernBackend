const express = require("express");
require('dotenv').config();
const morgan = require("morgan");
const {connectDB}  = require("./config/db");


const app = express();



//middlewares
app.use(express.json());
app.use(morgan("tiny"));

// Base de dados
connectDB();







PORT =process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`servidor rodando na porta:${PORT}`);
});
