require('dotenv').config()
require('./database').connectionDB()
const app = require('express')()

// Middleware
app.use(require('express').json())

//Routes
app.use('/url',require('./routes/urlRoutes'))


// Listen function
app.listen(process.env.PORT,() => console.log(`server is running http://localhost:${process.env.PORT}`))
