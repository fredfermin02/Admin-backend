const {response} = require('express')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')
const { googleVerify } = require('../helpers/google-veryify')
const User = require('../models/user')


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

const googleSignIn = async(req, res = response) =>{
   try {
    const {email, name, picture} = await googleVerify(req.body.token)

    const userDB = await User.findOne({email})
    let user;

    if (!userDB) {
        user = new User({
            name: name,
            email: email,
            password: '@@@',
            img: picture,
            google: true
        })
    }else{
        user = userDB;
        user.google = true;
    }
    //Sve token in database
    await user.save();

    //Generate token -JWT
    const token = await generateJWT(user.id);

    res.json({
        ok:true,
        email, name, picture,
        token  
    })

   } catch (error) {
    console.log(error)
    res.status(500).json({
        ok:false,
        msg: "Google token is not correct"
    })
   }
   
   
    
}



module.exports = {
    login,
    googleSignIn
}