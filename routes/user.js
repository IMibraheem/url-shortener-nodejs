const express = require('express')
const {handleSighnUpFunction , handleLoginFunction} = require('../controller/user')
const router = express.Router()

router.post('/' , handleSighnUpFunction)
router.post('/login' , handleLoginFunction)

module.exports = router