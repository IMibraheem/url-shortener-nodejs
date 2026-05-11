const handleSighnUpRender = async (req, res) =>{
    return res.render('signUp')
}
const handleLoginRender = async (req, res) =>{
    return res.render('login')
}

module.exports ={handleSighnUpRender, handleLoginRender}