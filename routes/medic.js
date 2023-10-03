/*
Medics
route: '/api/Medics'
*/


/*
    Path: /api/users
*/
const {Router} = require('express');
const {check} = require('express-validator')
const {validateFields} = require("../middlewares/validate-fields")
const {
    getMedics,
    createMedic,
    updateMedic,
    deleteMedic
} = require('../controllers/medic.controller');

const {validateJWT} = require("../middlewares/validate-jwt");

const router = Router();

router.get('/',getMedics)

router.post('/',
    [
        validateJWT,
        check('hospital',"Hospital field is necessary").not().isEmpty(),
        check('hospital',"Hospital id need to be valid").isMongoId(),
        check('name',"Doctor name field is necessary").not().isEmpty(),
        validateFields
    ],
    createMedic)

router.put('/:id',
    [],
    updateMedic)

router.delete('/:id',deleteMedic)
 

module.exports = router;