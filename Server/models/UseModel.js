const mangoose =require('mongoose')

const UserSchema=new mangoose.Schema({
    username:String,
    email:String,
    password:String
})

const UseModel=mangoose.model('users',UserSchema)

module.exports= UseModel;


