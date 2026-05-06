const express = require('express')
const app = express()
const PORT = 8001
const path = require('path')
const ejs = require('ejs')
// Conection
const { handleMongoDbConnection } = require('./connection')
const router = require('./routes/urlShortner')
const staticRouter = require('./routes/StaticRouter')

handleMongoDbConnection(`mongodb://127.0.0.1:27017/url-shortner`)
.then(() => console.log(`Mongo DB connected SuccessFully`))
.catch((err) => { console.log(`Error : ${err}`) })

app.set("view engine" , "ejs")
app.set('views' , path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/' , staticRouter)
app.use('/url' , router)

app.listen(PORT, () => console.log(`Server is running on Port : ${PORT}`))