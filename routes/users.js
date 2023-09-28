/*
    Path: /api/users
*/
const {Router} = require('express');
const {check} = require('express-validator')
const {validateFields} = require("../middlewares/validate-fields")
const {validateJWT} = require("../middlewares/validate-jwt")

const {getUsers, createUser, updateUser, deleteUser} = require('../controllers/users.controller')

const router = Router();

router.get('/',validateJWT,getUsers)

router.post('/',
    [
        check('name', 'Name field is necessary').not().isEmpty(),
        check('password', 'Password field is necessary').not().isEmpty(),
        check('email', 'Email field is necessary').isEmail(),
        validateFields
    ],
    createUser)

router.put('/:id',
[
        validateJWT,
        check('name', 'Name field is necessary').not().isEmpty(),
        check('role', 'Role field is necessary').not().isEmpty(),
        check('email', 'Email field is necessary').isEmail(),
        validateFields,
    ],
    updateUser)

router.delete('/:id',validateJWT,deleteUser)
 

module.exports = router;