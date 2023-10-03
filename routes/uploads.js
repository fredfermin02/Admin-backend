/*
/api/uploads/
*/

const {Router} = require('express');
const expressfileUpload = require('express-fileupload');
const {validateJWT} = require("../middlewares/validate-jwt");
const { fileUpload, returnImage } = require('../controllers/uploads.controller');


const router = Router();

router.use(expressfileUpload());

router.put('/:type/:id',validateJWT,fileUpload)

router.get('/:type/:img',returnImage)


module.exports = router;