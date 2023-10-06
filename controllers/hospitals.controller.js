const { response } = require("express")
const Hospital = require('../models/hospital')


const getHospitals = async(req,res=response) => {
    
    const hospitals = await Hospital.find().populate('user','name img')

    res.json({
        ok:true,
        hospitals
    })

}

const createHospital = async (req,res=response) => {
    const uid = req.uid;
    
    const hospital = new Hospital({
        user: uid,
        ...req.body
    });
    
    try {
        const hospitaldb = await hospital.save();

        res.json({
            ok:true,
            hospital: hospitaldb
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Please speak with Admin. Error trying to insert new hospital"
        })   
    }
}

const updateHospital = async(req,res=response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const hospital  = Hospital.findById(id);
        if (!hospital) {
            return res.status(404).json({
                ok:false,
                msg: 'No hospital with this id'
            })
        }

        const changesHospital = {
            ...req.body,
            user: uid
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(id, changesHospital, {new: true})


        res.json({
            ok:true,
            hospital: updatedHospital
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error trying to update hospital. Please talk with Admin'
        })
    }

    
}

const deleteHospital = async(req,res=response) => {
    const id = req.params.id;

    try {
        const hospital  = Hospital.findById(id);
        if (!hospital) {
            return res.status(404).json({
                ok:false,
                msg: 'No hospital with this id'
            })
        }

        await Hospital.findByIdAndDelete(id)

        res.json({
            ok:true,
            msg:"Hospital eliminated correctly"
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error trying to delete hospital. Please talk with Admin'
        })
    }

    
    res.json({
        ok:true,
        msg: 'delete hospital'
    })

}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}