const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


router.post("/register", async (req,res)=>{
    const {name, email, password} = req.body;
// verificar se todos os campos estão preenchidos
if(!name  || !email  || !password)
return res.status(400).json(
    {error: "Preencha todos os campos"});

// validar o nome
if(name.lenght > 25)
return res.status(400).json({
    error: "O nome tem que ter até 25 caracteres"});

//validar email
const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

if(!emailReg.test(email))
return res.status(400).json(
    {error: "Por favor digite um email válido"});

//validar a senha
if(password.lenght < 6)
return res.status(400).json({
    error: "Senha tem que ser acima de 6 caracteres"});

try {
// verificando se o email existe
    const userExists = await User.findOne({ email });

    if(userExists)
return res.status(400).json({
    error: `Utilize outro email [${userExists.email}] pois esse já está cadastrado` 
});
//criptografia da senha
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });

    //salvndo o usuario
    const result = await newUser.save();
    return res.status(201).json({
        ...result._doc
       });
    

} catch (err) {
    console.log(err);
    return res.status(500).json(
        {error: err.message});
}
});

router.post("/login", async (req,res)=>{
    const {email, password} = req.body;

    // verificar se todos os campos estão preenchidos
if( !email  || !password)
return res.status(400).json(
    {error: "Preencha todos os campos"});

    //validar email
const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

if(!emailReg.test(email))
return res.status(400).json(
    {error: "Por favor digite um email válido"});


try {
    const usernoExists = await User.findOne({ email });

    if(!usernoExists)
return res.status(400).json({
    error: "Email ou senha inválidos" 
});

const doesPasswordMatch = await bcrypt.compare(
    password,
    usernoExists.password
);
if(!doesPasswordMatch)
return res.status(400).json({
    error: " senha inválida" 
});

const payload = { _id: usernoExists._id };
const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
});
return res.status(200).json({ token });
} catch (err) {
    console.log(err);
    return res.status(500).json(
        {error: err.message});
}
});
module.exports = router;