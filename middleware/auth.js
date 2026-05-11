const {getUser} = require('../services/auth')

const ristrictedToLoginUserOnly =  (req, res, next) => {
    const userId = req.cookies.id
    console.log(req.cookies.id)
    if(!userId) return res.redirect('/login')
        const user = getUser(userId)
    if(!user) return res.redirect('/login')
    req.user = user 
    next()
}
const checkUserAuth =  (req, res, next) => {
    const userId = req.cookies.id
        const user = getUser(userId)
        req.user = user 
       next()
}

module.exports = {ristrictedToLoginUserOnly ,checkUserAuth}