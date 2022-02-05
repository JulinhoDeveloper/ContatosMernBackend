const mongoose = require("mongoose");
const Joi = require("Joi");

const ContatoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "O nome é obrigatório"],
    },
    adress: {
        type: String,
        required: [true, "O endereço é obrigatório"],
    },
    email: {
        type: String,
        unique:true,
        required: [true, "O email é obrigatório"],
    },
    phone: {
        type: Number,
        required: [true, "O telefone é obrigatório"],
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Contato = new mongoose.model("Contato", ContatoSchema);

const validarContato = (data) =>{
    const schema = Joi.object({
        name: Joi.string().min(4).max(50).required(),
        adress: Joi.string().min(4).max(100).required(),
       email:  Joi.string().email().required(),
       phone: Joi.number().min(7).max(10000000000).required(),
    });
};

module.exports = {
    validarContato,
    Contato,
  }