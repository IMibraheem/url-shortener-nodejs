const express = require('express')
const  router = express.Router()
const {handleServerSideRendering} = require('../controller/urlShortner')
const {handleSighnUpRender , handleLoginRender} = require('../controller/staticRouteController')

router.get('/' , handleServerSideRendering)
router.get('/signup' , handleSighnUpRender)
router.get('/login' , handleLoginRender)
module.exports = router
