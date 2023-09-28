const {response} = require('express')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')

const login = async(req, res = response) =>{
    const {email,password,...fields}= req.body
    const User = require('../models/user')

    try {
        //Verify Email
        const userDB = await User.findOne({email});
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Invalid user or E-mail'
            });
        }

        //verify password
        const validPassword = bcrypt.compareSync(password, userDB.password)
        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Invalid user or E-mail'
            });
        }

        const token = await generateJWT(userDB.id);


        res.json({
            ok:true,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: "Invalid request please contact admin. Login"
        })
    }
}

module.exports = {
    login
}