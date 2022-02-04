const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "O nome é obrigatório"],
    },
    email: {
        type: String,
        required: [true, "O email é obrigatório"],
    },
    password: {
        type: String,
        required: [true, "A senha é obrigatório"],
    },
});

const User = new mongoose.model("Usermerncontato", UserSchema);

module.exports = User;