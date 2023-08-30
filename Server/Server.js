const express=require ('express')
const cors =require('cors')
const bcrypt =require('bcrypt')
const cookieParser=require('cookie-parser')
const path =require('path')
const jwt=require('jsonwebtoken')
const  multer =require ('multer')
const mangoose=require ('mongoose')
const UseModel=require ('./models/UseModel')


const app=express()
app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use(cookieParser())

mangoose.connect('mongodb://127.0.0.1:27017/blog');

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if(!token){
      return res.json("The token is missing")
  }else{
      jwt.verify(token, 'jwt-secret-key', (err,decoded) => {
          if(err) {
              return res.json("The token is wrong")
          } else {
              req.email= decoded.email;
              req.username= decoded.username;
              next()
          }
      })
  }
}

app.get('/', verifyUser, (req,res) => {
  return res.json({email:req.email, username:req.username})
})

app.post("/register",(req,res)=>{
  const{username,email,password} =req.body;
  bcrypt.hash(password,10)
  .then (hash=>{ UseModel.create({username,email,password:hash})
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
  }).catch(err=>console.log(err))
   
  })

  app.post("/login", (req,res) => {
    const {email , password} = req.body;
    UseModel.findOne ({email: email})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, (err, response) => {
                if(response){
                    const token = jwt.sign({email: user.email, username: user.username},
                      "jwt-secret-key", {expiresIn: '1d'})
                    res.cookie('token', token)  
                    return res.json("Success")
                }else{
                    return res.json('password is incorrect')
                }
            })
        }else{
           return res.json("user not exist")
        }
    })
})


app.listen(8082,()=>{
    console.log("server is running")
})


