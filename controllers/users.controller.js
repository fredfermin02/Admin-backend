const {response} = require('express')
const bcryptjs = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')
const User = require('../models/user');



const getUsers = async(req, res) => {
    const users = await User.find({},'name email role google')
    
    res.status(200).json({
        ok:true,
        users
    })
};


const createUser = async(req, res = response) => {
    const {email, password} = req.body;

    

    try {
        const existEmail = await User.findOne({email})

        if (existEmail) {
            return res.status(400).json({
                ok:false,
                msg:'Email is already in use'
            });
        }

        const user = new User(req.body);
        
        //Encrypt password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        //Save user in database
        await user.save()
        
        // Generate JWT
        const token = await generateJWT(user.id);
        
        res.json({
            ok:true,
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Error please check logs'
        })
    }
};

const updateUser = async (req, res= response) => {
    const uid = req.params.id;

    try {
        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no user with this ID'
            })
        }
        
        const {password,google,email,...fields} = req.body;


        //Validation to change email
        //If email is the same and is not changed delete email from object
        if (userDB.email != email) {
            const existEmail =  await User.findOne({email});
            if(existEmail){
                res.status(400).json({
                    ok:false,
                    msg:'There is already a user with that email'
                })
            }
        }

        fields.email = email;
        const updatedUser = await User.findByIdAndUpdate(uid, fields, {new: true})

        res.json({
            ok: true,
            user: updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error trying to update user'
        })
    }
}

    const deleteUser = async(req,res = response) =>{
        
        const uid = req.params.id;

        try {
            const userDB = await User.findById(uid);

            if (!userDB) {
                return res.status(404).json({
                    ok: false,
                    msg: 'There is no user with this ID'
                })
            }

            await User.findByIdAndDelete(uid)

            res.status(200).json({
                ok:true,
                msg: "User deleted succesfully"
            });

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok:false,
                msg:"Unexpected error when deletiing user. Please speak with administartor."
            })
        }

        

    }

module.exports = { 
    getUsers,
    createUser,
    updateUser,
    deleteUser
}