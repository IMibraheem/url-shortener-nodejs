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
            visitHistory: []
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
        console.log(ShortId , 'ShortId')
        const response = await URL.findOneAndUpdate({
        ShortId
        }, {
            $push :{
                visitHistory :{
                    timeStamp : new Date()
                }
            }
        }) 
        console.log(response , 'response')

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
        console.log(response , 'visitHistory')
      return  res.status(200).json({totalAnalatics : response?.visitHistory?.length})
    } catch (error) {
      return  res.status(500).json({message : `Internel Server Error`}) 
    }
}

const handleServerSideRendering = async (req , res)=>{
    try {
        const response = await URL.find({})
      return  res.render('home' , {
            url : response
        })
        
    } catch (error) {
      return  res.status(500).json({message : `Internel Server Error`}) 
        
    }
    
}
module.exports ={handleGenerateUrl , handleRedirect , handleGetAnalatics , handleServerSideRendering}