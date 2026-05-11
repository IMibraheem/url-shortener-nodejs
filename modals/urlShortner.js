const mongoose = require('mongoose')

const UrlSchema =new mongoose.Schema({
    ShortId:{
        type : String,
        required: true,
        unique:true
    },
    redirectUrl :{
        type : String,
        required: true,
    },
    createdBy :{
        type: mongoose.Schema.Types.ObjectId,
        ref :"users"
    },  
    visitHistory :[{ timeStamp :{type:Number}}]
},{timestamps:true})

const URL = mongoose.model('url-shortner' , UrlSchema)

module.exports = {URL}