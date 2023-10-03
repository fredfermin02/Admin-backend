const  path  = require("path");
const fs = require('fs')

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require("../helpers/updateImage");

const { validateMongoID } = require("../helpers/validateMongoId");


let updateImageAnswer = true;

const fileUpload = async (req, res = response) => {
    const type = req.params.type;
    const id = req.params.id

    //Check that the api URL is built correctly
    const validTypes = ['hospitals','medics','users']
    if (!validTypes.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg:"It is not a medic, hospital or user"
        })
    }

    //Check if the id Is valid MongoID
    if (!validateMongoID(id)) {
        return res.status(400).json({
            ok: false,
            msg: `Invalid ${type} ID`
        })
    }

    //Checks that there is a image attached to request
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg:"There is no file attached"
        });
      }


    //Process image
    const file = req.files.img;
    const splitName = file.name.split('.');
    const extensionOfFile = splitName[splitName.length-1]

    //Validate image
    const validExtensions = ['png','jpg','jpeg','gif']
    if (!validExtensions.includes(extensionOfFile)) {
        return res.status(400).json({
            ok:false,
            msg:'Extension of file not valid'
        })
    }

    //Generate name of file
    const nameOfFile = `${uuidv4()}.${extensionOfFile}`

    //Path to save image
    const path = `./uploads/${type}/${nameOfFile}`

    
    updateImageAnswer = await updateImage(type, id,nameOfFile)

    if (updateImageAnswer) {
        file.mv(path, function(err) {
            if (err)
              return res.status(500).json({
                ok: false,
                msg:'Error tryign to move image'
            })
     
    
            res.json({
                ok:true,
                msg: 'File uploaded',
                nameOfFile
            })
          });     
    }else{
        return res.status(500).json({
            ok: false,
            msg:'Error tryign to move image - Invalid Id'})
    }
    // Use the mv() method to place the file somewhere on your server


    
    
}

const returnImage = (req,res = response) =>{
    const type = req.params.type;
    const img = req.params.img;

    const pathImage = path.join(__dirname, `../uploads/${type}/${img}`);

    //Default image
    if(fs.existsSync(path)){
        res.sendFile(pathImage)
    }else{
        const pathImage = path.join(__dirname, `../uploads/no_img.jpeg`);
        res.sendFile(pathImage)
    }

}

module.exports = {
    fileUpload,
    returnImage
}