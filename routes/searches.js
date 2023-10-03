/*
/api/all/
*/

const {Router} = require('express');
const {validateJWT} = require("../middlewares/validate-jwt")


const { getAll, getDocumentCollection } = require('../controllers/searches.controller');

const router = Router();

router.get('/:search',validateJWT,getAll)
router.get('/collection/:table/:search',validateJWT,getDocumentCollection)

module.exports = router;