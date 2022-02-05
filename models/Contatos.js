const mongoose = require("mongoose");

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

module.exports = Contato;