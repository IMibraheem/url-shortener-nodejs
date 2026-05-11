require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT ?? 8001
const path = require('path')
const ejs = require('ejs')
const cookieParse = require('cookie-parser')
const {ristrictedToLoginUserOnly ,checkUserAuth} = require('./middleware/auth')

// Connection
const { handleMongoDbConnection } = require('./connection')
const router = require('./routes/urlShortner')
const staticRouter = require('./routes/StaticRouter')
const userRouter = require('./routes/user')

handleMongoDbConnection(`${process.env.MONGO_URL}`)
.then(() => console.log(`Mongo DB connected SuccessFully`))
.catch((err) => { console.log(`Error : ${err}`) })

app.set("view engine" , "ejs")
app.set('views' , path.resolve('./views'))

app.use(express.json())
app.use(cookieParse())
app.use(express.urlencoded({extended:false}))
app.use('/url' ,ristrictedToLoginUserOnly , router)
app.use('/user'  , userRouter)
app.use('/'  ,checkUserAuth , staticRouter)

app.listen(PORT, () => console.log(`Server is running on Port : ${PORT}`))