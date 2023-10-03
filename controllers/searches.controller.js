const {response} = require('express');
const User = require('../models/user');
const Medic = require('../models/medic');
const Hospital = require('../models/hospital');

const getAll = async (req, res= response) => {
    const search = req.params.search;
    const regex = new RegExp(search, 'i');


    const [users, medics, hospitals] = await Promise.all([
        User.find({name: regex}),
        Medic.find({name: regex}),
        Hospital.find({name:regex})
    ])

    try {

        res.json({
            ok: true,
            users,
            medics,
            hospitals
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}

const getDocumentCollection = async (req, res= response) => {
    const term = req.params.search;
    const table = req.params.table;
    const regex = new RegExp(term, 'i');

    let data = [];
    switch (table) {
        case 'medics':
            data = await Medic.find({name: regex})
                                .populate('user','name img')
                                .populate('hospital','name img')
            
            break;
        case 'hospitals':
            data = await Hospital.find({name:regex})
                                    .populate('user','name img')
            break;
        
        case 'users':
            data = await User.find({name: regex})
                                
            break;
        
        default:
            return res.status(404).json({
                ok: false,
                msg:'Table needs to be users, mediccs or hospitals'
            })

        
    }



    try {
        res.json({
            ok: true,
            results: data
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}
module.exports = { 
    getAll,
    getDocumentCollection
}