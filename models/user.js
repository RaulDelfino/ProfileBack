const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    bio : String,
    phone: {type: Number, min: 8},
    photo: {type: String}
})

module.exports = mongoose.model("User", schema)