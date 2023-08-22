const express = require('express');
const routes = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user')
const jwt = require("jsonwebtoken")


require('dotenv').config()

routes.post("/registro" , async(req, res) => {

    const {email, name, photo, phone, bio} = req.body
    const selecionarUsuario = await User.findOne({email});

    if(selecionarUsuario){
        return res.status(400).json({message: "Email já existente"})
    }

    const novoUsuario = new User({
        name,
        password: bcrypt.hashSync(req.body.password),
        email,
        photo,
        phone,
        bio,
    })

    try{
        const usuarioSalvo = await novoUsuario.save()

        const data = {
            id: novoUsuario.id,
            name: novoUsuario.name,
            email: novoUsuario.email,
            bio: novoUsuario.bio,
            phone: novoUsuario.phone,
            photo: novoUsuario.photo,
        }
        const token = jwt.sign(data, process.env.SECRET_JWT)

        res.header("Authorization", token).json({message: "Usuario salvo: ", usuarioSalvo})

    }catch(e){
        return res.status(400).json({message: e.message})
    }
})


routes.post("/login", async (req,res) => {

    const {email, password} = req.body
    const selecionarUsuario = await User.findOne({email});


    if(!selecionarUsuario){
        return res.status(400).json({message: "Email invalida!"})
    }

    const compareSenhas = bcrypt.compareSync( password , selecionarUsuario.password )

    if(!compareSenhas){
        return res.status(400).json({message: "senha invalida!"})
    }
    const data = {
        id: selecionarUsuario.id,
        name: selecionarUsuario.name,
        email: selecionarUsuario.email,
        bio: selecionarUsuario.bio,
        phone: selecionarUsuario.phone,
        photo: selecionarUsuario.photo,
    }
    const token = jwt.sign(data, process.env.SECRET_JWT)

    res.header( "Authorization", token).json({message: "Usuario logado com sucesso!"})

})


module.exports = routes