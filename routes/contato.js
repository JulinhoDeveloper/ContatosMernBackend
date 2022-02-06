const router = require("express").Router();
const  {validarContato, Contato} = require("../models/Contatos");
const auth = require("../middlewares/auth");

//criar contato
router.post("/contato", auth, async (req,res)=>{
    const  error  = validarContato(req.body);

    if(error) {
        return res.status(400).json({error: error.details[0].message})
    }
    const { name, adress, email, phone} = req.body;

     try{

        const newContato = new Contato({ 
            name, 
            adress,  
            email, 
            phone, 
            postedBy: req.user._id,
         });
        const result = await newContato.save();
        return res.status(201).json({
            ...result._doc
           });

     } catch (err){
         console.log(err)
     }
});

//ver meus contatos
router.get("/meuscontatos", auth, async (req,res)=>{
 
    try{
        const meusContatos = await Contato.find({ postedBy: req.user._id }).populate("postedBy","-password");

        return res.status(200).json({ contatos :meusContatos})
    } catch (err){
         console.log(err)
     }
});



module.exports = router;