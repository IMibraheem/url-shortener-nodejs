const User = require('../modals/user')
const {v4:uuidv4} = require('uuid')
const {setUser} = require('../services/auth')
const handleSighnUpFunction = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name) {
            return res.status(400).json({ message: `Property name is required ` })
        }
        if (!email) {
            return res.status(400).json({ message: `Property email is required ` })
        }
        if (!password) {
            return res.status(400).json({ message: `Property password is required ` })
        }
        const response = await User.create({
            name,
            email,
            password
        })
        return res.redirect('/login')
    } catch (error) {
        return res.status(500).json({ message: `Something Went Wrong` })
    }
}


const handleLoginFunction = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email) {
            return res.status(400).json({ message: `Property email is required ` })
        }
        if (!password) {
            return res.status(400).json({ message: `Property password is required ` })
        }
        const userResponse = await User.findOne({
            email,
            password
        })
        if (!userResponse) {    
            return res.redirect('/login')
        }
        const sessionId = uuidv4()
        setUser(sessionId , userResponse)
        res.cookie('id' , sessionId)
        return res.redirect('/')
    } catch (error) {
        return res.status(500).json({ message: `Something Went Wrong` })
    }
}

module.exports = { handleSighnUpFunction, handleLoginFunction }