const fs = require('fs')

const User = require('../models/user')
const Medic = require('../models/medic')
const Hospital = require('../models/hospital')
const res = require('express/lib/response')



const updateImage = async ( type, id, nameFile ) => {
 
    let model = {};

    switch ( type ) {
        case 'users':
            model = await User.findById(id);
            break;
        case 'medics':
            model = await Medic.findById(id);
            break;            
        case 'hospitals':
            model = await Hospital.findById(id);
        break;
        default:
            return false;
            break;
    }
    if (!model) {
        return false
    }
    return updateImage2( model, type, model.img, nameFile)
}
 
 
const updateImage2 = async ( model,type ,img, nameFile ) => {
    //Check if it has an image. If so we delete it. 
    oldPath = `./uploads/${type}/${img}`;
    deleteImg( oldPath );
    model.img = nameFile;     
    await model.save();            
    return true;
}
 
//Delete Img
const deleteImg = ( path ) => {
    if( fs.existsSync(path)){
        fs.unlinkSync( path ); 
    }
}

module.exports = {
    updateImage
}