const express = require('express')
const router = express.Router()
const {handleGenerateUrl , handleRedirect ,handleGetAnalatics ,handleServerSideRendering} = require('../controller/urlShortner')
router.post('/',handleGenerateUrl)
router.get('/analatics/:id',handleGetAnalatics)
router.get('/:id',handleRedirect)
module.exports = router