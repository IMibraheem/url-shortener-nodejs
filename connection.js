const mongoose = require('mongoose')

const handleMongoDbConnection = async(url)=>{
    mongoose.connect(url)
}

module.exports = {
    handleMongoDbConnection
}