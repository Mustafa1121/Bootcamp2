const mongoose = require('mongoose')

exports.connectionDB = async () => {
    try {
        const params = {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.DB_URL,params)
        console.log('mongoDB connected successfully')
    } catch (error) {
        console.log(error)
    }
}