/*
Path: 'api/login'
*/

const {Router} =  require('express');
const { login, googleSignIn } = require('../controllers/auth');
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

router.post('/google',
    [
        check('token', "Google token is necessary ").not().isEmpty(),
        validateFields
    ],
    googleSignIn
)


module.exports = router;