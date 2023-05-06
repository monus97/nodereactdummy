const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type : String
    },
    email: {
        type : String
    },
    phone: {
        type : String
    }

})
userSchema.set('timestamps',true)
module.exports = mongoose.model('user', userSchema)