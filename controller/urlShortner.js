const shortid = require('shortid');
const { URL } = require('../modals/urlShortner')
const handleGenerateUrl = async (req, res) => {
    try {
        const id = shortid.generate()
        const body = req.body
        if (!body.url) {
            res.status(400).json({ message: `url is required` })
        }
        const response = await URL.create({
            ShortId: id,
            redirectUrl: body.url,
            visitHistory: [],
            createdBy: req.user._id
        })
return res.render('home' , {
    id :id
})
}
    catch (err) {
        res.status(500).json({ message: `Internel Server Error` })
    }
}

const handleRedirect = async (req , res) => {
    try {
        const ShortId = req.params.id
        const response = await URL.findOneAndUpdate({
        ShortId
        }, {
            $push :{
                visitHistory :{
                    timeStamp : new Date()
                }
            }
        }) 
        
      return  res.redirect(response?.redirectUrl)
    } catch (error) {
      return  res.status(500).json({message : `Internel Server Error`})
        
    }
}

const handleGetAnalatics = async (req, res) =>{
    try {
        const id = req.params.id
        const response = await  URL.findOne({
            ShortId :id
        })
      return  res.status(200).json({totalAnalatics : response?.visitHistory?.length})
    } catch (error) {
      return  res.status(500).json({message : `Internel Server Error`}) 
    }
}

const handleServerSideRendering = async (req , res)=>{
    try {
        if(!req.user) return req.redirect('/login')
            console.log(req.user._id, 'idd')
        const response = await URL.find({createdBy: req.user._id})
        console.log(response , 'res')
      return  res.render('home' , {
            url : response
        })
        
    } catch (error) {
      return  res.status(500).json({message : `Internel Server Error`}) 
        
    }
    
}
module.exports ={handleGenerateUrl , handleRedirect , handleGetAnalatics , handleServerSideRendering}