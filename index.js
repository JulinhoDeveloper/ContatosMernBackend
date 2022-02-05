const express = require("express");
require('dotenv').config();
const morgan = require("morgan");
const {connectDB}  = require("./config/db");
// const  auth = require("./middlewares/auth");
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("tiny"));

// Base de dados
connectDB();

//rotas
// app.get("/protegido", auth, (req,res)=>{
//     return res.status(200).json(
//         {  ...req.user._doc });
// });
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/contato"));




PORT =process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`servidor rodando na porta:${PORT}`);
});
