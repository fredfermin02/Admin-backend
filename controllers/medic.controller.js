const { response } = require("express")
const Medic = require('../models/medic')



const getMedics = async(req,res=response) => {
    try {
        const medics = await Medic.find().populate('user','name img')
                                    .populate('hospital','name img')
        res.json({
            ok:true,
            medics
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Unable to reach to get medics. Please reach out to Admin.'
        })
    }
    
    

}

const createMedic = async(req,res=response) => {
    const uid = req.uid;
    const medicHospital = req.hospital;

    const medic = new Medic({
        user:uid,
        hospital: medicHospital,
        ...req.body
    });

    try {
        const medicDB = await medic.save();

        res.status(200).json({
            ok:true,
            id:medicDB.id,
            medic:medicDB
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Please contact Admin. Error trying to create new medic."
        })
    }
    
}

const updateMedic = (req,res=response) => {
    res.json({
        ok:true,
        msg: 'update Medic'
    })
}

const deleteMedic = (req,res=response) => {
    res.json({
        ok:true,
        msg: 'delete Medic'
    })

}

module.exports = {
    getMedics,
    createMedic,
    updateMedic,
    deleteMedic
}