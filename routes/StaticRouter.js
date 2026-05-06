const express = require('express')
const  router = express.Router()
const {handleServerSideRendering} = require('../controller/urlShortner')

router.get('/' , handleServerSideRendering)
module.exports = router
