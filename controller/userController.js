const user = require('../models/register')

const userRegister = async(req,res)=>{
try {
    const newUser = new user(req.body)
    const User = await newUser.save()
    res.status(201).json({
        message:User,
    })

} catch (error) {
    res.status(400).json({
        message : error.message
    })
}
}
const getUser = async(req,res)=>{
try {
    const UserDetails = await user.find({})
   
    res.status(201).json({
        message:"all users ",UserDetails
    })

} catch (error) {
    res.status(400).json({
        message : error.message
    })
}
}

const UserDelete = async(req,res)=>{
try{
    const {id} = req.params
    const User = await user.findByIdAndDelete(id)
        res.status(200).json({
            message:"user deleted"
        })
}catch(error){
  res.status(400).json({
    message : error.message
  })
}
}

module.exports = {
    userRegister,
    getUser,
    UserDelete
}