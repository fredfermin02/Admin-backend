const { response } = require("express")
const Medic = require('../models/medic')
const { validateMongoID } = require("../helpers/validateMongoId")
const Hospital = require("../models/hospital")



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

const updateMedic = async(req,res=response) => {
    try {
        const id = req.params.id;
    const hospitalId = req.body.hospital;
    const userID = req.uid
    const medicDB = Medic.findById(id)
    if (!medicDB) {
        return res.status(404).json({
            ok:false,
            msg:"There is no medic with this ID"
        })
    }
    
    const validHospitalMongoID = validateMongoID(hospitalId)
    if (!validHospitalMongoID) {
        return res.status(404).json({
            ok:false,
            msg:"This hopital id is Invalid"
        })
    }

    const hospitalDB = await Hospital.findById(hospitalId)
    console.log(hospitalId)
    if (!hospitalDB) {
        return res.status(404).json({
            ok:false,
            msg:"This hopital id does not exist"
        })
    }



    const medicChanges = {
        ...req.body,
        user: userID
    }

    const updatedMedic = await Medic.findByIdAndUpdate(id,medicChanges, {new: true})
    res.json({
        ok:true,
        medic: updatedMedic
    })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "Error trying to update Medic"
        })
    }
    
}

const deleteMedic = async (req,res=response) => {
    const id = req.params.id;


    try {

    const medicDB = await Medic.findByIdAndDelete(id)
    
        res.json({
            ok:true,
            msg:"Medic deleted succesfully"
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "Errot trying to delete Medic"
        })
    }
    
    

}

module.exports = {
    getMedics,
    createMedic,
    updateMedic,
    deleteMedic
}