/*
Hospitals
route: '/api/Hospitals'
*/


/*
    Path: /api/users
*/
const {Router} = require('express');
const {check} = require('express-validator')
const {validateFields} = require("../middlewares/validate-fields")
const {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
} = require('../controllers/hospitals.controller');

const {validateJWT} = require("../middlewares/validate-jwt");

const router = Router();

router.get('/',getHospitals)

router.post('/',
    [
        validateJWT,
        check('name','Name of hospital is necessary').not().isEmpty(),
        validateFields
    ],
    createHospital)

router.put('/:id',
    [],
    updateHospital)

router.delete('/:id',deleteHospital)
 

module.exports = router;