const mongoose = require('mongoose')
 
const validateMongoID = (mongoid) => {
    return mongoose.Types.ObjectId.isValid(mongoid);
}
 
module.exports = {
    validateMongoID
}