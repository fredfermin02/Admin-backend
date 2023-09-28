/*
Path: 'api/login'
*/

const {Router} =  require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/',
    [
        check('email', "Email is necessary ").isEmail(),
        check('password', "Password is necessary ").not().isEmpty(),
        validateFields
    ],
    login
    )


module.exports = router;