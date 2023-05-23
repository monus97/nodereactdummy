const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type : String
    },
    email: {
        type : String
    },
    password: {
        type : String,
        select : false
    },
    role : {
        type : String,
        default : "user"
    },
    profilePic : {
        type : String,
      }

})
userSchema.set('timestamps',true)
module.exports = mongoose.model('user', userSchema)